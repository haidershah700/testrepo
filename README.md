# PakChina - E-commerce Website

A modern, responsive e-commerce website similar to Door2Door Cargo International, designed for sourcing products from China to Pakistan.

## Features

### 🛍️ Product Request Form
- **Client Information Collection**: Name, email, phone, WhatsApp number
- **Product Details**: Detailed description with specifications and requirements
- **Image Upload**: Support for product images (JPG, PNG, GIF up to 5MB)
- **Form Validation**: Client-side validation for all required fields
- **Image Preview**: Real-time preview of uploaded images

### 📧 Email Integration
- **Automatic Email Generation**: Creates detailed email with all client information
- **Gmail Integration**: Opens user's email client with pre-filled content
- **Professional Format**: Well-structured email with all relevant details

### 💾 Data Storage
- **JSON File Storage**: Client data saved to `clients.json`
- **Local Storage**: Immediate data persistence in browser
- **Auto-population**: Form data automatically populates the JSON file
- **Image Naming**: Images saved with client name and timestamp

### 🎨 Modern Design
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Professional Styling**: Clean, modern design with blue gradient theme
- **Interactive Elements**: Hover effects, smooth scrolling, animations
- **Font Awesome Icons**: Beautiful icons throughout the interface

### 📊 Statistics Section
- **Animated Counters**: Numbers animate when scrolled into view
- **Key Metrics**: Customer count, products sourced, delivery rate, support availability

## File Structure

```
pakchina/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── clients.json        # Client data storage
└── README.md           # This file
```

## How to Use

### 1. Setup
1. Download all files to your web server or local directory
2. Open `index.html` in a web browser
3. The website is ready to use!

### 2. For Clients
1. Navigate to the "Request Product" section
2. Fill in your personal information (name, email, phone, WhatsApp)
3. Describe the product you're looking for in detail
4. Upload an image of the product (optional)
5. Click "Submit Request"
6. Your email client will open with a pre-filled message
7. Send the email to complete your request

### 3. For Administrators
1. Check the `clients.json` file for new client submissions
2. Monitor your email for new product requests
3. All client data is automatically saved and organized

## Customization

### Email Configuration
To change the email address where requests are sent:
1. Open `script.js`
2. Find line with `mailto:your-email@gmail.com`
3. Replace `your-email@gmail.com` with your actual email address

### Styling
- Modify `styles.css` to change colors, fonts, and layout
- The main color scheme uses blue gradients (#1e3a8a, #3b82f6)
- Accent color is yellow (#fbbf24)

### Content
- Update text content in `index.html`
- Modify service descriptions, contact information, and company details
- Change statistics numbers in the stats section

## Technical Details

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive enhancement

### File Upload
- Maximum file size: 5MB
- Supported formats: JPG, PNG, GIF
- Client-side validation
- Automatic file naming with client name

### Data Storage
- Local storage for immediate persistence
- JSON file structure for easy data management
- Timestamp tracking for all submissions

## Security Considerations

For production use, consider:
- Server-side validation
- Secure file upload handling
- Database storage instead of JSON files
- HTTPS implementation
- CSRF protection

## Support

For technical support or customization requests, please contact the development team.

---

**Note**: This is a frontend-only implementation. For production use, you'll need to implement server-side functionality for secure data handling and email sending.
