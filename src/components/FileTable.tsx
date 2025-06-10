'use client';

import { FileTableProps } from '@/types/index';
import { formatFileSize, formatDate } from '@/utils/fileUtils';

export default function FileTable({ files, onView, onDelete }: FileTableProps) {
  if (files.length === 0) {
    return null;
  }

  const getFileTypeColor = (type: string) => {
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

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>

      <div className="relative glass rounded-3xl border border-white/10 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-white/5 to-white/10 px-8 py-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">Your Files</h2>
          <p className="text-gray-400 mt-1">{files.length} files uploaded</p>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-6 px-8 text-gray-300 font-semibold">File Name</th>
                <th className="text-left py-6 px-8 text-gray-300 font-semibold">Type</th>
                <th className="text-left py-6 px-8 text-gray-300 font-semibold">Size</th>
                <th className="text-left py-6 px-8 text-gray-300 font-semibold">Upload Date</th>
                <th className="text-right py-6 px-8 text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group/row">
                  <td className="py-6 px-8">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 ${getFileTypeColor(file.type)} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                        {file.type.substring(0, 3)}
                      </div>
                      <div>
                        <p className="text-white font-medium truncate max-w-xs">{file.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-8">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getFileTypeColor(file.type)} text-white`}>
                      {file.type}
                    </span>
                  </td>
                  <td className="py-6 px-8 text-gray-300">{formatFileSize(file.size)}</td>
                  <td className="py-6 px-8 text-gray-300">{formatDate(file.uploadDate)}</td>
                  <td className="py-6 px-8">
                    <div className="flex items-center justify-end space-x-3">
                      <button
                        onClick={() => onView(file)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        title="View file"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(file.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                        title="Delete file"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 01-1 1H6a1 1 0 01-1-1m3-3h4a1 1 0 011 1v1H8V5a1 1 0 011-1z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
