# 🚀 Deployment Guide

## GitHub Pages Deployment

### Step 1: Update Configuration

1. **Update package.json homepage**:
   Replace `[YOUR_USERNAME]` with your actual GitHub username:
   ```json
   "homepage": "https://your-username.github.io/Employee-Management"
   ```

2. **Update vite.config.js base path**:
   Make sure the base path matches your repository name:
   ```javascript
   base: '/Employee-Management/',
   ```

### Step 2: Deploy to GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages**:
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" section
   - Set Source to "Deploy from a branch"
   - Select "gh-pages" branch
   - Click "Save"

### Step 3: Verify Deployment

1. Wait a few minutes for the deployment to complete
2. Visit your GitHub Pages URL: `https://your-username.github.io/Employee-Management`
3. Test all functionality including:
   - Login with demo accounts
   - Navigation between pages
   - Employee management features
   - All other features

## Troubleshooting

### Common Issues

1. **404 Error on Page Refresh**:
   - This is normal for React Router on GitHub Pages
   - The 404.html file handles this automatically
   - Users should navigate using the app's navigation, not browser back/forward

2. **Assets Not Loading**:
   - Make sure the base path in vite.config.js is correct
   - Check that all assets are in the dist folder
   - Verify the homepage URL in package.json

3. **Build Errors**:
   - Run `npm install` to ensure all dependencies are installed
   - Check for any console errors during build
   - Make sure all import paths are correct

### Alternative Deployment Options

#### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

#### Vercel
1. Connect your GitHub repository to Vercel
2. Set framework preset to "Vite"
3. Deploy automatically on push

#### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Initialize Firebase: `firebase init hosting`
3. Set public directory to `dist`
4. Deploy: `firebase deploy`

## Environment Variables

If you need to add environment variables later:

1. Create `.env` file in the root directory
2. Add your variables:
   ```
   VITE_API_URL=your-api-url
   VITE_APP_TITLE=Employee Management
   ```
3. Access them in your code: `import.meta.env.VITE_API_URL`

## Performance Optimization

1. **Enable Gzip compression** on your hosting platform
2. **Set up caching headers** for static assets
3. **Use CDN** for better global performance
4. **Optimize images** before adding to the project

## Security Considerations

1. **HTTPS**: GitHub Pages provides HTTPS by default
2. **Environment Variables**: Never commit sensitive data
3. **API Keys**: Store them securely and use environment variables
4. **CORS**: Configure your backend to allow requests from your domain

## Monitoring

1. **Google Analytics**: Add tracking code to index.html
2. **Error Tracking**: Consider adding Sentry or similar service
3. **Performance Monitoring**: Use Lighthouse for performance audits

---

**Need Help?** Open an issue on GitHub or check the troubleshooting section above. 