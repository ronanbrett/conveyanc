import { MutableRefObject } from "react";
import { v4 } from "uuid";
import { DocumentListType } from "./UploadCheckbox.interface";

export const openFileDialog = (
  inputRef: MutableRefObject<HTMLElement>
): void => {
  if (inputRef.current) inputRef.current.click();
};

export const getAcceptTypeString = (acceptType?: Array<string>) => {
  return acceptType && acceptType.length > 0
    ? acceptType.map((item) => `.${item}`).join(", ")
    : "application/pdf,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/rtf,text/plain,image/*";
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
): Promise<DocumentListType> => {
  const promiseFiles: Array<Promise<string>> = [];
  for (let i = 0; i < files.length; i++) {
    promiseFiles.push(getBase64(files[i]));
  }
  return Promise.all(promiseFiles).then((fileListBase64: Array<string>) => {
    const fileList: DocumentListType = fileListBase64.map((base64, index) => ({
      id: v4(),
      pending: true,
      complete: false,
      [dataURLKey]: base64,
      file: files[index],
    }));
    return fileList;
  });
};
