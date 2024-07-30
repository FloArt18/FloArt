  /* Afiseaza eticheta imagine */

document.addEventListener("DOMContentLoaded", function() {
  // Crearea elementului tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  document.body.appendChild(tooltip);

  // Funcția pentru a afișa tooltip-ul
  function showTooltip(event) {
    const img = event.target;
    const id = img.getAttribute('data-id');
    tooltip.textContent = id;
    const rect = img.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX + 10}px`;
    tooltip.style.top = `${rect.top + window.scrollY + 10}px`;
    tooltip.style.display = 'block';
  }

  // Funcția pentru a ascunde tooltip-ul
  function hideTooltip() {
    tooltip.style.display = 'none';
  }

  // Funcția pentru a mări imaginea și afișa tooltip-ul
  function changeImageSize(event) {
    const img = event.target;
    const isLarge = img.classList.contains('large');
    
    // Redimensionarea imaginii
    if (isLarge) {
      img.classList.remove('large');
      hideTooltip();
    } else {
      img.classList.add('large');
      showTooltip(event); // Afișează tooltip-ul la click
    }
  }

  // Adăugarea evenimentelor de hover pentru fiecare imagine
  const images = document.querySelectorAll('.image-container-left img, .image-container-center img, .image-container-right img');
  images.forEach(img => {
    img.addEventListener('mouseover', showTooltip);
    img.addEventListener('mouseout', hideTooltip);
    img.addEventListener('click', changeImageSize);
  });

  // Actualizează poziția tooltip-ului când imaginea este mărită
  images.forEach(img => {
    img.addEventListener('mousemove', function(event) {
      if (img.classList.contains('large')) {
        showTooltip(event);
      }
    });
  });
});



 /* moveImage.js */

 document.addEventListener('DOMContentLoaded', function() {
    var containers = document.querySelectorAll('.image-container-left, .image-container-center, .image-container-right');

    // Detectare dispozitiv mobil
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    containers.forEach(function(container) {
        new Sortable(container, {
            animation: 150,
            ghostClass: 'sortable-ghost',
            scroll: true,
            scrollSensitivity: 100,
            scrollSpeed: 10,
            // Dezactivează mutarea pe dispozitive mobile
            filter: isMobile ? '*' : '',
            onStart: function(evt) {
                document.body.classList.add('no-hover');
            },
            onEnd: function(evt) {
                document.body.classList.remove('no-hover');
                console.log('Element mutat', evt);
            }
        });
    });
});
/* scroll top page.js */

// Get the button element
let mybutton = document.getElementById("myBtn");

// Show the button when the user scrolls down 20px from the top
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Scroll to the top of the document when the button is clicked
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
}



/* navigare.js */

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const myButton = document.getElementById('myBtn');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const captionText = document.getElementById('caption');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const images = document.querySelectorAll('.gallery img');
    let currentIndex = 0;

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle("show");
    });

    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            myButton.style.display = 'block';
        } else {
            myButton.style.display = 'none';
        }
    }

    myButton.addEventListener('click', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    images.forEach((img, index) => {
        img.addEventListener('click', function () {
            modal.classList.add('show');
            modalImage.classList.add('fade-in-zoom');
            modalImage.src = this.src;
            captionText.innerHTML = this.alt;
            currentIndex = index;
            document.body.classList.add('no-hover'); // Adaugă clasa pentru a dezactiva hover
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
        document.body.classList.remove('no-hover'); // Elimină clasa pentru a activa hover
    });

    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        transitionImage(currentIndex);
    });

    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        transitionImage(currentIndex);
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.classList.remove('no-hover'); // Elimină clasa pentru a activa hover
        }
    });

    function transitionImage(index) {
        modalImage.classList.remove('fade-in-zoom');
        modalImage.classList.add('fade-out-zoom');
        
        setTimeout(() => {
            modalImage.src = images[index].src;
            captionText.innerHTML = images[index].alt;
            modalImage.classList.remove('fade-out-zoom');
            modalImage.classList.add('fade-in-zoom');
        }, 500); // Match this duration with the CSS animation duration
    }
});











