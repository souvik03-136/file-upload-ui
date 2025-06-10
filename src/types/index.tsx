'use client';

export interface FileItem {
  id: string;
  name: string;
  type: 'PDF' | 'DOC' | 'TXT' | 'DOCX' | 'XLS' | 'XLSX' | 'PPT' | 'PPTX' | 'CSV' |'OTHER';
  size: number;
  uploadDate: Date;
  fileData?: Blob; // Add this property
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface FileTableProps {
  files: FileItem[];
  onView: (file: FileItem) => void;
  onDelete: (fileId: string) => void; 
}

export interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  onFolderUpload: (files: FileList) => void;
}

export interface FileViewerModalProps {
  file: FileItem | null;
  isOpen: boolean;
  onClose: () => void;
}