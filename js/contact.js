const EMAILJS_PUBLIC_KEY = 'jUukGigvKACQy4p6y'; 
const EMAILJS_SERVICE_ID = 'service_biayi2s'; 
const EMAILJS_TEMPLATE_ID = 'template_7xxsmoa';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize EmailJS
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
        confirmButtonColor: '#d97706',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Disable submit button and show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Show loading alert
    Swal.fire({
      title: 'Sending your message...',
      html: 'Please wait while we send your message.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Get current date and time
    const now = new Date();
    const formattedTime = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    try {
      // Send email using EmailJS with template variables
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: formattedTime
        }
      );

      console.log('Email sent successfully:', response);

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        html: `Thank you, <strong>${formData.name}</strong>!<br>We'll get back to you soon.`,
        confirmButtonColor: '#10b981',
        confirmButtonText: 'Great!',
        timer: 5000,
        timerProgressBar: true
      });

      // Reset form
      contactForm.reset();

    } catch (error) {
      console.error('Email sending failed:', error);
      
      // Show error alert
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later or contact us directly.',
        confirmButtonColor: '#ef4444',
        confirmButtonText: 'OK',
        footer: '<a href="mailto:hello@koficabcafe.com">Email us directly</a>'
      });
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });
});
