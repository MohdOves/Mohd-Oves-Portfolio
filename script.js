
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


document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Message sent successfully!');
    this.reset();
});


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
