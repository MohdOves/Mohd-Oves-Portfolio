// Smoky Cursor Effect
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;
let speed = 0.3; // Increased speed from 0.1 to 0.3

// Smooth cursor movement
function animate() {
    // Faster movement for main cursor
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    cursor.style.transform = `translate(${mouseX - cursor.offsetWidth/2}px, ${mouseY - cursor.offsetHeight/2}px)`;

    // Slightly delayed follower for smoke effect
    followerX += (mouseX - followerX) * (speed * 0.8); // Increased from 0.5 to 0.8
    followerY += (mouseY - followerY) * (speed * 0.8);
    cursorFollower.style.transform = `translate(${followerX - cursorFollower.offsetWidth/2}px, ${followerY - cursorFollower.offsetHeight/2}px)`;

    requestAnimationFrame(animate);
}

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


animate();

// Add active class to cursor when hovering over interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project, .skill-box, .profile-image, .tab-links');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-switch i');
    
    // Force a repaint to ensure gradient transitions work
    document.documentElement.style.display = 'none';
    document.documentElement.offsetHeight;
    document.documentElement.style.display = '';
    
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}


function openTab(tabName) {
    const tabLinks = document.getElementsByClassName('tab-links');
    const tabContents = document.getElementsByClassName('tab-contents');
    
    Array.from(tabLinks).forEach(tabLink => {
        tabLink.classList.remove('active-link');
    });
    Array.from(tabContents).forEach(tabContent => {
        tabContent.classList.remove('active-tab');
    });

    event.currentTarget.classList.add('active-link');
    document.getElementById(tabName + '-tab').classList.add('active-tab');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


function toggleProjects() {
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    const seeMoreBtn = document.getElementById('seeMoreProjectsBtn');
    
    hiddenProjects.forEach(project => {
        if (project.style.display === 'none' || !project.style.display) {
            project.style.display = 'block';
            seeMoreBtn.textContent = 'See Less';
            project.style.animation = 'fadeIn 0.5s ease-out forwards';
        } else {
            project.style.display = 'none';
            seeMoreBtn.textContent = 'See More';
        }
    });
}

document.getElementById('seeMoreProjectsBtn').addEventListener('click', toggleProjects);

document.getElementById('seeMoreProjectsBtn').addEventListener('click', toggleProjects);


function toggleMenu() {
    const navList = document.querySelector('nav ul');
    navList.classList.toggle('show');
}


document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        const navList = document.querySelector('nav ul');
        navList.classList.remove('show');
    });
});

