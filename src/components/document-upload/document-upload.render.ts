import type { DocumentItem } from "./document-upload.types.js";

import {
  formatDate,
  formatFileSize,
  getFileType,
} from "./document-upload.utils.js";

interface RenderCallbacks {
  onPreview: (documentItem: DocumentItem) => void;
  onRemove: (id: string) => void;
}

export function createDocumentElement(
  documentItem: DocumentItem,
  callbacks: RenderCallbacks,
): HTMLLIElement {
  return createDocumentItemElement(
    documentItem,
    callbacks,
    false,
  );
}

export function createPendingDocumentElement(
  documentItem: DocumentItem,
  callbacks: RenderCallbacks,
): HTMLLIElement {
  return createDocumentItemElement(
    documentItem,
    callbacks,
    true,
  );
}

function createDocumentItemElement(
  documentItem: DocumentItem,
  callbacks: RenderCallbacks,
  isPending: boolean,
): HTMLLIElement {
  const listItem = document.createElement("li");

  listItem.className = isPending
    ? "document-upload__item document-upload__item--pending"
    : "document-upload__item";

  const preview = document.createElement("div");
  preview.className = "document-upload__preview";

  createPreview(
    preview,
    documentItem,
    callbacks.onPreview,
  );

  const meta = document.createElement("div");
  meta.className = "document-upload__meta";

  const name = document.createElement("span");
  name.className = "document-upload__name";
  name.title = documentItem.file.name;
  name.textContent = documentItem.file.name;

  const metadata = document.createElement("ul");
  metadata.className = "document-upload__metadata";

  const type = document.createElement("li");
  type.textContent = getFileType(
    documentItem.file,
  );

  const size = document.createElement("li");
  size.textContent = formatFileSize(
    documentItem.file.size,
  );

  metadata.append(type, size);

  meta.append(name, metadata);

  if (!isPending) {
    const added = document.createElement("p");
    added.className = "document-upload__added";
    added.textContent = `Hinzugefügt am ${formatDate(
      documentItem.addedAt,
    )}`;

    meta.append(added);
  }

  const removeButton = document.createElement("button");

  removeButton.type = "button";
  removeButton.className = "document-upload__remove";
  removeButton.textContent = "Entfernen";

  const removeLabel = isPending
    ? `${documentItem.file.name} aus der Auswahl entfernen`
    : `${documentItem.file.name} entfernen`;

  removeButton.setAttribute(
    "aria-label",
    removeLabel,
  );

  removeButton.addEventListener(
    "click",
    () => {
      callbacks.onRemove(documentItem.id);
    },
  );

  listItem.append(
    preview,
    meta,
    removeButton,
  );

  return listItem;
}

function createPreview(
  container: HTMLElement,
  documentItem: DocumentItem,
  onPreview: (
    documentItem: DocumentItem,
  ) => void,
): void {
  const button = document.createElement("button");

  button.type = "button";
  button.className =
    "document-upload__preview-button";

  if (
    documentItem.file.type.startsWith("image/")
  ) {
    button.setAttribute(
      "aria-label",
      `Bild von ${documentItem.file.name} vergrößern`,
    );

    const image = document.createElement("img");

    image.src = documentItem.previewUrl;
    image.alt =
      `Vorschau von ${documentItem.file.name}`;

    button.append(image);

    button.addEventListener(
      "click",
      () => {
        onPreview(documentItem);
      },
    );

    container.append(button);

    return;
  }

  if (
    documentItem.file.type ===
    "application/pdf"
  ) {
    button.classList.add(
      "document-upload__preview-button--pdf",
    );

    button.setAttribute(
      "aria-label",
      `PDF ${documentItem.file.name} öffnen`,
    );

    const pdfIcon = document.createElement("span");

    pdfIcon.className =
      "document-upload__pdf-icon";

    pdfIcon.textContent = "PDF";

    button.append(pdfIcon);

    button.addEventListener(
      "click",
      () => {
        onPreview(documentItem);
      },
    );

    container.append(button);
  }
}