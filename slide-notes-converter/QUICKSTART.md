# Quick Start Guide 🚀

Get your Slide to Notes Converter running in 2 minutes!

## Prerequisites
- Node.js 18+ installed on your system

## Installation & Running

### Option 1: Development Mode (Recommended for Testing)

```bash
# Navigate to project directory
cd slide-notes-converter

# Start development server
npm run dev
```

Open your browser to **http://localhost:3000**

### Option 2: Production Mode

```bash
# Navigate to project directory
cd slide-notes-converter

# Build for production (already done)
npm run build

# Start production server
npm start
```

Open your browser to **http://localhost:3000**

## First Use

1. **Upload Slides**
   - Drag and drop slide images (PNG, JPG, JPEG)
   - Or click the upload area to browse files

2. **Convert**
   - Click "Convert to Notes" button
   - Wait for processing (2-5 seconds per slide)

3. **Review & Export**
   - View generated bullet points
   - Click "MD" to download as Markdown
   - Click "TXT" for plain text
   - Click "Copy" to copy to clipboard

## Example Workflow

```
1. Take screenshots of your presentation slides
2. Upload them to the app
3. Click "Convert to Notes"
4. Export as Markdown
5. Import into your note-taking app (Notion, Obsidian, etc.)
```

## Tips for Best Results

✅ Use high-resolution images (1920x1080+)
✅ Ensure good text contrast
✅ Process 5-10 slides at a time
✅ Use clear, readable fonts

## Need Help?

- See **USAGE_GUIDE.md** for detailed instructions
- See **README.md** for full documentation
- See **PROJECT_SUMMARY.md** for technical details

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
npx kill-port 3000
# Then run npm run dev again
```

**Build errors?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

That's it! You're ready to convert slides to notes. 📝✨
