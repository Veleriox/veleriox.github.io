# Veleriox Productions - Creator Backend Agency Website

Minimal, professional website for a serious creator production agency.

**Live Demo:** [Your GitHub Pages URL here]

---

## 🎨 Brand Guidelines

### Visual Direction

- **Font:** Clean sans-serif (system fonts: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto)
- **Tone:** Quiet, confident, not flashy
- **Aesthetic:** Professional, invisible-backend vibe
- **Rule:** No bright colors, max 3 colors per screen

### Color Palette (STRICT - Do Not Change)

**PRIMARY PALETTE (Use everywhere)**

| Color | Hex | Use | Vibe |
|-------|-----|-----|------|
| **Carbon Black** | `#0B0D10` | Background, headers, footer | Serious, premium, invisible-backend |
| **Soft White** | `#F5F6F7` | Text on dark background | Clean contrast, eye-friendly |

**SECONDARY**

| Color | Hex | Use | Vibe |
|-------|-----|-----|------|
| **Graphite Grey** | `#2A2D34` | Cards, dividers, sections | Depth without noise |
| **Steel Grey** | `#6B7280` | Secondary text, labels | Hierarchy, not distraction |

**SIGNATURE ACCENT (Vivid Teal - CHOSEN)**

| Color | Hex | Use | Vibe |
|-------|-----|-----|------|
| **Vivid Teal** | `#1ED2C0` | Buttons, links, hover states, CTA | Premium, vibrant, confident precision |

### Usage Rules (CRITICAL - Breaking these makes brand feel cheap)

```
✅ DO:
- Use Carbon Black as primary background
- Use Soft White for main text
- Use Steel Grey for secondary text
- Use Deep Teal SPARINGLY (buttons, hover, CTA only)
- Keep animations subtle

❌ DON'T:
- Bright reds, greens, blues
- More than 3 colors per screen
- No bright colors anywhere
- Busy animations
- Colored shadows or glows
```

---

## Quick Start

1. **Firebase Setup**: Follow [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) Step 1
2. **Update Config**: Add Firebase credentials to `assets/js/config.js`
3. **Deploy**: Push to GitHub, enable GitHub Pages (see guide Step 3)

---

## Features

✅ **Minimal & Professional** - Clean design, calm aesthetic  
✅ **Mobile-First Responsive** - Works on all devices  
✅ **Form Submissions** - Firestore-backed inquiry form  
✅ **Dark/Light Mode** - Toggle with localStorage persistence  
✅ **No Dependencies** - Pure HTML, CSS, vanilla JS  
✅ **Production Ready** - Security rules, validation, error handling  
✅ **Brand-Consistent** - Strict color palette + typography  

---

## Site Sections

- **Hero** - Headline and primary CTA (with subtle teal animation)
- **What We Do** - Service overview + video placeholder
- **Who This Is For** - Target audience
- **How It Works** - Process steps
- **Why Us** - Differentiators
- **Pricing** - Three tier plans
- **Contact Form** - Firestore submissions
- **Navigation** - Logo + dark mode toggle

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (vanilla)
- **Backend:** Firebase Firestore
- **Hosting:** GitHub Pages
- **No frameworks, no build tools, no bloat**

---

## File Structure

```
.
├── index.html                    # Main website (all sections)
├── assets/
│   ├── css/
│   │   └── style.css            # Responsive styles + color variables
│   ├── js/
│   │   ├── config.js            # Firebase configuration
│   │   └── form.js              # Form handling & dark mode toggle
│   ├── favicon.ico              # Place your favicon here
│   └── logo.png                 # Place your logo here (40px height)
├── DEPLOYMENT_GUIDE.md          # Full deployment instructions
├── .nojekyll                    # GitHub Pages configuration
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## Configuration

### Firebase Setup
1. Create Firebase project
2. Enable Firestore Database
3. Set security rules (see guide)
4. Copy config to `assets/js/config.js`

### Branding Assets
- **Logo:** Place `logo.png` in `assets/` (will auto-resize to 40px height)
- **Favicon:** Place `favicon.ico` in `assets/`
- **Name:** Currently set to "Veleriox Productions"

### Color Customization

Edit CSS variables in `assets/css/style.css` (maintain the provided palette):

```css
:root, [data-theme="dark"] {
    /* PRIMARY PALETTE */
    --bg-primary: #0B0D10;        /* Carbon Black */
    --text-primary: #F5F6F7;      /* Soft White */
    
    /* SECONDARY */
    --bg-secondary: #2A2D34;      /* Graphite Grey */
    --text-secondary: #6B7280;    /* Steel Grey */
    
    /* ACCENT */
    --accent: #1ED2C0;            /* Vivid Teal */
    --accent-hover: #16A89F;      /* Vivid Teal Darker */
}

[data-theme="light"] {
    /* PRIMARY PALETTE */
    --bg-primary: #F5F6F7;        /* Soft White */
    --text-primary: #0B0D10;      /* Carbon Black */
    
    /* SECONDARY */
    --bg-secondary: #FFFFFF;
    --text-secondary: #6B7280;    /* Steel Grey */
    
    /* ACCENT */
    --accent: #1ED2C0;            /* Vivid Teal */
    --accent-hover: #16A89F;      /* Vivid Teal Darker */
}
```

---

## Deployment

See **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** for:
- Step-by-step Firebase setup
- GitHub Pages deployment
- Viewing inquiries
- Troubleshooting

**TL;DR:**
1. Add Firebase config
2. Add logo & favicon
3. Push to GitHub
4. Enable Pages in Settings
5. Live in 2 minutes

---

## Form Submissions

All inquiries are stored in Firestore `inquiries` collection with:
- Name, Email, Platform
- Audience size, Posting frequency
- Monthly budget, Message
- Timestamp (automatic)

View in Firebase Console → Firestore → Collections → `inquiries`

---

## Dark/Light Mode

- **Default:** Dark mode (serious, premium vibe)
- **Toggle:** Button in top-right of navbar (☀️ / 🌙)
- **Persistence:** User preference stored in localStorage
- **Transitions:** Smooth color transitions between themes

---

## Performance

- **No external frameworks** → Fast load time
- **Minimal CSS** → No render blocking
- **Firebase SDK** → Loaded async
- **Responsive design** → Mobile optimized
- **Zero dependencies** → ~50KB total

---

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## License

This website design and code is provided as-is for your use. Customize freely.

---

## Support

For issues:
1. Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) troubleshooting section
2. Review browser console (F12 → Console) for errors
3. Verify Firebase config is correct
4. Check Firestore security rules
5. Ensure color palette remains consistent

---

## Brand Summary

**Veleriox Productions**

- **Primary:** Carbon Black (#0B0D10) + Soft White (#F5F6F7)
- **Accent:** Vivid Teal (#1ED2C0) - sparingly only (premium, vibrant, confident)
- **Secondary:** Graphite Grey (#2A2D34) + Steel Grey (#6B7280)
- **Vibe:** Quiet, confident, premium, vibrant precision
- **Message:** "We are the reliable backend. Smart, confident, efficient."

**Built for serious creators who value systems over noise.**
