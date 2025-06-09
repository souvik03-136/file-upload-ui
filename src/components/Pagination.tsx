'use client';

import { PaginationProps } from '@/types/index';

export default function Pagination({ 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  totalItems, 
  onPageChange, 
  onItemsPerPageChange 
}: PaginationProps) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-8 py-6 border-t border-white/10">
      <div className="flex items-center space-x-4">
        <span className="text-gray-400">Items per page:</span>
        <select 
          value={itemsPerPage}
          onChange={(e) => {
            onItemsPerPageChange(Number(e.target.value));
            onPageChange(1); // Reset to first page when changing items per page
          }}
          className="bg-white/10 text-white px-3 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          <option value={5} className="bg-gray-800">5</option>
          <option value={10} className="bg-gray-800">10</option>
          <option value={20} className="bg-gray-800">20</option>
          <option value={50} className="bg-gray-800">50</option>
        </select>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-gray-400">
          {startIndex + 1} - {endIndex} of {totalItems}
        </span>
        
        <div className="flex items-center space-x-2">
          {/* First page button */}
          <button 
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="First page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>

          {/* Previous page button */}
          <button 
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page numbers */}
          <div className="flex items-center space-x-1">
            {(() => {
              const pages = [];
              const maxVisiblePages = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
              let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

              // Adjust start page if we're near the end
              if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
              }

              // Add ellipsis at the beginning if needed
              if (startPage > 1) {
                pages.push(
                  <button
                    key="start-ellipsis"
                    className="px-3 py-2 text-gray-400 cursor-default"
                  >
                    ...
                  </button>
                );
              }

              // Add page number buttons
              for (let i = startPage; i <= endPage; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === i
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              // Add ellipsis at the end if needed
              if (endPage < totalPages) {
                pages.push(
                  <button
                    key="end-ellipsis"
                    className="px-3 py-2 text-gray-400 cursor-default"
                  >
                    ...
                  </button>
                );
              }

              return pages;
            })()}
          </div>

          {/* Next page button */}
          <button 
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Last page button */}
          <button 
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Last page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}