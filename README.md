# WaterWorks 💧

**Healthcare Without Borders** - A crypto-powered global health insurance platform.

## Features

- 🌍 **Global Coverage** - Health insurance that works across 195+ countries
- ⚡ **Instant Claims** - Smart contract-powered automatic reimbursements
- 💰 **$HLTH Token** - Pay premiums and earn rewards with our native token
- 🔒 **Secure & Transparent** - Full on-chain transparency with privacy protection
- 🎁 **Pre-Airdrop** - Early supporters receive bonus token allocations

## Project Structure

```
waterworks-site/
├── index.html          # Main landing page
├── blog.html           # Blog/news page
├── css/
│   └── style.css       # Styles
├── js/
│   ├── wallet.js       # MetaMask wallet connection
│   └── app.js          # Main application logic
└── README.md
```

## Deploy to GitHub Pages

### Quick Deploy (GitHub Pro)

1. **Create a new GitHub repository**
   ```bash
   # In the waterworks-site folder
   git init
   git add .
   git commit -m "Initial commit - WaterWorks site"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/waterworks-site.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Choose **main** branch and **/ (root)**
   - Click **Save**

4. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/waterworks-site/
   ```

### Custom Domain (Optional)

1. In GitHub Pages settings, enter your domain
2. Add DNS records:
   - For apex domain (waterworks.xyz): A records pointing to GitHub IPs
   - For www: CNAME pointing to YOUR_USERNAME.github.io

## Development

This is a static site - just open `index.html` in a browser to preview.

For local development with hot reload:
```bash
npx live-server
```

## Customization

### Update Token Info
Edit `index.html` to change:
- Token name/symbol (currently $HLTH)
- Allocation percentages
- Airdrop tiers

### Add Blog Posts
1. Edit `blog.html`
2. Copy an existing `.blog-card` article
3. Update the icon, date, title, and content

### Wallet Connection
The site uses MetaMask by default. The `js/wallet.js` module handles:
- Connection requests
- Account change detection
- Message signing for airdrop registration

### Styling
All styles are in `css/style.css`. Key CSS variables:
```css
:root {
    --primary: #00d4aa;      /* Main accent color */
    --secondary: #00a0ff;    /* Secondary color */
    --dark: #0a0f1c;         /* Background */
}
```

## Coming Soon

- [ ] Backend API for registration storage
- [ ] Token whitepaper
- [ ] Provider directory
- [ ] Staking dashboard

## License

MIT License - WaterWorks 2026
