const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting to prevent spam
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many emails sent from this IP, please try again later.'
});

// Create reusable transporter object using SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', // You can use 'gmail', 'outlook', etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email sending endpoint
app.post('/api/send-email', limiter, async (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and message.'
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address.'
    });
  }

  try {
    const transporter = createTransporter();

    // Email to you (website owner)
    const mailOptionsToOwner = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Your email
      subject: `Portfolio Contact: Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Name:</strong> 
              <span style="color: #333;">${name}</span>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Email:</strong> 
              <a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a>
            </p>
            <p style="margin: 10px 0;">
              <strong style="color: #555;">Message:</strong>
            </p>
            <div style="background-color: white; padding: 15px; border-left: 4px solid #4CAF50; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #777; font-size: 12px; margin-top: 20px;">
            This email was sent from your portfolio contact form.
          </p>
        </div>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `
    };

    // Auto-reply email to the sender
    const mailOptionsToSender = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Mohammad Oves',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          <p style="color: #555; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #555; line-height: 1.6;">
            Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.
          </p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p style="margin: 5px 0; color: #555;"><strong>Your message:</strong></p>
            <p style="color: #333; line-height: 1.6; margin: 10px 0;">
              ${message.replace(/\n/g, '<br>')}
            </p>
          </div>
          <p style="color: #555; line-height: 1.6;">
            Best regards,<br>
            <strong>Mohammad Oves</strong><br>
            <span style="color: #777; font-size: 14px;">Full Stack Developer | CSE Student</span>
          </p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #777; font-size: 12px;">
              Connect with me:<br>
              📧 Email: mohammadovescontact@gmail.com<br>
              🔗 Portfolio: <a href="https://mohd-oves-portfolio.netlify.app/" style="color: #4CAF50;">mohd-oves-portfolio.netlify.app</a><br>
              💼 LinkedIn: <a href="https://www.linkedin.com/in/mohammad-oves-01b841306" style="color: #4CAF50;">Connect with me</a>
            </p>
          </div>
        </div>
      `,
      text: `
        Hi ${name},
        
        Thank you for contacting me through my portfolio website. I have received your message and will get back to you as soon as possible.
        
        Your message:
        ${message}
        
        Best regards,
        Mohammad Oves
        Full Stack Developer | CSE Student
        
        Email: mohammadovescontact@gmail.com
        Portfolio: https://mohd-oves-portfolio.netlify.app/
      `
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToOwner);
    await transporter.sendMail(mailOptionsToSender);

    res.status(200).json({
      success: true,
      message: 'Email sent successfully! I will get back to you soon.'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email. Please try again later or contact me directly.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Serve static files (MUST come after API routes)
app.use(express.static(__dirname));

// Fallback for SPA - serve index.html for any non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile('index.html', { root: __dirname });
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access the portfolio at http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  - POST http://localhost:${PORT}/api/send-email`);
  console.log(`  - GET  http://localhost:${PORT}/api/health`);
});
