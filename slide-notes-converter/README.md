# Slide to Notes Converter 📊➡️📝

A powerful web application that converts presentation slides into comprehensive bullet point notes using OCR technology. No information is left behind!

## Features

✨ **Key Capabilities:**
- 🖼️ **Image Upload**: Drag-and-drop or click to upload slide images (PNG, JPG, JPEG)
- 🔍 **OCR Processing**: Extracts all text from slides using Tesseract.js
- 📝 **Smart Bullet Points**: Converts extracted text into organized, comprehensive bullet points
- 📊 **Multi-Slide Support**: Process multiple slides at once while maintaining order
- 💾 **Export Options**: Download notes as Markdown (.md) or plain text (.txt)
- 📋 **Copy to Clipboard**: Quick copy functionality for easy sharing
- 🎨 **Modern UI**: Clean, responsive design with real-time progress tracking

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **OCR Engine**: Tesseract.js
- **Build Tool**: Turbopack

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd slide-notes-converter
```

2. Install dependencies (already done):
```bash
npm install
```

### Running the Application

**Development Mode:**
```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

**Production Build:**
```bash
npm run build
npm start
```

## How to Use

1. **Upload Slides**: 
   - Drag and drop slide images into the upload area, or
   - Click the upload area to browse and select files
   - Supports PNG, JPG, and JPEG formats

2. **Process Slides**:
   - Click the "Convert to Notes" button
   - Wait for OCR processing to complete
   - Progress bars show real-time processing status

3. **Review Notes**:
   - View generated bullet points for each slide
   - See slide thumbnails alongside notes
   - Expand "View raw extracted text" to see original OCR output

4. **Export Notes**:
   - **Copy**: Copy all notes to clipboard
   - **TXT**: Download as plain text file
   - **MD**: Download as Markdown file (recommended)

## Project Structure

```
slide-notes-converter/
├── app/
│   ├── page.tsx              # Main application page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── FileUpload.tsx        # File upload and OCR processing
│   └── NotesDisplay.tsx      # Notes display and export
├── types/
│   └── index.ts              # TypeScript type definitions
├── utils/
│   └── textProcessor.ts      # Text to bullet point conversion logic
└── public/                   # Static assets
```

## Key Features Explained

### OCR Processing
The app uses Tesseract.js to extract text from slide images. The OCR engine:
- Recognizes text in various fonts and sizes
- Handles different slide layouts
- Preserves text structure and formatting

### Bullet Point Generation
The text processor intelligently converts extracted text into bullet points by:
- Identifying titles and headings (displayed in bold)
- Recognizing existing bullet points and numbered lists
- Breaking long paragraphs into digestible points
- Creating sub-bullets for related content
- Preserving all information without loss

### Export Formats

**Markdown (.md)**:
- Hierarchical structure with headers
- Bold formatting for titles
- Nested bullet points
- Slide separators

**Plain Text (.txt)**:
- Clean, readable format
- ASCII separators
- Uppercase titles
- Simple bullet points

## Browser Compatibility

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Performance Tips

- For best OCR results, use high-resolution slide images
- Clear, high-contrast text works best
- Process slides in batches of 5-10 for optimal performance
- Larger images may take longer to process

## Troubleshooting

**OCR not detecting text?**
- Ensure images are clear and high-resolution
- Check that text has good contrast with background
- Try re-uploading the image

**Slow processing?**
- Large images take longer to process
- Process fewer slides at once
- Close other browser tabs to free up memory

**Export not working?**
- Check browser permissions for downloads
- Ensure pop-ups are not blocked
- Try a different browser

## Future Enhancements

- 📄 PDF support for multi-page presentations
- 🌐 Multiple language support
- 🎨 Custom bullet point formatting options
- 🔄 Batch processing improvements
- 💾 Save/load session functionality
- 🤖 AI-powered summarization

## License

This project is open source and available for educational and commercial use.

## Support

For issues, questions, or contributions, please refer to the project repository.

---

Built with ❤️ using Next.js and Tesseract.js
