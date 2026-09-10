import {
  ALLOWED_TYPES,
  MAX_FILE_SIZE,
  type DocumentItem,
} from "./document-upload.types.js";

import {
  closePreview,
  openImagePreview,
  openPdfPreview,
  resetPreview,
} from "./document-upload.preview.js";

import {
  createDocumentElement,
  createPendingDocumentElement,
} from "./document-upload.render.js";

import {
  createDocumentId,
  isSameFile,
} from "./document-upload.utils.js";

export class DocumentUpload extends HTMLElement {
  private input: HTMLInputElement | null = null;
  private dropzone: HTMLElement | null = null;
  private submitButton: HTMLButtonElement | null = null;

  private selection: HTMLElement | null = null;
  private pendingList: HTMLUListElement | null = null;
  private pendingCount: HTMLElement | null = null;

  private message: HTMLElement | null = null;

  private documentsSection: HTMLElement | null = null;
  private listTitle: HTMLElement | null = null;
  private list: HTMLUListElement | null = null;
  private count: HTMLElement | null = null;

  private dialog: HTMLDialogElement | null = null;
  private dialogImage: HTMLImageElement | null = null;
  private dialogPdf: HTMLIFrameElement | null = null;
  private dialogTitle: HTMLElement | null = null;
  private dialogLink: HTMLAnchorElement | null = null;
  private dialogClose: HTMLButtonElement | null = null;

  private pendingDocuments: DocumentItem[] = [];
  private documents: DocumentItem[] = [];

  /** ID des Dokuments, dessen Vorschau gerade im Dialog geöffnet ist. */
  private previewedId: string | null = null;

  /**
   * Ohne diesen Schutz öffnet der Browser eine Datei, die neben der
   * Dropzone losgelassen wird, und ersetzt damit die gesamte Seite.
   * Beide Listener werden in `disconnectedCallback` wieder entfernt.
   */
  private handleWindowDragOver = (event: DragEvent): void => {
    event.preventDefault();

    if (event.dataTransfer && !this.isInsideDropzone(event.target)) {
      event.dataTransfer.dropEffect = "none";
    }
  };

  private handleWindowDrop = (event: DragEvent): void => {
    event.preventDefault();
  };

  private isInsideDropzone(target: EventTarget | null): boolean {
    if (!this.dropzone || !(target instanceof Node)) {
      return false;
    }

    return this.dropzone.contains(target);
  }

  connectedCallback(): void {
    this.loadStyles();

    window.addEventListener("dragover", this.handleWindowDragOver);
    window.addEventListener("drop", this.handleWindowDrop);

    void this.loadTemplate().catch((error: unknown) => {
      console.error("Document upload could not be loaded.", error);

      this.renderError();
    });
  }

  private loadStyles(): void {
    const stylesheetId = "document-upload-styles";

    if (document.getElementById(stylesheetId)) {
      return;
    }

    const stylesheet = document.createElement("link");

    stylesheet.id = stylesheetId;
    stylesheet.rel = "stylesheet";
    stylesheet.href = "./src/components/document-upload/document-upload.css";

    document.head.append(stylesheet);
  }

  private async loadTemplate(): Promise<void> {
    const response = await fetch(
      "./src/components/document-upload/document-upload.html",
    );

    if (!response.ok) {
      throw new Error("Document upload template could not be loaded.");
    }

    const html = await response.text();

    const template = document.createElement("template");

    template.innerHTML = html;

    this.replaceChildren(template.content.cloneNode(true));

    this.setupElements();
    this.setupEvents();

    this.renderPendingDocuments();
    this.renderDocuments();
  }

  private setupElements(): void {
    this.input = this.querySelector<HTMLInputElement>(
      ".document-upload__input",
    );

    this.dropzone = this.querySelector<HTMLElement>(
      ".document-upload__dropzone",
    );

    this.submitButton = this.querySelector<HTMLButtonElement>(
      ".document-upload__submit",
    );

    this.selection = this.querySelector<HTMLElement>(
      ".document-upload__pending",
    );

    this.pendingList = this.querySelector<HTMLUListElement>(
      ".document-upload__pending-list",
    );

    this.pendingCount = this.querySelector<HTMLElement>(
      ".document-upload__pending-count",
    );

    this.message = this.querySelector<HTMLElement>(".document-upload__message");

    this.documentsSection = this.querySelector<HTMLElement>(
      ".document-upload__documents",
    );

    this.listTitle = this.querySelector<HTMLElement>("#document-list-title");

    this.list = this.querySelector<HTMLUListElement>(".document-upload__list");

    this.count = this.querySelector<HTMLElement>(".document-upload__count");

    this.dialog = this.querySelector<HTMLDialogElement>(
      ".document-upload__dialog",
    );

    this.dialogImage = this.querySelector<HTMLImageElement>(
      ".document-upload__dialog-image",
    );

    this.dialogPdf = this.querySelector<HTMLIFrameElement>(
      ".document-upload__dialog-pdf",
    );

    this.dialogTitle = this.querySelector<HTMLElement>(
      "#document-preview-title",
    );

    this.dialogLink = this.querySelector<HTMLAnchorElement>(
      ".document-upload__dialog-link",
    );

    this.dialogClose = this.querySelector<HTMLButtonElement>(
      ".document-upload__dialog-close",
    );
  }

