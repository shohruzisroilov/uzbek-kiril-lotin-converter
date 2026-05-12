/**
 * Debounce function to delay execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Save text to localStorage
 */
export function saveToLocalStorage(key: string, value: string): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }
}

/**
 * Get text from localStorage
 */
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

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Download text as a .txt file
 */
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
 * Take an existing .docx file, transform every run of text via `transform`,
 * and download the result as a new .docx — preserving styling and layout.
 */
export async function downloadConvertedDocx(
  file: File,
  transform: (text: string) => string,
  filename: string,
): Promise<void> {
  const { default: JSZip } = await import("jszip");
  const zip = await JSZip.loadAsync(await file.arrayBuffer());

  // Convert text in the main document and any header/footer parts.
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
 * Extract text from a .docx file by unzipping the archive and parsing
 * word/document.xml. A .docx is a ZIP container — reading it as plain
 * text yields garbage (the PK header etc.), so JSZip is required.
 */
export async function extractTextFromDocx(file: File): Promise<string> {
  const { default: JSZip } = await import("jszip");
  const zip = await JSZip.loadAsync(await file.arrayBuffer());
  const docXml = zip.file("word/document.xml");
  if (!docXml) {
    throw new Error("word/document.xml топилмади — бу яроқли .docx файл эмас");
  }
  const xml = await docXml.async("string");

  // Replace paragraph and line breaks with newlines, drop other tags,
  // then decode XML entities.
  const withBreaks = xml
    .replace(/<w:p[ >][^]*?(?=<\/w:p>)<\/w:p>/g, (m) =>
      m.replace(/<w:br\s*\/?>/g, "\n") + "\n",
    )
    .replace(/<w:tab\s*\/?>/g, "\t");

  const text = withBreaks
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&apos;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return text;
}

/**
 * Extract text from .txt file
 */
export async function extractTextFromTxt(file: File): Promise<string> {
  return file.text();
}

/**
 * Validate file type
 */
export function isValidFileType(file: File): boolean {
  const validTypes = [
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const validExtensions = [".txt", ".docx"];

  const isValidType = validTypes.includes(file.type);
  const isValidExtension = validExtensions.some((ext) =>
    file.name.toLowerCase().endsWith(ext),
  );

  return isValidType || isValidExtension;
}

/**
 * Validate file size (max 5MB)
 */
export function isValidFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}
