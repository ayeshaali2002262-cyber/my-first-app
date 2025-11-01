export interface ProcessedSlide {
  id: string;
  fileName: string;
  imageUrl: string;
  extractedText: string;
  bulletPoints: string[];
  slideNumber: number;
}

export interface UploadedFile {
  file: File;
  preview: string;
  id: string;
}
