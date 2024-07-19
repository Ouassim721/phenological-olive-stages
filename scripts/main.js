//////////////////////////// LA PARTIE DE SIDEBAR /////////////////////////////////////////////////////////
const specificDiv = document.querySelector('#sidebar');
const sideBarLinks = specificDiv.querySelectorAll('.nav-link');

sideBarLinks.forEach(sideBarLink => {
    sideBarLink.addEventListener('click', () => {

        const currentActive = specificDiv.querySelector('.nav-link.active');
        if (currentActive) {
            currentActive.classList.remove('active');
            currentActive.classList.add('link-body-emphasis');
        }

        sideBarLink.classList.remove('link-body-emphasis');
        sideBarLink.classList.add('active');
    });
});


//////////////////////////// FIN DE LA PARTIE DE SIDEBAR ////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {
    const lightModeButton = document.getElementById('lightMode');
    const darkModeButton = document.getElementById('darkMode');
    
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
    }    
    
    lightModeButton.addEventListener('click', function () {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    });    

    darkModeButton.addEventListener('click', function () {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    });    
});    

document.getElementById("navigateButton").onclick = function () {
  location.href = "/sign-in";  
};  
document.getElementById("recolteButton").onclick = function () {
  location.href = "/recolte";  
};   
document.getElementById("voir-agenda").onclick = function () {
  location.href = "/agenda";  
};   
