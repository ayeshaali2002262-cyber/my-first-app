"use client";

import { useState, useCallback } from "react";
import { createWorker } from "tesseract.js";
import { ProcessedSlide, UploadedFile } from "@/types";
import { convertTextToBulletPoints } from "@/utils/textProcessor";

interface FileUploadProps {
  onSlidesProcessed: (slides: ProcessedSlide[]) => void;
  onProcessingStart: () => void;
}

export default function FileUpload({ onSlidesProcessed, onProcessingStart }: FileUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => 
      file.type.startsWith("image/")
    );

    const newFiles: UploadedFile[] = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const processSlides = async () => {
    if (uploadedFiles.length === 0) return;

    onProcessingStart();
    const processedSlides: ProcessedSlide[] = [];

    const worker = await createWorker("eng");

    for (let i = 0; i < uploadedFiles.length; i++) {
      const uploadedFile = uploadedFiles[i];
      
      try {
        setProgress(prev => ({ ...prev, [uploadedFile.id]: 0 }));

        const { data } = await worker.recognize(uploadedFile.file);

        const extractedText = data.text.trim();
        const bulletPoints = convertTextToBulletPoints(extractedText);

        processedSlides.push({
          id: uploadedFile.id,
          fileName: uploadedFile.file.name,
          imageUrl: uploadedFile.preview,
          extractedText,
          bulletPoints,
          slideNumber: i + 1
        });

        setProgress(prev => ({ ...prev, [uploadedFile.id]: 100 }));
      } catch (error) {
        console.error(`Error processing ${uploadedFile.file.name}:`, error);
      }
    }

    await worker.terminate();
    onSlidesProcessed(processedSlides);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  const clearAll = () => {
    uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
    setUploadedFiles([]);
    setProgress({});
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Upload Slides</h2>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="space-y-3">
            <div className="text-5xl">📊</div>
            <div>
              <p className="text-lg font-medium text-gray-700">
                Drop slide images here or click to browse
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Supports PNG, JPG, JPEG
              </p>
            </div>
          </div>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">
              Uploaded Files ({uploadedFiles.length})
            </h3>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.file.name}
                    </p>
                    {progress[file.id] !== undefined && (
                      <div className="mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full transition-all"
                            style={{ width: `${progress[file.id]}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="ml-3 text-gray-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={processSlides}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Convert to Notes
          </button>
        </div>
      )}
    </div>
  );
}
