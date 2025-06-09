'use client';

import { useState, useRef, useCallback } from 'react';
import { FileUploadProps } from '@/types/index';

export default function FileUpload({ onFileUpload, onFolderUpload }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = async (uploadedFiles: File[] | FileList) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    const filesArray = Array.from(uploadedFiles);
    onFileUpload(filesArray);
    
    setIsUploading(false);
    setUploadProgress(0);
  };

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
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) {
      simulateUpload(droppedFiles);
    }
  }, [onFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      simulateUpload(selectedFiles);
    }
  };

  const handleFolderSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      // IMPORTANT: Do NOT call simulateUpload here to prevent duplicates!
      onFolderUpload(selectedFiles);
    }
  };

  return (
    <div className="mb-16">
      <div 
        className={`relative group ${isDragging ? 'scale-105' : ''} transition-all duration-500`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
        
        <div className={`relative glass rounded-3xl border-2 border-dashed p-16 text-center transition-all duration-500 ${
          isDragging 
            ? 'border-orange-400 bg-orange-500/10 scale-105' 
            : 'border-gray-600 hover:border-orange-400/50 hover:bg-white/5'
        }`}>
          
          {isUploading ? (
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center animate-spin">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="space-y-3">
                <p className="text-xl text-white font-semibold">Uploading Files...</p>
                <div className="w-full max-w-md mx-auto bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-gray-400">{uploadProgress}% Complete</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="relative">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
              
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Drop files here or click to browse
                </h3>
                <p className="text-gray-400 text-lg mb-8">
                  Support for PDF, DOC, XLS, PPT and more. Up to 10MB per file.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Upload Files</span>
                  </span>
                </button>
                
                <button 
                  onClick={() => folderInputRef.current?.click()}
                  className="group relative bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span>Upload Folder</span>
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Hidden file inputs */}
        <input 
          ref={fileInputRef}
          type="file" 
          multiple 
          className="hidden"
          onChange={handleFileSelect}
        />
        <input 
          ref={folderInputRef}
          type="file" 
          multiple 
          className="hidden"
          onChange={handleFolderSelect}
          // To avoid TypeScript error:
          {...({ webkitdirectory: '', directory: '' } as React.HTMLAttributes<HTMLInputElement>)}
        />
      </div>
    </div>
  );
}
