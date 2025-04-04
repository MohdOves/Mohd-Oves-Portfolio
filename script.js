// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

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
    
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
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

