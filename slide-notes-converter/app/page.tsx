"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import NotesDisplay from "@/components/NotesDisplay";
import { ProcessedSlide } from "@/types";

export default function Home() {
  const [slides, setSlides] = useState<ProcessedSlide[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSlidesProcessed = (processedSlides: ProcessedSlide[]) => {
    setSlides(processedSlides);
    setIsProcessing(false);
  };

  const handleProcessingStart = () => {
    setIsProcessing(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Slide to Notes Converter
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your presentation slides and get comprehensive bullet point notes instantly.
            No information left behind.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <FileUpload
              onSlidesProcessed={handleSlidesProcessed}
              onProcessingStart={handleProcessingStart}
            />
            
            {isProcessing && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="text-gray-700 font-medium">Processing slides...</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <NotesDisplay slides={slides} />
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>Powered by Tesseract.js OCR • Built with Next.js</p>
        </footer>
      </div>
    </div>
  );
}
