'use client';

import { FileTableProps } from '@/types';

export default function FileTable({ files, onView, onDelete }: FileTableProps) {
  const getFileTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-500';
      case 'DOC':
      case 'DOCX': return 'bg-blue-500';
      case 'XLS':
      case 'XLSX': return 'bg-green-500';
      case 'PPT':
      case 'PPTX': return 'bg-orange-500';
      case 'TXT': return 'bg-gray-500';
      default: return 'bg-purple-500';
    }
  };

  if (files.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No files uploaded yet. Use the upload buttons above to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left py-4 px-6 font-medium text-gray-700">
              File Name
            </th>
            <th className="text-left py-4 px-6 font-medium text-gray-700">
              File Type
            </th>
            <th className="text-left py-4 px-6 font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} className="border-b hover:bg-gray-50 transition-colors">
              <td className="py-4 px-6">
                <span className="text-gray-900 font-medium">{file.name}</span>
              </td>
              <td className="py-4 px-6">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-md text-white text-sm font-medium ${getFileTypeColor(file.type)}`}
                >
                  {file.type}
                </span>
              </td>
              <td className="py-4 px-6">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onView(file)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View file"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(file.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete file"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
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
  );
}
