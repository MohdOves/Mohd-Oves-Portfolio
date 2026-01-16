// Theme Management
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.querySelector('.theme-toggle i');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
      html.removeAttribute('data-theme');
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      localStorage.setItem('theme', 'dark');
    }
  }
  
  // Load saved theme
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }
  
  // Mobile Menu Toggle
  function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  }
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      const menuToggle = document.querySelector('.menu-toggle');
      
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });
  
  // Tab functionality
  function openTab(event, tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabContents.forEach(content => {
      content.classList.remove('active');
    });
    
    tabButtons.forEach(button => {
      button.classList.remove('active');
    });
    
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
  }
  
  // Projects Toggle
  function toggleProjects() {
    const moreProjects = document.getElementById('moreProjects');
    const btnText = document.getElementById('projectsBtnText');
    
    if (moreProjects.style.display === 'none' || !moreProjects.style.display) {
      moreProjects.style.display = 'block';
      btnText.textContent = 'Show Less Projects';
    } else {
      moreProjects.style.display = 'none';
      btnText.textContent = 'Show More Projects';
    }
  }
  
  // Smooth scroll with offset for fixed nav
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Navbar scroll effect
  let lastScroll = 0;
  const nav = document.getElementById('nav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      nav.style.boxShadow = 'none';
    } else {
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    
    const animatedElements = document.querySelectorAll(
      '.project-card, .skill-category, .timeline-item, .about-text'
    );
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  });
  
// Form submission with nodemailer backend
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  
  if (!contactForm) {
    console.error('Contact form not found!');
    return;
  }
  
  console.log('Contact form found, attaching event listener...');
  
  // Remove any existing listeners
  const newForm = contactForm.cloneNode(true);
  contactForm.parentNode.replaceChild(newForm, contactForm);
  
  newForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    console.log('Form submit intercepted by JavaScript');
    
    const submitBtn = newForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    const formData = new FormData(newForm);
    
    // Get form values
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };
    
    // Update button state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
      // Send data to backend
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      // Check if response is ok and contains JSON
      if (!response.ok) {
        // Try to parse error message
        let errorMessage = 'Failed to send email';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      // Parse JSON response
      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        throw new Error('Server is not responding properly. Please make sure the server is running.');
      }
      
      if (result.success) {
        // Success
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        newForm.reset();
        
        // Show success message
        showNotification('success', result.message || 'Email sent successfully!');
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      } else {
        // Error from server
        throw new Error(result.message || 'Failed to send email');
      }
    } catch (error) {
      console.error('Error:', error);
      submitBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed';
      submitBtn.style.backgroundColor = '#f44336';
      
      // Determine error message
      let errorMessage = 'Failed to send email. Please try again or contact me directly.';
      
      if (error.message.includes('fetch')) {
        errorMessage = '⚠️ Server is not running. Please start the server with "npm start" or contact me directly at mohammadovescontact@gmail.com';
      } else if (error.message.includes('Server is not responding')) {
        errorMessage = '⚠️ Server is not running. Please start the server with "npm start" or contact me directly at mohammadovescontact@gmail.com';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      // Show error message
      showNotification('error', errorMessage);
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';
      }, 3000);
    }
  });
}

// Initialize form on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}

// Notification helper function
function showNotification(type, message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  // Add to body
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 5000);
  
  // Click to dismiss
  notification.addEventListener('click', () => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  });
}
  
  // Add active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

// Typewriter Effect - Repeats every 5 seconds
function typeWriter() {
    const text = "Mohammad Oves";
    const typewriterElement = document.getElementById('typewriter');
    typewriterElement.textContent = ''; // Clear the text
    let i = 0;
    
    function type() {
      if (i < text.length) {
        typewriterElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, 150); // Typing speed
      } else {
        // After typing completes, wait 3 seconds then restart
        setTimeout(() => {
          typeWriter(); // Restart typing
        }, 3000);
      }
    }
    
    type();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    
    // Start typing effect
    typeWriter();
    
    const animatedElements = document.querySelectorAll(
      '.project-card, .skill-category, .timeline-item, .about-text'
    );
    
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
    
    // Initialize custom cursor
    initCustomCursor();
  });

// Custom Cursor Implementation
function initCustomCursor() {
  // Skip on mobile/touch devices
  if (window.matchMedia('(max-width: 768px)').matches || 
      window.matchMedia('(hover: none)').matches) {
    console.log('Custom cursor disabled on mobile/touch device');
    return;
  }
  
  console.log('Initializing custom cursor...');
  
  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor active';
  const follower = document.createElement('div');
  follower.className = 'cursor-follower active';
  
  document.body.appendChild(cursor);
  document.body.appendChild(follower);
  
  console.log('Custom cursor elements created');
  
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let followerX = mouseX;
  let followerY = mouseY;
  
  // Initial position
  cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
  follower.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
  
  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Hide cursor when leaving the window
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    follower.classList.remove('active');
  });
  
  // Smooth cursor animation
  function animateCursor() {
    // Cursor follows immediately
    const cursorSpeed = 0.2;
    cursorX += (mouseX - cursorX) * cursorSpeed;
    cursorY += (mouseY - cursorY) * cursorSpeed;
    
    // Follower lags behind
    const followerSpeed = 0.1;
    followerX += (mouseX - followerX) * followerSpeed;
    followerY += (mouseY - followerY) * followerSpeed;
    
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Add hover effects for interactive elements
  const interactiveElements = document.querySelectorAll(
    'a, button, .btn, input, textarea, .project-card, .skill-tag, .theme-toggle, .menu-toggle'
  );
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
    
    el.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });
    
    el.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });
  });
  
  // Global mousedown/mouseup for click effect
  document.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-active');
  });
  
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-active');
  });
}