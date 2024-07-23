document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let formMessage = document.getElementById('formMessage');
    let formData = new FormData(this);
    
    fetch('process_form.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            formMessage.style.color = 'green';
            formMessage.textContent = 'Your message has been sent successfully!';
            this.reset();
        } else {
            formMessage.style.color = 'red';
            if (data.errors) {
                formMessage.textContent = 'Errors: ' + data.errors.join(', ');
            } else {
                formMessage.textContent = data.message || 'There was an error sending your message.';
            }
        }
    })
    .catch(error => {
        formMessage.style.color = 'red';
        formMessage.textContent = 'There was an error sending your message.';
    });
});

