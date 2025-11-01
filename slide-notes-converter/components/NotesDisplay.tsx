"use client";

import { ProcessedSlide } from "@/types";
import { formatBulletPoint } from "@/utils/textProcessor";

interface NotesDisplayProps {
  slides: ProcessedSlide[];
}

export default function NotesDisplay({ slides }: NotesDisplayProps) {
  const exportAsMarkdown = () => {
    let markdown = "# Slide Notes\n\n";
    
    slides.forEach((slide) => {
      markdown += `## Slide ${slide.slideNumber}: ${slide.fileName}\n\n`;
      
      slide.bulletPoints.forEach((point) => {
        if (point.startsWith("**") && point.endsWith("**")) {
          markdown += `### ${point.replace(/\*\*/g, "")}\n\n`;
        } else if (point.startsWith("  • ")) {
          markdown += `  ${point.trim()}\n`;
        } else {
          markdown += `- ${point}\n`;
        }
      });
      
      markdown += "\n---\n\n";
    });

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `slide-notes-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsText = () => {
    let text = "SLIDE NOTES\n";
    text += "=" .repeat(50) + "\n\n";
    
    slides.forEach((slide) => {
      text += `SLIDE ${slide.slideNumber}: ${slide.fileName}\n`;
      text += "-".repeat(50) + "\n\n";
      
      slide.bulletPoints.forEach((point) => {
        if (point.startsWith("**") && point.endsWith("**")) {
          text += `\n${point.replace(/\*\*/g, "").toUpperCase()}\n`;
        } else if (point.startsWith("  • ")) {
          text += `  ${point.trim()}\n`;
        } else {
          text += `• ${point}\n`;
        }
      });
      
      text += "\n" + "=".repeat(50) + "\n\n";
    });

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `slide-notes-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    let text = "";
    
    slides.forEach((slide) => {
      text += `SLIDE ${slide.slideNumber}: ${slide.fileName}\n\n`;
      
      slide.bulletPoints.forEach((point) => {
        if (point.startsWith("**") && point.endsWith("**")) {
          text += `${point.replace(/\*\*/g, "")}\n`;
        } else if (point.startsWith("  • ")) {
          text += `${point}\n`;
        } else {
          text += `• ${point}\n`;
        }
      });
      
      text += "\n---\n\n";
    });

    try {
      await navigator.clipboard.writeText(text);
      alert("Notes copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (slides.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Notes Yet
        </h3>
        <p className="text-gray-600">
          Upload and process slides to see your notes here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Generated Notes</h2>
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              title="Copy to clipboard"
            >
              📋 Copy
            </button>
            <button
              onClick={exportAsText}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
              title="Export as text file"
            >
              📄 TXT
            </button>
            <button
              onClick={exportAsMarkdown}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              title="Export as markdown file"
            >
              📝 MD
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {slides.map((slide) => (
            <div key={slide.id} className="border-b border-gray-200 last:border-b-0 pb-8 last:pb-0">
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={slide.imageUrl}
                  alt={`Slide ${slide.slideNumber}`}
                  className="w-32 h-24 object-cover rounded-lg shadow-sm"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Slide {slide.slideNumber}
                  </h3>
                  <p className="text-sm text-gray-500">{slide.fileName}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {slide.bulletPoints.map((point, index) => {
                  if (point.startsWith("**") && point.endsWith("**")) {
                    return (
                      <div key={index} className="font-bold text-gray-900 mt-3 first:mt-0 text-lg">
                        {point.replace(/\*\*/g, "")}
                      </div>
                    );
                  } else if (point.startsWith("  • ")) {
                    return (
                      <div key={index} className="text-gray-700 ml-6 text-sm">
                        {point}
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex items-start space-x-2 text-gray-800">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span className="flex-1">{point}</span>
                      </div>
                    );
                  }
                })}
              </div>

              {slide.extractedText && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 font-medium">
                    View raw extracted text
                  </summary>
                  <div className="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-700 whitespace-pre-wrap font-mono max-h-40 overflow-y-auto">
                    {slide.extractedText}
                  </div>
                </details>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Pro Tip</h4>
            <p className="text-sm text-blue-800">
              All content from your slides has been preserved in the bullet points above. 
              Export your notes using the buttons to save them for later reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
