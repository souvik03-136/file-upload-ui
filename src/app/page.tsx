'use client';

import { useState } from 'react';
import { FileItem } from '@/types/index';
import FileUpload from '@/components/FileUpload';
import FileTable from '@/components/FileTable';
import Pagination from '@/components/Pagination';

export default function ModernUploadPage() {
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

  const handleFolderUpload = (uploadedFiles: FileList) => {
    const filesArray = Array.from(uploadedFiles);
    handleFileUpload(filesArray);
  };

  const handleFileView = (file: FileItem) => {
    // Implement file view logic here
    console.log('Viewing file:', file);
    // You can add modal opening logic, navigation, or external viewer here
  };

  const handleFileDelete = (fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
    
    // Adjust current page if necessary
    const newTotalPages = Math.ceil((files.length - 1) / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 glass-header">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">X</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-white to-orange-300 bg-clip-text text-transparent">teX.ai</span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 px-4 py-2 rounded-lg hover:bg-white/10">
                Search
              </button>
              <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/25">
                Upload Files
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-orange-300 to-pink-400 bg-clip-text text-transparent">
              Upload Your Files
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Drag and drop your files or browse to upload. Supports all major file formats with advanced organization features.
          </p>
        </div>

        {/* Upload Section */}
        <FileUpload 
          onFileUpload={handleFileUpload}
          onFolderUpload={handleFolderUpload}
        />

        {/* File Table with Pagination */}
        {files.length > 0 && (
          <div className="space-y-0">
            <FileTable 
              files={currentFiles}
              onView={handleFileView}
              onDelete={handleFileDelete}
            />
            
            {/* Pagination Component */}
            <div className="relative glass rounded-b-3xl border-t-0 border border-white/10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={files.length}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}