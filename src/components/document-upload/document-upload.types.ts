export interface DocumentItem {
  id: string;
  file: File;
  previewUrl: string;
  addedAt: Date;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const ALLOWED_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
]);