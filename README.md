# 🚀 Mohd Oves - Personal Portfolio

A modern, responsive personal portfolio website showcasing my skills, projects, and experience as a Computer Science Engineering student and web developer.

## 🌟 Live Demo

**[🔗 Visit My Portfolio](https://mohd-oves-portfolio.netlify.app/)**

## 📋 About

This is my personal portfolio website built with pure HTML, CSS, and JavaScript. It serves as a digital resume and showcase of my work, skills, and journey as a developer. The website features a clean, modern design with smooth animations and a fully responsive layout.

## ✨ Features

- 🏠 **Home Section** - Eye-catching hero section with introduction
- 👨‍💻 **About Me** - Personal introduction and background
- 🎓 **Education** - Academic background and achievements
- 💪 **Skills** - Technical skills and proficiencies
- 🚀 **Projects** - Showcase of completed projects
- 📞 **Contact** - Multiple ways to get in touch
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **Fast Loading** - Lightweight and optimized code
- 🎨 **Modern Design** - Clean and professional UI/UX
- 🌙 **Smooth Animations** - Enhanced user experience

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Interactive functionality and dynamic content

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web server framework
- **Nodemailer** - Email sending functionality
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - Request rate limiting for spam protection

### Deployment
- **Netlify/Vercel** - Frontend hosting
- **Heroku/VPS** - Backend hosting (optional)

## 🎯 Sections Overview

### 🏠 Home
- Professional introduction
- Call-to-action buttons
- Navigation menu

### 👨‍💻 About Me
- Personal background
- Current status as CSE student at Rajasthan Technical University
- Passion for web development, competitive programming, and graphic design
- Open-source contribution highlights

### 🎓 Education
- Academic qualifications
- Institution details
- Relevant coursework

### 💪 Skills
- **Programming Languages**: Python, C, C++, JavaScript
- **Web Technologies**: HTML5, CSS3, JavaScript
- **Design Tools**: Canva
- **Other**: Competitive Programming, Open Source Contribution

### 🚀 Projects
- Netflix Clone
- Interactive Games (Tic-Tac-Toe, Rock Paper Scissors)
- Diwali Wisher Application
- Supercar Showcase Website
- And more...

### 📞 Contact
- **Email contact form** with Nodemailer backend
- Automatic email notifications
- Auto-reply to senders
- Rate-limited to prevent spam
- Beautiful HTML email templates
- Social media links
- Professional networking options

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- Web browser (Chrome, Firefox, etc.)
- Text editor (VS Code recommended)
- Gmail account (or other email service)

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MohdOves/Mohd-Oves-Portfolio.git
   cd Mohd-Oves-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env and add your credentials
   # See SETUP.md for detailed instructions
   ```

4. **Configure email settings**
   
   Open `.env` and add:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```
   
   📌 **For Gmail App Password setup, see [SETUP.md](SETUP.md)**

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the website**
   Open your browser and go to `http://localhost:3000`

### Production Build

```bash
npm start
```

For detailed setup instructions, deployment guides, and troubleshooting, see **[SETUP.md](SETUP.md)**

## 📁 Project Structure

```
Mohd-Oves-Portfolio/
├── server.js              # Express server with nodemailer
├── index.html             # Main HTML file
├── script.js              # Frontend JavaScript with form handling
├── styles.css             # Main stylesheet
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables (not in Git)
├── .env.example           # Example environment file
├── .gitignore             # Git ignore rules
├── SETUP.md               # Detailed setup instructions
├── assets/                # Images and resources
│   ├── profile photos
│   ├── project screenshots
│   └── resume PDF
└── README.md              # This file
```

## 🎨 Customization

### Updating Content
1. **Personal Information**: Edit the content in `index.html`
2. **Styling**: Modify `css/style.css` for design changes
3. **Functionality**: Update `js/script.js` for interactive features
4. **Images**: Replace images in the `images/` directory

### Color Scheme
The website uses a modern color palette. You can customize colors by updating CSS variables:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --accent-color: #your-color;
}
```

## 🌐 Deployment

### Netlify (Recommended)
1. Fork/clone this repository
2. Connect your GitHub account to Netlify
3. Select your repository
4. Deploy automatically

### Alternative Hosting Options
- **GitHub Pages**: Enable in repository settings
- **Vercel**: Import from GitHub
- **Firebase Hosting**: Use Firebase CLI

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1200px and up)

## ⚡ Performance Features

- Optimized images and assets
- Minified CSS and JavaScript
- Lazy loading for images
- Efficient animations
- Fast loading times

## 🤝 Contributing

I welcome suggestions and contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 About the Developer

**Mohammad Oves**
- 🎓 Computer Science Engineering Student at Rajasthan Technical University
- 💻 Passionate about Web Development, Competitive Programming, and Graphic Design
- 🌟 Open Source Contributor
- 📧 Email: [your-email@domain.com]
- 🔗 GitHub: [@MohdOves](https://github.com/MohdOves)
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/your-profile)

## 🎯 Future Enhancements

- [x] Dark/Light theme toggle ✅
- [x] Custom email backend with Nodemailer ✅
- [ ] Blog section integration
- [ ] Advanced animations
- [ ] Multi-language support
- [ ] Performance optimizations
- [ ] SEO improvements
- [ ] Email templates customization
- [ ] Database integration for message storage


## 🙏 Acknowledgments

- Thanks to the open-source community for inspiration
- Special thanks to all the resources and tutorials that helped in building this portfolio
- Netlify for providing excellent hosting services

---

⭐ **If you like this portfolio, please consider giving it a star!** ⭐

*"Continuous learning and improvement is the key to success in technology."* - Mohammad Oves
