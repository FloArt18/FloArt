document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let formMessage = document.getElementById('formMessage');
    let formData = new FormData(this);

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (response.ok) {
            formMessage.style.color = 'green';
            formMessage.textContent = 'Your message has been sent successfully!';
            this.reset();
        } else {
            formMessage.style.color = 'red';
            formMessage.textContent = 'There was an error sending your message.';
        }
    })
    .catch(error => {
        formMessage.style.color = 'red';
        formMessage.textContent = 'There was an error sending your message.';
    });
});
