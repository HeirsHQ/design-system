import { FileImage, FileMusic, FileText, FileVideo } from "lucide-react";

export const MIME_TYPES = {
  image: ["image/bmp", "image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/tiff", "image/webp"],
  document: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "text/csv",
  ],
  video: [
    "video/mp4",
    "video/mpeg",
    "video/quicktime",
    "video/x-flv",
    "video/x-matroska",
    "video/x-msvideo",
    "video/webm",
  ],
  audio: ["audio/aac", "audio/flac", "audio/mp4", "audio/mpeg", "audio/ogg", "audio/wav", "audio/webm"],
} as const;

export const EXPECTED_EXTENSIONS = ["ipynb", "csv", "docx", "pdf", "pptx", "txt", "xlsx", "zip"] as const;

export function getFileIcon(type: string) {
  if ((MIME_TYPES.image as readonly string[]).includes(type)) return FileImage;
  if ((MIME_TYPES.document as readonly string[]).includes(type)) return FileText;
  if ((MIME_TYPES.video as readonly string[]).includes(type)) return FileVideo;
  if ((MIME_TYPES.audio as readonly string[]).includes(type)) return FileMusic;
  return FileText;
}
