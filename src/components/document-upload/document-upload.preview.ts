import type { DocumentItem } from "./document-upload.types.js";

export function openImagePreview(
  dialog: HTMLDialogElement,
  image: HTMLImageElement,
  pdf: HTMLIFrameElement,
  title: HTMLElement,
  link: HTMLAnchorElement,
  documentItem: DocumentItem,
): void {
  title.textContent = documentItem.file.name;

  pdf.hidden = true;
  pdf.src = "";

  link.hidden = true;
  link.removeAttribute("href");

  image.src = documentItem.previewUrl;
  image.alt =
    `Vergrößerte Vorschau von ${documentItem.file.name}`;
  image.hidden = false;

  if (!dialog.open) {
    dialog.showModal();
  }
}

export function openPdfPreview(
  dialog: HTMLDialogElement,
  image: HTMLImageElement,
  pdf: HTMLIFrameElement,
  title: HTMLElement,
  link: HTMLAnchorElement,
  documentItem: DocumentItem,
): void {
  title.textContent = documentItem.file.name;

  image.hidden = true;
  image.src = "";

  pdf.hidden = false;
  pdf.src = documentItem.previewUrl;
  pdf.title =
    `PDF-Vorschau von ${documentItem.file.name}`;

  // Mobile Browser zeigen PDFs häufig nicht im iframe an.
  link.href = documentItem.previewUrl;
  link.hidden = false;

  if (!dialog.open) {
    dialog.showModal();
  }
}

export function closePreview(
  dialog: HTMLDialogElement,
): void {
  dialog.close();
}

export function resetPreview(
  image: HTMLImageElement,
  pdf: HTMLIFrameElement,
  title: HTMLElement,
  link: HTMLAnchorElement,
): void {
  image.hidden = true;
  image.src = "";
  image.alt = "";

  pdf.hidden = true;
  pdf.src = "";

  link.hidden = true;
  link.removeAttribute("href");

  title.textContent = "Dateivorschau";
}