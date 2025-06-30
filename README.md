# Portfolio Website - Frontend Only

This is a React-based portfolio website that has been refactored to work without a separate backend server. All static data is now served directly from the frontend, and the AI chat functionality uses a serverless function.

## Features

- **Static Portfolio Data**: All content (about, projects, experiences, achievements) is served directly from the frontend
- **AI Chat Assistant**: Uses Groq API via serverless function for interactive chat about the portfolio
- **Modern UI**: Built with React and styled with CSS
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
├── src/
│   ├── data/
│   │   └── portfolioData.js     # All static portfolio data
│   ├── pages/
│   │   ├── About.js
│   │   ├── Projects.js
│   │   ├── Experiences.js
│   │   ├── Achievements.js
│   │   └── GroqChat.js          # AI chat component
│   └── components/
├── api/
│   └── groq.js                  # Serverless function for Groq API
├── vercel.json                  # Vercel deployment configuration
├── public/
│   └── ...                      # Static assets
├── package.json
├── package-lock.json
└── README.md
```

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env` file in the project root:
   ```
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Run locally**:
   ```bash
   npm start
   ```

## Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set environment variable**:
   ```bash
   vercel env add GROQ_API_KEY
   ```

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `build` folder to Netlify
   - Or use Netlify CLI

3. **Set environment variable**:
   - Go to Site Settings > Environment Variables
   - Add `GROQ_API_KEY` with your Groq API key

### Option 3: GitHub Pages

1. **Add homepage to package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name"
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy script to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

## Customization

### Updating Portfolio Data

Edit `src/data/portfolioData.js` to update your:
- Personal information
- Projects
- Work experience
- Achievements
- Cover image URL

### Updating Resume for AI Chat

Edit the `resumeText` constant in `src/pages/GroqChat.js` to update the information the AI assistant uses to answer questions.

### Styling

All styles are in CSS files. You can customize:
- `src/App.css` - Main application styles
- `src/index.css` - Global styles
- Component-specific styles in their respective files

## API Endpoints

The only API endpoint is:
- `POST /api/groq` - Handles AI chat requests (serverless function)

## Environment Variables

- `GROQ_API_KEY` - Your Groq API key for the AI chat functionality

## Benefits of This Setup

1. **No Backend Server**: Everything runs on static hosting
2. **Faster Loading**: No API calls for static data
3. **Lower Costs**: Free hosting on platforms like Vercel, Netlify, or GitHub Pages
4. **Easier Maintenance**: Update content by editing React files
5. **Better Performance**: Static files are cached and served quickly

## Troubleshooting

### AI Chat Not Working
- Ensure your Groq API key is set correctly
- Check that the serverless function is deployed properly
- Verify CORS settings if testing locally

### Build Errors
- Make sure all dependencies are installed
- Check for syntax errors in JavaScript files
- Ensure all imports are correct

### Deployment Issues
- Verify environment variables are set
- Check that the build process completes successfully
- Ensure the correct build directory is specified