  private setupEvents(): void {
    if (!this.input || !this.submitButton || !this.dropzone) {
      return;
    }

    this.input.addEventListener("change", () => {
      const files = Array.from(this.input?.files ?? []);

      this.setPendingFiles(files);

      // Auswahl zurücksetzen, damit dieselbe Datei nach dem Entfernen
      // erneut ausgewählt werden kann und "change" wieder ausgelöst wird.
      if (this.input) {
        this.input.value = "";
      }
    });

    this.submitButton.addEventListener("click", () => {
      this.addPendingFiles();
    });

    this.dropzone.addEventListener("dragover", (event) => {
      event.preventDefault();

      this.dropzone?.classList.add("is-dragover");
    });

    // Beim Wechsel auf ein Kindelement feuert "dragleave" ebenfalls.
    // relatedTarget ist das neu betretene Element: liegt es noch in der
    // Dropzone, wurde sie nicht verlassen und das Highlight bleibt.
    this.dropzone.addEventListener("dragleave", (event) => {
      if (this.isInsideDropzone(event.relatedTarget)) {
        return;
      }

      this.dropzone?.classList.remove("is-dragover");
    });

    this.dropzone.addEventListener("drop", (event) => {
      event.preventDefault();

      this.dropzone?.classList.remove("is-dragover");

      const files = Array.from(event.dataTransfer?.files ?? []);

      this.setPendingFiles(files);
    });

    this.dialogClose?.addEventListener("click", () => {
      if (this.dialog) {
        closePreview(this.dialog);
      }
    });

    this.dialog?.addEventListener("click", (event) => {
      if (event.target === this.dialog) {
        if (this.dialog) {
          closePreview(this.dialog);
        }
      }
    });

    this.dialog?.addEventListener("close", () => {
      this.previewedId = null;

      if (
        this.dialogImage &&
        this.dialogPdf &&
        this.dialogTitle &&
        this.dialogLink
      ) {
        resetPreview(
          this.dialogImage,
          this.dialogPdf,
          this.dialogTitle,
          this.dialogLink,
        );
      }
    });
  }

