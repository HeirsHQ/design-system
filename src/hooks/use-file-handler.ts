import { useCallback, useMemo, useRef, useState } from "react";
import type React from "react";

import { MIME_TYPES } from "../constants/file.js";

/**
 * Supported file categories with predefined MIME types.
 */
export type FileType = "audio" | "document" | "image" | "video";

/**
 * Validation rules for file uploads.
 */
export interface FileValidationRules {
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Array of allowed MIME types (overrides fileType defaults) */
  allowedTypes?: readonly string[];
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Minimum number of files required */
  minFiles?: number;
}

interface UseFileHandlerProps {
  /** Callback fired when files change */
  onValueChange: (files: File[]) => void;
  /** Callback fired when a validation error occurs */
  onError?: (error: string) => void;
  /** File validation rules */
  validationRules?: FileValidationRules;
  /** File type category - determines default allowed MIME types */
  fileType?: FileType;
  /** Whether to append new files to existing ones (default: true) */
  append?: boolean;
}

interface UseFileHandler {
  /** Clears all selected files */
  clearFiles: () => void;
  /** Currently selected files */
  files: File[];
  /** Handler for file input change events */
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Programmatically opens the file picker */
  handleClick: () => void;
  /** Handler for drop events */
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
  /** Handler for drag leave events */
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void;
  /** Handler for drag over events */
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  /** Handler for drag enter events */
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
  /** Handler for paste events */
  handlePaste: (e: React.ClipboardEvent<HTMLElement>) => void;
  /** Removes a specific file from the selection */
  handleRemoveFile: (fileToRemove: File) => void;
  /** Ref to attach to a hidden file input element */
  inputRef: React.RefObject<HTMLInputElement | null>;
  /** Whether a file is being dragged over the drop zone */
  isDragging: boolean;
}

/**
 * Hook for handling file uploads with drag-and-drop, paste, and click support.
 * Includes built-in validation for file size, type, and count.
 *
 * @param props - Configuration options
 * @param props.onValueChange - Callback when files change
 * @param props.onError - Callback for validation errors
 * @param props.validationRules - File validation rules
 * @param props.fileType - File category (image, document, audio, video)
 * @param props.append - Whether to append files or replace (default: true)
 * @returns Object with file state, handlers, and refs
 *
 * @example
 * ```tsx
 * const {
 *   files,
 *   isDragging,
 *   handleClick,
 *   handleDrop,
 *   handleDragOver,
 *   handleDragLeave,
 *   handleRemoveFile,
 *   inputRef,
 *   handleFileChange,
 * } = useFileHandler({
 *   onValueChange: (files) => console.log("Files:", files),
 *   onError: (error) => console.error(error),
 *   fileType: "image",
 *   validationRules: { maxSize: 5 * 1024 * 1024, maxFiles: 3 },
 * });
 *
 * return (
 *   <div
 *     onClick={handleClick}
 *     onDrop={handleDrop}
 *     onDragOver={handleDragOver}
 *     onDragLeave={handleDragLeave}
 *     className={isDragging ? "dragging" : ""}
 *   >
 *     <input ref={inputRef} type="file" hidden onChange={handleFileChange} />
 *     Drop files here or click to select
 *   </div>
 * );
 * ```
 */
export const useFileHandler = ({
  onValueChange,
  onError,
  validationRules = {},
  fileType = "image",
  append = true,
}: UseFileHandlerProps): UseFileHandler => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const dragCountRef = useRef(0);

  const rules = useMemo(
    () => ({
      maxSize: validationRules.maxSize,
      allowedTypes: validationRules.allowedTypes ?? MIME_TYPES[fileType],
      maxFiles: validationRules.maxFiles,
      minFiles: validationRules.minFiles,
    }),
    [validationRules, fileType],
  );

  const validateFiles = useCallback(
    (newFiles: File[]): File[] | null => {
      const totalFiles = append ? files.length + newFiles.length : newFiles.length;

      if (rules.maxFiles && totalFiles > rules.maxFiles) {
        onError?.(`Maximum ${rules.maxFiles} files allowed`);
        return null;
      }

      if (rules.minFiles && totalFiles < rules.minFiles) {
        onError?.(`Minimum ${rules.minFiles} files required`);
        return null;
      }

      const validFiles = newFiles.filter((file) => {
        if (rules.maxSize && file.size > rules.maxSize) {
          onError?.(`File ${file.name} is larger than ${(rules.maxSize / (1024 * 1024)).toFixed(2)}MB`);
          return false;
        }

        if (rules.allowedTypes?.length && !rules.allowedTypes.includes(file.type)) {
          onError?.(`File ${file.name} has unsupported type. Allowed types: ${rules.allowedTypes.join(", ")}`);
          return false;
        }

        return true;
      });

      return validFiles.length > 0 ? validFiles : null;
    },
    [rules, files.length, append, onError],
  );

  const processFiles = useCallback(
    (newFiles: File[]) => {
      const validatedFiles = validateFiles(newFiles);
      if (!validatedFiles) return;

      const updatedFiles = append ? [...files, ...validatedFiles] : validatedFiles;
      setFiles(updatedFiles);
      onValueChange(updatedFiles);
    },
    [validateFiles, files, append, onValueChange],
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList) return;

      processFiles(Array.from(fileList));
      e.target.value = "";
    },
    [processFiles],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();
      dragCountRef.current = 0;
      setIsDragging(false);

      const droppedFiles = Array.from(e.dataTransfer.files);
      processFiles(droppedFiles);
    },
    [processFiles],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    dragCountRef.current++;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    dragCountRef.current--;
    if (dragCountRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLElement>) => {
      const clipboardData = e.clipboardData;
      if (!clipboardData) return;

      const pastedFiles = Array.from(clipboardData.files);
      processFiles(pastedFiles);
    },
    [processFiles],
  );

  const handleRemoveFile = useCallback(
    (fileToRemove: File) => {
      const newFiles = files.filter((file) => file !== fileToRemove);
      setFiles(newFiles);
      onValueChange(newFiles);
    },
    [files, onValueChange],
  );

  const clearFiles = useCallback(() => {
    setFiles([]);
    onValueChange([]);
  }, [onValueChange]);

  return {
    handleFileChange,
    handleClick,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleDragEnter,
    handlePaste,
    handleRemoveFile,
    inputRef,
    isDragging,
    clearFiles,
    files,
  };
};
