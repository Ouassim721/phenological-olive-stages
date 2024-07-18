document.getElementById('lightMode').addEventListener('click', function () {
    document.body.removeAttribute('data-theme');
});

document.getElementById('darkMode').addEventListener('click', function () {
    document.body.setAttribute('data-theme', 'dark');
});
document.getElementById("navigateButton").onclick = function () {
  location.href = "/sign-in"; // Replace with your target page URL
}; 
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

