# Silent Production Agency Website - Deployment Guide

## Overview

This is a minimal, professional website for a creator-backend media agency. It's built with vanilla HTML, CSS, and JavaScript, powered by Firebase Firestore for form submissions, and deployed on GitHub Pages.

**Technology Stack:**
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Backend: Firebase Firestore (no server)
- Hosting: GitHub Pages
- Form Storage: Firestore database

---

## Prerequisites

Before deploying, you'll need:
1. A GitHub account
2. A Firebase project (free tier works fine)
3. Git installed on your local machine

---

## Step 1: Set Up Firebase Project

### 1.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name (e.g., "silent-production")
4. Uncheck "Enable Google Analytics" (optional)
5. Click **"Create project"**
6. Wait for project to be ready

### 1.2 Set Up Firestore Database

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose location (nearest to your clients)
4. Select **"Start in test mode"** (for development; update later)
5. Click **"Enable"**

### 1.3 Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **"Your apps"** section
3. Click the **Web** icon (looks like `</>`)**
4. Enter app nickname (e.g., "silent-production-web")
5. Copy the config object that appears
6. Open `assets/js/config.js` in your project
7. Replace the placeholder values with your actual Firebase config

Example (your values will be different):
```javascript
const firebaseConfig = {
    apiKey: "AIzaSyDx1234567890abcdefghijklmnopqrstuv",
    authDomain: "silent-production.firebaseapp.com",
    projectId: "silent-production",
    storageBucket: "silent-production.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abc123def456ghi789"
};
```

### 1.4 Configure Firestore Security Rules

1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click the **"Rules"** tab
3. Replace the entire content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow writes to the inquiries collection
    // No authentication required (public write)
    // Reads are not allowed (security via obscurity isn't enough, so no reads)
    match /inquiries/{document=**} {
      allow write: if request.resource.data.keys().hasAll(['name', 'email', 'platform', 'audience', 'frequency', 'budget', 'message', 'timestamp'])
                   && request.resource.data.name is string
                   && request.resource.data.email is string
                   && request.resource.data.platform is string
                   && request.resource.data.message is string
                   && request.resource.data.name.size() > 0
                   && request.resource.data.email.size() > 0
                   && request.resource.data.message.size() > 10;
      allow read: if false;
    }
  }
}
```

4. Click **"Publish"**

This allows:
- ✅ Public form submissions (with basic validation)
- ❌ No public reads (privacy for submissions)
- ⚠️ You can still view all submissions in Firebase Console (with authentication)

---

## Step 2: Prepare GitHub Repository

### 2.1 Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **"+"** in top-right → **"New repository"**
3. Repository name: `silent-production` (or your preferred name)
4. Description: "Creator backend production agency website"
5. Choose **Public** (required for GitHub Pages free tier)
6. Click **"Create repository"**

### 2.2 Clone and Upload Files

In your terminal/PowerShell:

```powershell
cd d:\Projects
git clone https://github.com/YOUR_USERNAME/silent-production.git
cd silent-production
```

Copy all files from your local `Production Agency Site` folder to the cloned repository folder:
- `index.html`
- `assets/` (entire folder)
- Add a `.nojekyll` file (empty file to disable Jekyll processing)

Then commit and push:

```powershell
git add .
git commit -m "Initial commit: Silent Production website"
git push origin main
```

---

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top tab)
3. Scroll to **"Pages"** section
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select **branch: `main`** and **folder: `/ (root)`**
6. Click **"Save"**
7. Wait 1-2 minutes for deployment
8. Your site will be live at: `https://YOUR_USERNAME.github.io/silent-production/`

---

## Step 4: Verify Deployment

1. Visit your GitHub Pages URL
2. Test the navigation and responsive design
3. Fill out the form and submit
4. Check Firebase Console → **Firestore Database** → **inquiries** collection to verify submission

---

## Managing Inquiries

### View Submissions in Firebase Console

1. Go to Firebase Console
2. **Build** → **Firestore Database**
3. Click **inquiries** collection
4. All form submissions appear as documents with timestamps

### Export Inquiries

