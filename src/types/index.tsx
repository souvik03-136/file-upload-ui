export interface FileItem {
  id: string;
  name: string;
  type: 'PDF' | 'DOC' | 'TXT' | 'DOCX' | 'XLS' | 'XLSX' | 'PPT' | 'PPTX' | 'OTHER';
  size: number;
  uploadDate: Date;
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
  onInfo: (file: FileItem) => void;
}

export interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  onFolderUpload: (files: FileList) => void;
}