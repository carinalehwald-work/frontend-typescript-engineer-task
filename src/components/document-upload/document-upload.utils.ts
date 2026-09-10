/**
 * Erzeugt eine eindeutige ID für ein Dokument.
 *
 * `crypto.randomUUID()` steht nur in einem Secure Context zur Verfügung
 * (https oder localhost). Wird die Seite über eine HTTP-LAN-Adresse
 * geöffnet, ist die Methode nicht vorhanden. `crypto.getRandomValues()`
 * ist dort weiterhin verfügbar und dient deshalb als Fallback.
 */
export function createDocumentId(): string {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return Array.from(bytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

/**
 * Vergleicht Name, Größe und Änderungsdatum. Das genügt, um dieselbe
 * Datei innerhalb der Komponente zuverlässig wiederzuerkennen.
 */
export function isSameFile(a: File, b: File): boolean {
  return (
    a.name === b.name &&
    a.size === b.size &&
    a.lastModified === b.lastModified
  );
}

export function getFileType(file: File): string {
  switch (file.type) {
    case "application/pdf":
      return "PDF";

    case "image/jpeg":
      return "JPG";

    case "image/png":
      return "PNG";

    default:
      return "Datei";
  }
}

export function formatFileSize(size: number): string {
  if (size < 1024 * 1024) {
    return `${Math.max(
      1,
      Math.round(size / 1024),
    )} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(1)} MB`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(
    "de-DE",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  ).format(date);
}