**Manual export:**
1. Firebase Console → Firestore
2. Select inquiries → More menu (⋮) → **Export**
3. Choose destination (Google Cloud Storage)

**Bulk export (monthly):**
Set up a Cloud Function or use Firebase Admin SDK to export to email/spreadsheet automatically.

---

## Customization Guide

### Change Agency Name
- `index.html`: Update `<div class="nav-logo">` text
- `assets/css/style.css`: Update `.nav-logo` styling if needed
- `index.html`: Update page title in `<title>` tag

### Change Pricing
- `index.html`: Update the three pricing cards in the **Services** section
- Prices, features, and plan names are in `.pricing-card` divs

### Change Colors
Edit `assets/css/style.css`:
- Primary color (black): Replace `#000` with your color
- Secondary color (greys): Replace `#222`, `#444`, `#666`, etc.
- Background: Replace `#fff` or `#f9f9f9`

### Add Team Information
Add new section in `index.html` before the contact form with team bios, but keep it minimal.

### Change Contact Email (Optional)
Add an email link in the footer or contact section:
```html
<p>Email: <a href="mailto:hello@silentproduction.com">hello@silentproduction.com</a></p>
```

---

## Maintenance & Updates

### Monthly Checklist
- [ ] Review new inquiries in Firebase Console
- [ ] Respond to serious leads
- [ ] Update pricing if needed
- [ ] Check for broken links

### Update Code
1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub: `git push origin main`
4. GitHub Pages auto-deploys (within 1-2 minutes)

### Monitor Performance
- Use Google Analytics (optional) or Firebase Analytics
- Track form conversion rate
- Monitor which pricing tier gets most inquiries

---

## Troubleshooting

### Form Not Submitting
1. Check browser console (F12 → Console tab) for errors
2. Verify Firebase config in `assets/js/config.js`
3. Check Firestore security rules (should allow public writes)
4. Ensure Firebase SDK is loaded (check HTML script tags)

### Site Not Loading on GitHub Pages
1. Verify `.nojekyll` file exists in root
2. Check repository is public
3. Verify GitHub Pages is enabled in Settings
4. Wait 2-3 minutes for deployment
5. Check deployment status in Settings → Pages

### Firebase Configuration Error
- Ensure all values in `config.js` are correct
- Check for typos in apiKey, projectId, etc.
- Regenerate keys in Firebase Console if needed

### CORS / Cross-Origin Issues
- Firebase Web SDK handles this automatically
- If issues persist, check browser console for specific errors

---

## Security Notes

### Current Setup
- ✅ Firestore only accepts validated submissions
- ✅ No sensitive data exposed in client-side code
- ✅ Form data encrypted in transit (HTTPS)
- ⚠️ Anyone can submit forms (no rate limiting in free tier)

### Optional Enhancements (Paid)
- Add reCAPTCHA v3 to prevent spam
- Set up Cloud Function to validate and filter submissions
- Implement email notifications when new inquiries arrive

---

## Hosting Alternatives

If you want to use different hosting:

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository at [Vercel.com](https://vercel.com)
3. Deploy with one click
4. Better performance, easier custom domains

### Netlify
1. Push code to GitHub
2. Connect at [Netlify.com](https://netlify.com)
3. Add form handling with Netlify Forms (alternative to Firebase)

### Traditional Server
- Works with any web hosting (Bluehost, Namecheap, etc.)
- Requires adjusting deployment

---

## Next Steps

1. **Test everything locally** before pushing to production
2. **Set up a custom domain** (optional):
   - Buy domain from Namecheap, GoDaddy, etc.
   - Update DNS settings in domain registrar
   - Enable HTTPS (automatic with GitHub Pages)

3. **Monitor inquiries** daily in Firebase Console
4. **Respond quickly** to serious leads
5. **Track conversion rate** from inquiry to client

---

## Support & Resources

- Firebase Documentation: https://firebase.google.com/docs
- GitHub Pages: https://pages.github.com/
- HTML/CSS/JS Guide: https://developer.mozilla.org/

---

**Version:** 1.0
**Last Updated:** January 2026
**Status:** Production Ready
