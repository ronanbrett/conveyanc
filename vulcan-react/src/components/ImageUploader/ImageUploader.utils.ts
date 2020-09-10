import { MutableRefObject } from "react";
import { v4 } from "uuid";

export interface ImageType {
  dataURL?: string;
  file?: File;
  [key: string]: any;
}

export type ImageListType = Array<ImageType>;

export interface ImageUploadingPropsType {
  value: ImageListType;
  onChange: (value: ImageListType, addUpdatedIndex?: Array<number>) => void;
  children?: (props: ExportInterface) => React.ReactNode;
  multiple?: boolean;
  maxNumber?: number;
  acceptType?: Array<string>;
  maxFileSize?: number;
  resolutionWidth?: number;
  resolutionHeight?: number;
  resolutionType?: ResolutionType;
  onError?: (errors: ErrorsType, files?: ImageListType) => void;
  dataURLKey?: string;
}

export interface ExportInterface {
  imageList: ImageListType;
  onImageUpload: () => void;
  onImageRemoveAll: () => void;
  errors: ErrorsType;
  onImageUpdate: (index: number) => void;
  onImageRemove: (index: number) => void;
  isDragging: Boolean;
  dragProps: {
    onDrop: (e: any) => void;
    onDragEnter: (e: any) => void;
    onDragLeave: (e: any) => void;
    onDragOver: (e: any) => void;
  };
}

export type ErrorsType = {
  maxFileSize?: boolean;
  maxNumber?: boolean;
  acceptType?: boolean;
  resolution?: boolean;
} | null;

export type ResolutionType = "absolute" | "less" | "more" | "ratio";
export const openFileDialog = (
  inputRef: MutableRefObject<HTMLElement>
): void => {
  if (inputRef.current) inputRef.current.click();
};

export const getAcceptTypeString = (acceptType?: Array<string>) => {
  return acceptType && acceptType.length > 0
    ? acceptType.map((item) => `.${item}`).join(", ")
    : "image/*";
};

export const getBase64 = (file: File): Promise<string> => {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.readAsDataURL(file);
  });
};

export const getListFiles = (
  files: FileList,
  dataURLKey: string
): Promise<ImageListType> => {
  const promiseFiles: Array<Promise<string>> = [];
  for (let i = 0; i < files.length; i++) {
    promiseFiles.push(getBase64(files[i]));
  }
  return Promise.all(promiseFiles).then((fileListBase64: Array<string>) => {
    const fileList: ImageListType = fileListBase64.map((base64, index) => ({
      id: v4(),
      pending: true,
      complete: false,
      [dataURLKey]: base64,
      file: files[index],
    }));
    return fileList;
  });
};
