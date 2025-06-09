'use client';

import { useRef, InputHTMLAttributes } from 'react';
import { FileUploadProps } from '@/types';

// Add this interface declaration
interface ExtendedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  webkitdirectory?: string;
}

export default function FileUpload({ onFileUpload, onFolderUpload }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFolderClick = () => {
    folderInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileUpload(Array.from(files));
    }
  };

  const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFolderUpload(files);
    }
  };

  // Define folder input props separately
  const folderInputProps: ExtendedInputProps = {
    type: 'file',
    webkitdirectory: '',
    className: 'hidden',
    onChange: handleFolderChange,
    multiple: true, // you generally want this so you can select the full folder contents
    accept: '*/*',  // allow all file types in folder
  };

  return (
    <div className="bg-black rounded-lg p-12 text-center">
      <h1 className="text-white text-3xl font-semibold mb-2">
        Upload Your File / Folder ✨
      </h1>
      
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={handleFolderClick}
          className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
        >
          <span>Upload Folder</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </button>
        
        <button
          onClick={handleFileClick}
          className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2"
        >
          <span>Upload File</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
      />
      
      {/* Folder input with extended props */}
      <input
        ref={folderInputRef}
        {...folderInputProps}
      />
    </div>
  );
}
