// ─── Cyrillic → Latin map ────────────────────────────────────────────────────
const cyrillicToLatinMap: Record<string, string> = {
  // Uppercase
  А: "A",  Б: "B",  В: "V",  Г: "G",  Ғ: "Gʻ", Д: "D",
  Е: "E",  Ё: "Yo", Ж: "J",  З: "Z",  И: "I",  Й: "Y",
  К: "K",  Қ: "Q",  Л: "L",  М: "M",  Н: "N",  Ң: "Ng",
  О: "O",  П: "P",  Р: "R",  С: "S",  Т: "T",  У: "U",
  Ў: "Oʻ", Ф: "F",  Х: "X",  Ц: "Ts", Ч: "Ch", Ш: "Sh",
  Щ: "Sh", Ъ: "ʼ",  Ы: "I",  Ь: "",   Э: "E",  Ю: "Yu",
  Я: "Ya", Ҳ: "H",  Ҷ: "Ch",
  // Lowercase
  а: "a",  б: "b",  в: "v",  г: "g",  ғ: "gʻ", д: "d",
  е: "e",  ё: "yo", ж: "j",  з: "z",  и: "i",  й: "y",
  к: "k",  қ: "q",  л: "l",  м: "m",  н: "n",  ң: "ng",
  о: "o",  п: "p",  р: "r",  с: "s",  т: "t",  у: "u",
  ў: "oʻ", ф: "f",  х: "x",  ц: "ts", ч: "ch", ш: "sh",
  щ: "sh", ъ: "ʼ",  ы: "i",  ь: "",   э: "e",  ю: "yu",
  я: "ya", ҳ: "h",  ҷ: "ch",
};

// ─── Latin → Cyrillic map ────────────────────────────────────────────────────
// Ordered longest-first so multi-char sequences match before single chars.
const latinToCyrillicPairs: [string, string][] = [
  // 4-char
  ["shch", "щ"],
  // 2-char
  ["sh",   "ш"],
  ["ch",   "ч"],
  ["ng",   "ң"],
  ["ts",   "ц"],
  ["yo",   "ё"],
  ["yu",   "ю"],
  ["ya",   "я"],
  ["gʻ",   "ғ"],
  ["oʻ",   "ў"],
  ["g'",   "ғ"],
  ["o'",   "ў"],
  // 1-char
  ["a", "а"], ["b", "б"], ["v", "в"], ["g", "г"], ["d", "д"],
  ["f", "ф"], ["h", "ҳ"], ["i", "и"], ["j", "ж"], ["k", "к"],
  ["l", "л"], ["m", "м"], ["n", "н"], ["o", "о"], ["p", "п"],
  ["q", "қ"], ["r", "р"], ["s", "с"], ["t", "т"], ["u", "у"],
  ["w", "в"], ["x", "х"], ["y", "й"], ["z", "з"],
  ["'", "ъ"], ["ʼ", "ъ"],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function isCyrillic(text: string): boolean {
  return /[Ѐ-ӿ]/.test(text);
}

export function isLatin(text: string): boolean {
  return /[a-zA-Z]/.test(text);
}

function isLetter(ch: string | undefined): boolean {
  return !!ch && /[a-zA-Zа-яА-ЯёЁўЎқҚғҒҳҲңҢ]/.test(ch);
}

// ─── Cyrillic → Latin ────────────────────────────────────────────────────────

export function cyrillicToLatin(text: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    result += cyrillicToLatinMap[ch] ?? ch;
  }
  return result;
}

// ─── Latin → Cyrillic ────────────────────────────────────────────────────────

export function latinToCyrillic(text: string): string {
  let result = "";
  let i = 0;
  const lower = text.toLowerCase();

  while (i < text.length) {
    // Word-initial / post-vowel "e" → "э"; otherwise "е"
    if (lower[i] === "e") {
      const prev = text[i - 1];
      const atStart = !isLetter(prev) || /[aeiouöäюяёAEIOUаеиоуэыюяёАЕИОУЭЫЮЯЁ]/.test(prev ?? "");
      const cyr = atStart ? "э" : "е";
      const isUpper = text[i] === "E";
      result += isUpper ? cyr.toUpperCase() : cyr;
      i++;
      continue;
    }

    let matched = false;
    for (const [lat, cyr] of latinToCyrillicPairs) {
      if (lower.startsWith(lat, i)) {
        const src = text.slice(i, i + lat.length);
        const allUpper = src === src.toUpperCase() && src !== src.toLowerCase();
        const firstUpper = text[i] === text[i].toUpperCase() && text[i] !== text[i].toLowerCase();

        if (allUpper && lat.length > 1) {
          result += cyr.toUpperCase();
        } else if (firstUpper) {
          result += cyr.charAt(0).toUpperCase() + cyr.slice(1);
        } else {
          result += cyr;
        }
        i += lat.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += text[i];
      i++;
    }
  }

  return result;
}

// ─── Auto-detect & convert ───────────────────────────────────────────────────

export function autoConvert(text: string): string {
  const cyrCount = (text.match(/[Ѐ-ӿ]/g) ?? []).length;
  const latCount = (text.match(/[a-zA-Z]/g) ?? []).length;

  if (cyrCount === 0 && latCount === 0) return text;
  return cyrCount >= latCount ? cyrillicToLatin(text) : latinToCyrillic(text);
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export function getCharacterCount(text: string): number {
  return text.replace(/\s/g, "").length;
}
