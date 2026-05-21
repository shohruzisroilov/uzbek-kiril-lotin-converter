export function saveToLocalStorage(key: string, value: string): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }
}

export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Failed to read from localStorage:", error);
      return null;
    }
  }
  return null;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textArea);
    return success;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

export function downloadAsTextFile(content: string, filename: string): void {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content),
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Transform every run of text in a .docx via `transform` and download the
 * result — preserving styling and layout.
 */
export async function downloadConvertedDocx(
  file: File,
  transform: (text: string) => string,
  filename: string,
): Promise<void> {
  const { default: JSZip } = await import("jszip");
  const zip = await JSZip.loadAsync(await file.arrayBuffer());

  const targets = Object.keys(zip.files).filter(
    (p) =>
      p === "word/document.xml" ||
      /^word\/(header|footer)\d*\.xml$/.test(p) ||
      p === "word/footnotes.xml" ||
      p === "word/endnotes.xml",
  );

  for (const path of targets) {
    const entry = zip.file(path);
    if (!entry) continue;
    const xml = await entry.async("string");
    const updated = xml.replace(
      /(<w:t(?:\s[^>]*)?>)([\s\S]*?)(<\/w:t>)/g,
      (_m, open, inner, close) => {
        const decoded = inner
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, "\"")
          .replace(/&apos;/g, "'");
        return open + escapeXml(transform(decoded)) + close;
      },
    );
    zip.file(path, updated);
  }

  const blob = await zip.generateAsync({
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  downloadBlob(blob, filename);
}

/**
 * A .docx is a ZIP container — reading it as plain text yields garbage,
 * so we unzip and parse word/document.xml.
 */
export async function extractTextFromDocx(file: File): Promise<string> {
  const { default: JSZip } = await import("jszip");
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const docXml = zip.file("word/document.xml");
  if (!docXml) {
    throw new Error("word/document.xml топилмади — бу яроқли .docx файл эмас");
  }
  const xml = await docXml.async("string");

  const withBreaks = xml
    .replace(/<w:p[ >][^]*?(?=<\/w:p>)<\/w:p>/g, (m) =>
      m.replace(/<w:br\s*\/?>/g, "\n") + "\n",
    )
    .replace(/<w:tab\s*\/?>/g, "\t");

  return withBreaks
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function extractTextFromTxt(file: File): Promise<string> {
  return file.text();
}

export function isValidFileType(file: File): boolean {
  const validTypes = [
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const validExtensions = [".txt", ".docx"];

  return (
    validTypes.includes(file.type) ||
    validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
  );
}

export function isValidFileSize(file: File, maxSizeMB: number = 5): boolean {
  return file.size <= maxSizeMB * 1024 * 1024;
}
