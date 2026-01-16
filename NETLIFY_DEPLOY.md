# 🚀 Deploying to Netlify

This guide will help you deploy your portfolio with working email functionality to Netlify.

## 📋 Prerequisites

- GitHub account
- Netlify account (sign up at netlify.com)
- Gmail App Password (if using Gmail)

## 🔧 Step 1: Prepare Your Repository

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Add Netlify Functions for email"
   git push origin main
   ```

2. **Make sure these files exist:**
   - `netlify.toml` ✅
   - `netlify/functions/send-email.js` ✅
   - `package.json` ✅

## 🌐 Step 2: Deploy to Netlify

### Option A: Deploy via Netlify Dashboard

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your `Mohd-Oves-Portfolio` repository
5. Configure build settings:
   - **Build command:** Leave empty or use `npm run build`
   - **Publish directory:** `.` (root directory)
   - **Functions directory:** `netlify/functions` (auto-detected)
6. Click **"Deploy site"**

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Or deploy directly
netlify deploy --prod
```

## 🔐 Step 3: Set Environment Variables

**This is CRITICAL - without these, emails won't work!**

1. Go to your Netlify site dashboard
2. Click **"Site settings"**
3. Go to **"Environment variables"** (or **"Build & deploy"** → **"Environment"**)
4. Click **"Add a variable"** and add these:

   ```
   Key: EMAIL_SERVICE
   Value: gmail

   Key: EMAIL_USER
   Value: mohammadovescontact@gmail.com

   Key: EMAIL_PASS
   Value: your-app-password-without-spaces
   ```

5. Click **"Save"**
6. **Trigger a new deploy** for changes to take effect:
   - Go to **"Deploys"**
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

## ✅ Step 4: Test Your Deployment

1. Wait for deployment to complete
2. Visit your Netlify URL (e.g., `https://your-site-name.netlify.app`)
3. Navigate to the Contact section
4. Fill out and submit the form
5. Check the browser console for any errors
6. Check your email for the test message

## 🐛 Troubleshooting

### Issue: "404 - Function not found"

**Solution:**
- Check `netlify.toml` exists in root
- Verify `netlify/functions/send-email.js` exists
- Redeploy the site

### Issue: "Failed to send email"

**Solution:**
- Verify environment variables are set correctly in Netlify
- Make sure `EMAIL_PASS` has NO spaces
- Check Netlify function logs:
  - Go to **"Functions"** tab in Netlify dashboard
  - Click on `send-email` function
  - View logs for errors

### Issue: "Function takes too long"

**Solution:**
- Netlify functions have a 10-second timeout on free plan
- Gmail usually responds within 2-3 seconds
- If timeout persists, check your Gmail credentials

### Issue: Environment variables not working

**Solution:**
1. Go to **Site settings** → **Environment variables**
2. Make sure variables are set for **"Production"** context
3. Click **"Trigger deploy"** → **"Clear cache and deploy site"**
4. Wait for new deployment to complete

## 📊 Check Function Logs

To see detailed logs:

1. Go to Netlify Dashboard
2. Select your site
3. Click **"Functions"** tab
4. Click on **"send-email"** function
5. View real-time logs and errors

## 🎯 How It Works

### Before (Local Development):
```
Browser → http://localhost:3000/api/send-email → Express Server
```

### After (Netlify Deployment):
```
Browser → https://your-site.netlify.app/api/send-email → Netlify Function
```

The `netlify.toml` file redirects `/api/*` requests to `/.netlify/functions/*`.

## 🔄 Future Updates

To update your deployed site:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main
```

Netlify will **automatically deploy** your changes!

## 📝 Custom Domain (Optional)

1. Go to **"Domain settings"** in Netlify
2. Click **"Add custom domain"**
3. Follow the instructions to connect your domain
4. Netlify will automatically provision SSL certificate

## 🎉 Success!

Your portfolio is now live with:
- ✅ Working contact form
- ✅ Email notifications
- ✅ Auto-reply to senders
- ✅ Rate limiting
- ✅ Custom cursor
- ✅ Responsive design
- ✅ Dark/Light theme

---

## 📞 Need Help?

If you encounter issues:
1. Check Netlify function logs
2. Verify environment variables
3. Test the contact form
4. Check browser console for errors

**Your deployed site:** `https://mohd-oves-portfolio.netlify.app`

Congratulations! 🎊
