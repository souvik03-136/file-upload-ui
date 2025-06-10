'use client';

import React, { useState, useEffect } from 'react';
import { FileViewerModalProps } from '@/types/index';
import { getFileTypeColor, formatFileSize, formatDate } from '@/utils/fileUtils';

export default function FileViewerModal({ file, isOpen, onClose }: FileViewerModalProps) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (isOpen && file) {
      loadFileContent(file);
    }
  }, [isOpen, file]);

  const loadFileContent = async (fileItem: any) => {
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      switch (fileItem.type) {
        case 'PDF':
          setContent(`This is a PDF file: ${fileItem.name}\n\nContent Preview:\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit...`);
          break;
        case 'TXT':
          setContent(`Text File Content:\n\n# ${fileItem.name}\n\nThis is a sample text file with multiple lines of content...\nLine 1: Sample content for demonstration\nLine 2: More content...`);
          break;
        case 'DOC':
        case 'DOCX':
          setContent(`Document: ${fileItem.name}\n\n## Executive Summary\n\nThis document contains important information...`);
          break;
        default:
          setContent(`File Type: ${fileItem.type}\nFile Name: ${fileItem.name}\nFile Size: ${(fileItem.size / 1024 / 1024).toFixed(2)} MB\n\nThis file type is not previewable.`);
      }
    } catch (err) {
      setError('Failed to load file content');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    setContent('');
    setError('');
    onClose();
  };

  if (!isOpen || !file) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}>

      {/* Modal content */}
      <div className="relative w-full max-w-4xl h-[90vh] bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 rounded-3xl border border-white/20 shadow-2xl overflow-hidden">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
          <div className="flex items-center space-x-4">
            {/* Fixed class interpolation */}
            <div className={`w-12 h-12 ${getFileTypeColor(file.type)} rounded-xl flex items-center justify-center text-white font-bold`}>
              {file.type.substring(0, 3)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white truncate max-w-md">{file.name}</h2>
              <p className="text-gray-400 text-sm">
                {file.type} • {formatFileSize(file.size)} • {formatDate(file.uploadDate)}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
            title="Close viewer"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 h-full overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300 text-lg">Loading file content...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-red-400">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 0h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-semibold mb-2">Error Loading File</p>
                <p className="text-gray-400">{error}</p>
              </div>
            </div>
          ) : (
            <div className="h-full overflow-y-auto p-6 custom-scrollbar">
              <div className="max-w-none">
                <pre className="whitespace-pre-wrap text-gray-300 leading-relaxed font-mono text-sm bg-black/20 p-6 rounded-2xl border border-white/10">
                  {content}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/5">
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </button>
            <button className="px-4 py-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
              <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
          </div>

          <button
            onClick={handleClose}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          >
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
