'use client';

export const getFileTypeColor = (type: string) => {
  const normalizedType = type.toUpperCase();
  
  switch (normalizedType) {
    case 'PDF': return 'bg-red-500';
    case 'DOC': 
    case 'DOCX': return 'bg-blue-500';
    case 'XLS': 
    case 'XLSX': return 'bg-green-500';
    case 'PPT': 
    case 'PPTX': return 'bg-orange-500';
    case 'TXT': return 'bg-gray-500';
    case 'CSV': return 'bg-green-500';
    default: return 'bg-purple-500';
  }
};
export const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDate = (date: Date) => {
  return new Date(date).toISOString().split('T')[0];
};