class ProductRequestManager {
    constructor() {
        this.form = document.getElementById('productRequestForm');
        this.imageInput = document.getElementById('productImage');
        this.imagePreview = document.getElementById('imagePreview');
        this.previewImg = document.getElementById('previewImg');
        this.clientsData = [];
        
        this.initializeEventListeners();
        this.loadExistingData();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.imageInput.addEventListener('change', (e) => this.handleImageUpload(e));
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size must be less than 5MB');
                this.imageInput.value = '';
                return;
            }

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                this.imageInput.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.previewImg.src = e.target.result;
                this.imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    async handleFormSubmit(event) {
        event.preventDefault();
        
        const submitBtn = this.form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        try {
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            this.form.classList.add('loading');

            // Collect form data
            const formData = new FormData(this.form);
            const clientData = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                whatsapp: formData.get('whatsapp'),
                productDetails: formData.get('productDetails'),
                imageFile: this.imageInput.files[0] ? this.imageInput.files[0].name : null
            };

            // Save image if uploaded
            if (this.imageInput.files[0]) {
                await this.saveImage(this.imageInput.files[0], clientData.name);
            }

            // Save to JSON file
            await this.saveClientData(clientData);

            // Send email
            await this.sendEmail(clientData);

            // Show success message
            this.showMessage('Thank you! Your product request has been submitted successfully. We will contact you soon.', 'success');

            // Reset form
            this.form.reset();
            this.imagePreview.style.display = 'none';

        } catch (error) {
            console.error('Error submitting form:', error);
            this.showMessage('Sorry, there was an error submitting your request. Please try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            this.form.classList.remove('loading');
        }
    }

    async saveImage(file, clientName) {
        // In a real implementation, you would upload to a server
        // For now, we'll simulate saving the image
        const fileName = `${clientName.replace(/\s+/g, '_')}_${Date.now()}.${file.name.split('.').pop()}`;
        console.log(`Image saved as: ${fileName}`);
        return fileName;
    }

    async saveClientData(clientData) {
        this.clientsData.push(clientData);
        
        // Save to localStorage for immediate access
        localStorage.setItem('pakchina_clients', JSON.stringify(this.clientsData));
        
        // Save to JSON file (in a real app, this would be a server call)
        try {
            const response = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clientData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to save to server');
            }
        } catch (error) {
            console.log('Saving to localStorage only:', error);
        }
        
        console.log('Client data saved:', clientData);
    }

    async sendEmail(clientData) {
        const emailBody = `
New Product Request from PakChina Website

Client Details:
- Name: ${clientData.name}
- Email: ${clientData.email}
- Phone: ${clientData.phone}
- WhatsApp: ${clientData.whatsapp || 'Not provided'}

Product Details:
${clientData.productDetails}

Image: ${clientData.imageFile ? `Uploaded as: ${clientData.imageFile}` : 'No image provided'}

Request submitted on: ${new Date(clientData.timestamp).toLocaleString()}
        `;

        // In a real implementation, you would send this via a server
        // For now, we'll use mailto link
        const mailtoLink = `mailto:your-email@gmail.com?subject=New Product Request - ${clientData.name}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.open(mailtoLink);
        
        console.log('Email content:', emailBody);
    }

    loadExistingData() {
        const savedData = localStorage.getItem('pakchina_clients');
        if (savedData) {
            this.clientsData = JSON.parse(savedData);
            console.log('Loaded existing client data:', this.clientsData);
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;

        // Insert before form
        this.form.parentNode.insertBefore(messageDiv, this.form);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new ProductRequestManager();
    
    // Add some interactive effects
    // Animate stats on scroll
    const stats = document.querySelectorAll('.stat-item h3');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateNumber(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));

    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + (element.textContent.includes('+') ? '+' : '') + 
                                (element.textContent.includes('%') ? '%' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
});
