'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import FileTable from '@/components/FileTable';
import Pagination from '@/components/Pagination';
import { FileItem } from '@/types';

export default function Home() {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'GSAP_msds_02720121.pdf',
      type: 'PDF',
      size: 2048000,
      uploadDate: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'shell-marine-forward-together-pocketbook-digital.pdf',
      type: 'PDF',
      size: 5120000,
      uploadDate: new Date('2024-01-16')
    }
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(files.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFiles = files.slice(startIndex, startIndex + itemsPerPage);

  const handleFileUpload = (uploadedFiles: File[]) => {
    const newFiles: FileItem[] = uploadedFiles.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      type: getFileType(file.name),
      size: file.size,
      uploadDate: new Date()
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFolderUpload = (fileList: FileList) => {
    const uploadedFiles = Array.from(fileList);
    handleFileUpload(uploadedFiles);
  };

  const getFileType = (fileName: string): FileItem['type'] => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf': return 'PDF';
      case 'doc': return 'DOC';
      case 'docx': return 'DOCX';
      case 'txt': return 'TXT';
      case 'xls': return 'XLS';
      case 'xlsx': return 'XLSX';
      case 'ppt': return 'PPT';
      case 'pptx': return 'PPTX';
      default: return 'OTHER';
    }
  };

  const handleView = (file: FileItem) => {
    console.log('View file:', file.name);
    // Implement view functionality
  };

  const handleInfo = (file: FileItem) => {
    console.log('Show info for file:', file.name);
    // Implement info functionality
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">X</span>
            </div>
            <span className="text-xl font-semibold">teX.ai</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-white transition-colors">
              Search
            </button>
            <button className="text-blue-400 hover:text-blue-300 transition-colors">
              Upload Files
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        {/* Upload Section */}
        <div className="mb-8">
          <FileUpload 
            onFileUpload={handleFileUpload}
            onFolderUpload={handleFolderUpload}
          />
        </div>

        {/* File Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <FileTable 
            files={currentFiles}
            onView={handleView}
            onInfo={handleInfo}
          />
          
          {files.length > 0 && (
            <div className="border-t p-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={files.length}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newItemsPerPage) => {
                  setItemsPerPage(newItemsPerPage);
                  setCurrentPage(1);
                }}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}