  /**
   * Ergänzt die Pending-Auswahl um die gültigen Dateien eines
   * Auswahlvorgangs. Eine bestehende Auswahl bleibt dabei erhalten,
   * auch wenn der neue Vorgang ausschließlich ungültige Dateien enthält.
   */
  private setPendingFiles(files: File[]): void {
    this.clearMessage();

    const errors: string[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.has(file.type)) {
        errors.push(`${file.name}: Dateityp nicht unterstützt.`);

        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: Datei ist größer als 10 MB.`);

        continue;
      }

      if (this.isAlreadySelected(file)) {
        errors.push(`${file.name}: Datei ist bereits ausgewählt.`);

        continue;
      }

      if (this.isAlreadyAdded(file)) {
        errors.push(`${file.name}: Datei wurde bereits hinzugefügt.`);

        continue;
      }

      this.pendingDocuments.push({
        id: createDocumentId(),
        file,
        previewUrl: URL.createObjectURL(file),
        addedAt: new Date(),
      });
    }

    this.renderPendingDocuments();

    if (errors.length > 0) {
      this.showMessage(errors.join(" "));
    }
  }

  private isAlreadySelected(file: File): boolean {
    return this.pendingDocuments.some((item) => isSameFile(item.file, file));
  }

  private isAlreadyAdded(file: File): boolean {
    return this.documents.some((item) => isSameFile(item.file, file));
  }

  private renderPendingDocuments(): void {
    if (
      !this.selection ||
      !this.pendingList ||
      !this.pendingCount ||
      !this.submitButton
    ) {
      return;
    }

    this.pendingList.replaceChildren();

    if (this.pendingDocuments.length === 0) {
      this.selection.hidden = true;
      this.pendingCount.textContent = "0 Dateien";
      this.submitButton.disabled = true;

      return;
    }

    this.selection.hidden = false;

    this.pendingCount.textContent =
      this.pendingDocuments.length === 1
        ? "1 Datei"
        : `${this.pendingDocuments.length} Dateien`;

    this.submitButton.disabled = false;

    for (const documentItem of this.pendingDocuments) {
      const listItem = createPendingDocumentElement(documentItem, {
        onPreview: (item) => {
          this.handlePreview(item);
        },
        onRemove: (id) => {
          this.removePendingDocument(id);
        },
      });

      this.pendingList.append(listItem);
    }
  }

  private handlePreview(documentItem: DocumentItem): void {
    if (
      !this.dialog ||
      !this.dialogImage ||
      !this.dialogPdf ||
      !this.dialogTitle ||
      !this.dialogLink
    ) {
      return;
    }

    if (documentItem.file.type.startsWith("image/")) {
      openImagePreview(
        this.dialog,
        this.dialogImage,
        this.dialogPdf,
        this.dialogTitle,
        this.dialogLink,
        documentItem,
      );

      this.previewedId = documentItem.id;

      return;
    }

    if (documentItem.file.type === "application/pdf") {
      openPdfPreview(
        this.dialog,
        this.dialogImage,
        this.dialogPdf,
        this.dialogTitle,
        this.dialogLink,
        documentItem,
      );

      this.previewedId = documentItem.id;
    }
  }

  private addPendingFiles(): void {
    if (this.pendingDocuments.length === 0) {
      return;
    }

    this.documents.push(...this.pendingDocuments);

    this.pendingDocuments = [];

    if (this.input) {
      this.input.value = "";
    }

    this.clearMessage();

    this.renderPendingDocuments();
    this.renderDocuments();

    // Der Submit-Button wird beim Rendern deaktiviert. Ohne diesen
    // Schritt verliert die Tastaturbedienung den Fokus an <body>.
    this.listTitle?.focus();
  }

  private renderDocuments(): void {
    if (!this.list || !this.documentsSection || !this.count) {
      return;
    }

    this.list.replaceChildren();

    this.documentsSection.hidden = this.documents.length === 0;

    this.count.textContent =
      this.documents.length === 1
        ? "1 Datei"
        : `${this.documents.length} Dateien`;

    for (const documentItem of this.documents) {
      const listItem = createDocumentElement(documentItem, {
        onPreview: (item) => {
          this.handlePreview(item);
        },
        onRemove: (id) => {
          this.removeDocument(id);
        },
      });

      this.list.append(listItem);
    }
  }

  private removePendingDocument(id: string): void {
    const index = this.pendingDocuments.findIndex((item) => item.id === id);

    const documentItem = this.pendingDocuments[index];

    if (!documentItem) {
      return;
    }

    URL.revokeObjectURL(documentItem.previewUrl);

    this.pendingDocuments.splice(index, 1);

    this.closePreviewIfShowing(id);

    this.renderPendingDocuments();

    this.focusAfterRemoval(this.pendingList, index);
  }

  private removeDocument(id: string): void {
    const index = this.documents.findIndex((item) => item.id === id);

    const documentItem = this.documents[index];

    if (!documentItem) {
      return;
    }

    URL.revokeObjectURL(documentItem.previewUrl);

    this.documents.splice(index, 1);

    this.closePreviewIfShowing(id);

    this.renderDocuments();

    this.focusAfterRemoval(this.list, index);
  }

  /**
   * Schließt den Dialog nur, wenn er die gerade entfernte Datei zeigt.
   * Die Vorschau einer anderen Datei bleibt dadurch geöffnet.
   */
  private closePreviewIfShowing(id: string): void {
    if (this.previewedId !== id || !this.dialog) {
      return;
    }

    closePreview(this.dialog);
  }

  /**
   * Setzt den Fokus nach dem Entfernen auf den nachrückenden Eintrag,
   * ersatzweise auf den vorherigen. Ist die Liste leer, übernimmt das
   * Dateifeld, weil das die nächste sinnvolle Aktion ist.
   */
  private focusAfterRemoval(
    list: HTMLUListElement | null,
    removedIndex: number,
  ): void {
    const removeButtons = list?.querySelectorAll<HTMLButtonElement>(
      ".document-upload__remove",
    );

    if (!removeButtons || removeButtons.length === 0) {
      this.input?.focus();

      return;
    }

    const focusIndex = Math.min(removedIndex, removeButtons.length - 1);

    removeButtons[focusIndex]?.focus();
  }

  private showMessage(message: string): void {
    if (!this.message) {
      return;
    }

    this.message.hidden = false;
    this.message.textContent = message;
  }

  private clearMessage(): void {
    if (!this.message) {
      return;
    }

    this.message.hidden = true;
    this.message.textContent = "";
  }

  private renderError(): void {
    this.innerHTML = `
      <div
        class="document-upload__message"
        role="alert"
      >
        <p>
          Die Upload-Komponente konnte nicht geladen werden.
        </p>
      </div>
    `;
  }

  disconnectedCallback(): void {
    window.removeEventListener("dragover", this.handleWindowDragOver);
    window.removeEventListener("drop", this.handleWindowDrop);

    for (const documentItem of this.pendingDocuments) {
      URL.revokeObjectURL(documentItem.previewUrl);
    }

    for (const documentItem of this.documents) {
      URL.revokeObjectURL(documentItem.previewUrl);
    }
  }
}

customElements.define("document-upload", DocumentUpload);
