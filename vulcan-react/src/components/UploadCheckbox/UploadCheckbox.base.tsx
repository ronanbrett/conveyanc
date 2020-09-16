import React, { useRef, useState, useCallback, useMemo } from "react";
import {
  openFileDialog,
  getListFiles,
  getAcceptTypeString,
} from "./UploadCheckbox.utils";

import {
  DEFAULT_NULL_INDEX,
  INIT_MAX_NUMBER,
  DEFAULT_DATA_URL_KEY,
  MAX_FILE_SIZE,
} from "./UploadCheckbox.consts";
import {
  DocumentUploadingPropsType,
  DocumentListType,
  DocumentErrorsType,
} from "./UploadCheckbox.interface";
import { getErrorValidation } from "./UploadCheckbox.validation";

// Todo - Deduplicate + Refactor this and ImageUploaderBase
export const ReactUploadCheckbox: React.FC<DocumentUploadingPropsType> = ({
  value = [],
  onChange,
  onError,
  children,
  dataURLKey = DEFAULT_DATA_URL_KEY,
  multiple = false,
  maxNumber = INIT_MAX_NUMBER,
  acceptType,
  maxFileSize = MAX_FILE_SIZE,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyUpdate, setKeyUpdate] = useState<number>(DEFAULT_NULL_INDEX);
  const [errors, setErrors] = useState<DocumentErrorsType>(null);
  const [isDragging, setIsDragging] = useState<Boolean>(false);

  const handleClickInput = useCallback(() => openFileDialog(inputRef), [
    inputRef,
  ]);

  const onDocumentUpload = useCallback((): void => {
    setKeyUpdate(DEFAULT_NULL_INDEX);
    handleClickInput();
  }, [handleClickInput]);

  const onDocumentRemoveAll = useCallback((): void => {
    onChange && onChange([]);
  }, [onChange]);

  const onDocumentRemove = (index: number | Array<number>): void => {
    const updatedList = [...value];
    if (Array.isArray(index)) {
      index.forEach((i) => {
        updatedList.splice(i, 1);
      });
    } else {
      updatedList.splice(index, 1);
    }
    onChange && onChange(updatedList);
  };

  const validate = async (fileList: DocumentListType): Promise<boolean> => {
    const errorsValidation = await getErrorValidation({
      fileList,
      maxFileSize,
      maxNumber,
      acceptType,
      dataURLKey,
      keyUpdate,
      value,
    });
    if (errorsValidation) {
      setErrors(errorsValidation);
      onError && onError(errorsValidation, fileList);
      return false;
    }
    errors && setErrors(null);
    return true;
  };

  const handleChange = async (files: FileList | null) => {
    if (!files) return;
    const fileList = await getListFiles(files, dataURLKey);

    if (!fileList.length) return;
    const checkValidate = await validate(fileList);

    if (!checkValidate) return;

    let updatedFileList: DocumentListType;
    const updatedIndexes: number[] = [];
    if (keyUpdate > DEFAULT_NULL_INDEX) {
      updatedFileList = [...value];
      updatedFileList[keyUpdate] = fileList[0];
      updatedIndexes.push(keyUpdate);
    } else {
      if (multiple) {
        updatedFileList = [...value, ...fileList];
        for (let i = value.length as number; i < updatedFileList.length; i++) {
          updatedIndexes.push(i);
        }
      } else {
        updatedFileList = [fileList[0]];
        updatedIndexes.push(0);
      }
    }
    onChange && onChange(updatedFileList, updatedIndexes);
  };

  const onInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    await handleChange(e.target.files);
    keyUpdate > DEFAULT_NULL_INDEX && setKeyUpdate(DEFAULT_NULL_INDEX);
    if (inputRef.current) inputRef.current.value = "";
  };

  const acceptTypeString = useMemo(() => getAcceptTypeString(acceptType), [
    acceptType,
  ]);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  return (
    <>
      <input
        type="file"
        accept={acceptTypeString}
        ref={inputRef}
        multiple={multiple && keyUpdate === DEFAULT_NULL_INDEX}
        onChange={onInputChange}
        style={{ display: "none" }}
      />
      {children &&
        children({
          documentList: value,
          onDocumentUpload,
          onDocumentRemoveAll,
          onDocumentRemove,
          errors,
          dragProps: {
            onDrop: handleDrop,
            onDragEnter: handleDragIn,
            onDragLeave: handleDragOut,
            onDragOver: handleDrag,
          },
          isDragging,
        })}
    </>
  );
};
