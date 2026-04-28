// ─── Cyrillic → Latin map ────────────────────────────────────────────────────
const cyrillicToLatinMap: Record<string, string> = {
  // Uppercase
  А: "A",  Б: "B",  В: "V",  Г: "G",  Ғ: "Gʻ", Д: "D",
  Е: "E",  Ё: "Yo", Ж: "J",  З: "Z",  И: "I",  Й: "Y",
  К: "K",  Қ: "Q",  Л: "L",  М: "M",  Н: "N",  Ң: "Ng",
  О: "O",  П: "P",  Р: "R",  С: "S",  Т: "T",  У: "U",
  Ў: "Oʻ", Ф: "F",  Х: "X",  Ц: "Ts", Ч: "Ch", Ш: "Sh",
  Щ: "Sh", Ъ: "'",  Ы: "I",  Ь: "",   Э: "E",  Ю: "Yu",
  Я: "Ya", Ҳ: "H",  Ҷ: "Ch",
  // Lowercase
  а: "a",  б: "b",  в: "v",  г: "g",  ғ: "gʻ", д: "d",
  е: "e",  ё: "yo", ж: "j",  з: "z",  и: "i",  й: "y",
  к: "k",  қ: "q",  л: "l",  м: "m",  н: "n",  ң: "ng",
  о: "o",  п: "p",  р: "r",  с: "s",  т: "t",  у: "u",
  ў: "oʻ", ф: "f",  х: "x",  ц: "ts", ч: "ch", ш: "sh",
  щ: "sh", ъ: "'",  ы: "i",  ь: "",   э: "e",  ю: "yu",
  я: "ya", ҳ: "h",  ҷ: "ch",
};

// ─── Latin → Cyrillic map ────────────────────────────────────────────────────
// Ordered so longer sequences are tried first (handled in latinToCyrillic)
const latinToCyrillicPairs: [string, string][] = [
  // 4-char
  ["shch", "щ"],
  // 3-char
  ["she",  "ше"], ["shi",  "ши"], ["sho",  "шо"], ["shu",  "шу"],
  ["sha",  "ша"], ["shʼ",  "шъ"],
  ["che",  "че"], ["chi",  "чи"], ["cho",  "чо"], ["chu",  "чу"],
  ["cha",  "ча"],
  ["tse",  "це"], ["tsi",  "ци"], ["tso",  "цо"], ["tsu",  "цу"],
  ["tsa",  "ца"],
  // 2-char
  ["sh",   "ш"],
  ["ch",   "ч"],
  ["ng",   "нг"],
  ["ts",   "ц"],
  ["yo",   "ё"],
  ["yu",   "ю"],
  ["ya",   "я"],
  ["gʻ",   "ғ"],
  ["oʻ",   "ў"],
  ["g'",   "ғ"],
  ["o'",   "ў"],
  ["u'",   "ў"],
  // 1-char
  ["a",    "а"],
  ["b",    "б"],
  ["v",    "в"],
  ["g",    "г"],
  ["d",    "д"],
  ["e",    "е"],
  ["f",    "ф"],
  ["h",    "ҳ"],
  ["i",    "и"],
  ["j",    "ж"],
  ["k",    "к"],
  ["l",    "л"],
  ["m",    "м"],
  ["n",    "н"],
  ["o",    "о"],
  ["p",    "п"],
  ["q",    "қ"],
  ["r",    "р"],
  ["s",    "с"],
  ["t",    "т"],
  ["u",    "у"],
  ["w",    "в"],
  ["x",    "х"],
  ["y",    "й"],
  ["z",    "з"],
  ["'",    "ъ"],
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** True if text contains Cyrillic characters */
export function isCyrillic(text: string): boolean {
  return /[\u0400-\u04FF]/.test(text);
}

/** True if text contains Latin characters */
export function isLatin(text: string): boolean {
  return /[a-zA-Z]/.test(text);
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
    let matched = false;

    for (const [lat, cyr] of latinToCyrillicPairs) {
      if (lower.startsWith(lat, i)) {
        // Preserve capitalisation: if the first source char is uppercase, capitalise the Cyrillic output
        const isUpper = text[i] === text[i].toUpperCase() && text[i] !== text[i].toLowerCase();
        result += isUpper ? cyr.charAt(0).toUpperCase() + cyr.slice(1) : cyr;
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
  const cyrCount = (text.match(/[\u0400-\u04FF]/g) ?? []).length;
  const latCount = (text.match(/[a-zA-Z]/g) ?? []).length;

  if (cyrCount === 0 && latCount === 0) return text;
  return cyrCount >= latCount ? cyrillicToLatin(text) : latinToCyrillic(text);
}

// ─── Stats ───────────────────────────────────────────────────────────────────

/** Character count excluding whitespace */
export function getCharacterCount(text: string): number {
  return text.replace(/\s/g, "").length;
}
