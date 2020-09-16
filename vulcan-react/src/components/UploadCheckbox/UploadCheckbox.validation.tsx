import { DEFAULT_NULL_INDEX } from "./UploadCheckbox.consts";
import {
  DocumentAdditionErrorProps,
  DocumentErrorsType,
  DocumentUploadingPropsType,
} from "./UploadCheckbox.interface";

export const isMaxFileSizeValid = (fileSize: number, maxFileSize: number) => {
  return fileSize <= maxFileSize;
};

export const isAcceptTypeValid = (acceptType: string[], fileName: File) => {
  if (acceptType && acceptType.length > 0) {
    const type: string = fileName.name.split(".").pop() || "";
    if (
      acceptType.findIndex(
        (item) => item.toLowerCase() === type.toLowerCase()
      ) < 0
    ) {
      return false;
    }
  }
  return true;
};

export const isMaxNumberValid = (
  totalNumber: number,
  maxNumber: number,
  keyUpdate: any
) => {
  if (keyUpdate === DEFAULT_NULL_INDEX && maxNumber && totalNumber > maxNumber)
    return false;
  return true;
};

export const getErrorValidation = async ({
  fileList,
  keyUpdate,
  value,
  maxNumber,
  dataURLKey,
  acceptType,
  maxFileSize,
}: Partial<DocumentUploadingPropsType & DocumentAdditionErrorProps>): Promise<
  DocumentErrorsType
> => {
  const newErrors: DocumentErrorsType = {};
  if (!isMaxNumberValid(fileList.length + value.length, maxNumber, keyUpdate)) {
    newErrors.maxNumber = true;
  } else {
    for (let i = 0; i < fileList.length; i++) {
      const { file, [dataURLKey]: dataURL } = fileList[i];
      if (file) {
        if (!isAcceptTypeValid(acceptType, file.name)) {
          newErrors.acceptType = true;
          break;
        }
        if (!isMaxFileSizeValid(file.size, maxFileSize)) {
          newErrors.maxFileSize = true;
          break;
        }
      }
    }
  }
  if (Object.values(newErrors).find(Boolean)) return newErrors;
  return null;
};
