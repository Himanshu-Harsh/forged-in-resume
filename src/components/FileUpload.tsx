
import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload, isLoading }) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      onFileUpload(file);
    } else {
      alert('Please upload a PDF or DOCX file');
    }
  }, [onFileUpload]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      onFileUpload(file);
    } else {
      alert('Please upload a PDF or DOCX file');
    }
  }, [onFileUpload]);

  return (
    <Card className="p-8 border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors">
      <div
        className="text-center cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-16 w-16 text-blue-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Upload Your Resume
        </h3>
        <p className="text-gray-600 mb-4">
          Drag and drop your resume here, or click to browse
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supported formats: PDF, DOCX
        </p>
        <input
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={isLoading}
        />
        <Button
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? 'Processing...' : 'Choose File'}
        </Button>
      </div>
    </Card>
  );
};

export default FileUpload;
