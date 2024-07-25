
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
//////////////////////////////////////////////////////////////
document.getElementById("navigateButton").onclick = function () {
    location.href = "/sign-in";  
  }; 
document.getElementById("recolteButton").onclick = function () {
  location.href = "/recolte";  
};   
document.getElementById("voir-agenda").onclick = function () {
  location.href = "/agenda";  
};    
document.getElementById("production").onclick = function () {
  location.href = "/production";  
};   
//////////////////////////////////////////////////////////////////////
//////////////////////////// FIN DE LA PARTIE DE SIDEBAR ////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('nav ul li a');

    window.onscroll = () => {
        var current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        navLi.forEach(li => {
            li.classList.remove("active");
            if (li.getAttribute("href").includes(current)) {
                li.classList.add("active");
            }
        });
    };
});
/////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', (event) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: [],
            datasets: [{
                label: 'My Dataset',
                data: [],
                backgroundColor: [],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value}`;
                        }
                    }
                }
            }
        }
    });

    const dataForm = document.getElementById('dataForm');
    dataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const label = document.getElementById('label').value;
        const value = parseInt(document.getElementById('value').value);
        const backgroundColor = getRandomColor();

        myChart.data.labels.push(label);
        myChart.data.datasets[0].data.push(value);
        myChart.data.datasets[0].backgroundColor.push(backgroundColor);

        myChart.update();
        dataForm.reset();
    });

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
///////////////////////LA PARTIE D'AGENDA//////////////////////////////////////////////
