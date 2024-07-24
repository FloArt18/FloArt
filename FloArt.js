  /* changeImageSize.js */




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
        });
    });

    closeBtn.addEventListener('click', function () {
        modal.classList.remove('show');
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









