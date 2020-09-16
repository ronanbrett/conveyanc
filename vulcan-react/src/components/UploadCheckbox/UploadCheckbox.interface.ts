export interface DocumentType {
  dataURL?: string;
  file?: File;
  [key: string]: any;
}

export type DocumentListType = Array<DocumentType>;

export interface DocumentAdditionErrorProps {
  fileList: any;
  keyUpdate?: any;
}

export interface DocumentUploadingPropsType {
  value: DocumentListType;
  onChange: (value: DocumentListType, addUpdatedIndex?: Array<number>) => void;
  children?: (props: DocumentExportInterface) => React.ReactNode;
  multiple?: boolean;
  maxNumber?: number;
  acceptType?: Array<string>;
  maxFileSize?: number;
  onError?: (errors: DocumentErrorsType, files?: DocumentListType) => void;
  dataURLKey?: string;
}

export interface DocumentExportInterface {
  documentList: DocumentListType;
  onDocumentUpload: () => void;
  onDocumentRemoveAll: () => void;
  errors: DocumentErrorsType;
  onDocumentRemove: (index: number) => void;
  isDragging: Boolean;
  dragProps: {
    onDrop: (e: any) => void;
    onDragEnter: (e: any) => void;
    onDragLeave: (e: any) => void;
    onDragOver: (e: any) => void;
  };
}

export type DocumentErrorsType = {
  maxFileSize?: boolean;
  maxNumber?: boolean;
  acceptType?: boolean;
} | null;
