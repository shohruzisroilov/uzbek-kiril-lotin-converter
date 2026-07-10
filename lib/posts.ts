import type { ReactNode } from "react";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingMinutes: number;
  keywords: string[];
  content: () => ReactNode;
};

import { KirilLotinTarix } from "@/components/posts/KirilLotinTarix";
import { WordKirilLotin } from "@/components/posts/WordKirilLotin";
import { ApostrofQoidasi } from "@/components/posts/ApostrofQoidasi";
import { XvaHFarqi } from "@/components/posts/XvaHFarqi";
import { DocxKonvertatsiya } from "@/components/posts/DocxKonvertatsiya";
import { OnlaynKonvertor } from "@/components/posts/OnlaynKonvertor";
import { UzbekAlifbosiQoidalari } from "@/components/posts/UzbekAlifbosiQoidalari";
import { TxtFaylKonvertatsiya } from "@/components/posts/TxtFaylKonvertatsiya";
import { KirilLotinFarqi } from "@/components/posts/KirilLotinFarqi";
import { TransliteratsiyaNima } from "@/components/posts/TransliteratsiyaNima";

export const posts: Post[] = [
  {
    slug: "kiril-lotin-tarix-farqi",
    title: "Кирил ва Лотин ёзуви: тарих, фарқ ва қўлланилиш",
    description:
      "Ўзбек тилидаги кирил ва лотин ёзуви тарихи, иккиси ўртасидаги фарқлар ва ҳозирги кунда қандай қўлланилиши ҳақида тўлиқ маълумот.",
    date: "2026-05-15",
    readingMinutes: 8,
    keywords: [
      "кирил лотин тарих",
      "ўзбек алифбоси",
      "лотин ёзуви",
      "kiril lotin tarix",
      "uzbek alphabet history",
    ],
    content: KirilLotinTarix,
  },
  {
    slug: "word-kiril-lotin-otkazish",
    title: "Microsoft Word'да кирил матнни лотинга ўтказиш — тўлиқ йўриқнома",
    description:
      "Word ҳужжатидаги кирил матнни лотин ёзувига форматлашни сақлаб қолган ҳолда қандай ўтказиш мумкинлиги бўйича қадам-баъдам йўриқнома.",
    date: "2026-05-18",
    readingMinutes: 6,
    keywords: [
      "word kiril lotin",
      "docx kiril lotin",
      "microsoft word ўгириш",
      "word kirill latin convert",
    ],
    content: WordKirilLotin,
  },
  {
    slug: "apostrof-qachon-ishlatiladi",
    title: "Апостроф (') қачон ишлатилади — ўзбек лотин ёзуви қоидалари",
    description:
      "Ўзбек лотин ёзувида апостроф қачон ва қандай ишлатилиши, энг кўп учрайдиган хатолар ва мисоллар билан тушунтириш.",
    date: "2026-05-20",
    readingMinutes: 5,
    keywords: [
      "апостроф қачон ишлатилади",
      "o'zbek apostrof",
      "ўзбек тилида апостроф",
      "o' va g' qoidasi",
    ],
    content: ApostrofQoidasi,
  },
  {
    slug: "x-va-h-farqi",
    title: "Х ва Ҳ ҳарфларининг фарқи — энг кўп қилинадиган хато",
    description:
      "Кирил Х ва Ҳ ҳарфлари лотинда X ва H билан ёзилади. Уларнинг талаффуз ва ёзилишдаги фарқлари, эслаб қолиш йўллари.",
    date: "2026-05-21",
    readingMinutes: 4,
    keywords: ["x va h farqi", "х ва ҳ фарқи", "uzbek x h", "lotin x h"],
    content: XvaHFarqi,
  },
  {
    slug: "docx-faylni-konvertatsiya-qilish",
    title: "Docx файлни кирилдан лотинга ўгириш — форматлашни сақлаб қолиш",
    description:
      "Word ҳужжатларини (.docx) кирилдан лотинга ёки тескариси шрифт, ранг ва жадвалларни сақлаб қолган ҳолда ўгириш йўллари.",
    date: "2026-05-22",
    readingMinutes: 5,
    keywords: [
      "docx konvertatsiya",
      ".docx файл ўгириш",
      "word fayl o'girish",
      "docx kiril lotin",
    ],
    content: DocxKonvertatsiya,
  },
  {
    slug: "onlayn-kiril-lotin-konvertor",
    title: "Онлайн кирил лотин конвертор — қайсини танлаш керак?",
    description:
      "Ўзбек матнини кирилдан лотинга ўгириш учун онлайн конвертор танлашда нимага эътибор бериш керак? Аниқлик, форматлаш, махфийлик.",
    date: "2026-06-01",
    readingMinutes: 5,
    keywords: [
      "onlayn kiril lotin konvertor",
      "онлайн конвертор",
      "kiril lotin online",
      "uzbek transliterator online",
      "bepul konvertor",
    ],
    content: OnlaynKonvertor,
  },
  {
    slug: "uzbek-alifbosi-qoidalari",
    title: "Ўзбек лотин алифбоси қоидалари — тўлиқ қўлланма",
    description:
      "Ўзбек лотин алифбосининг расмий қоидалари: X ва H фарқи, апостроф, Ye/E, Sh, Ch, Ts, Oʻ, Gʻ ва бошқа ҳарфларни тўғри ёзиш.",
    date: "2026-06-03",
    readingMinutes: 7,
    keywords: [
      "uzbek lotin alifbosi qoidalari",
      "o'zbek lotin yozuvi",
      "lotin alifbosi",
      "uzbek latin alphabet rules",
      "ўзбек алифбоси қоидалари",
    ],
    content: UzbekAlifbosiQoidalari,
  },
  {
    slug: "txt-faylni-kiril-lotinga-otkazish",
    title: "TXT файлни кирилдан лотинга ўтказиш — онлайн бепул",
    description:
      "Оддий матн (.txt) файлини кирилдан лотинга ёки лотиндан кириллга онлайн, бепул ва тез ўгириш. Кодировка муаммолари ва уларнинг ечими.",
    date: "2026-06-05",
    readingMinutes: 4,
    keywords: [
      "txt fayl kiril lotin",
      "txt konvertatsiya",
      "matn fayl o'girish",
      "txt file converter uzbek",
      ".txt кирил лотин",
    ],
    content: TxtFaylKonvertatsiya,
  },
  {
    slug: "kiril-lotin-nima-farqi",
    title: "Кирил ва Лотин — қандай фарқланади ва қайси бири ишлатилади?",
    description:
      "Ўзбекистонда кирил ва лотин ёзуви параллель ишлатилади. Иккисининг фарқи, қаерда қайси ёзув қўлланиши ва ҳарфлар жадвали.",
    date: "2026-06-07",
    readingMinutes: 5,
    keywords: [
      "kiril lotin farqi",
      "кирил лотин фарқи",
      "o'zbek yozuvi",
      "uzbek script comparison",
      "кирил ёки лотин",
    ],
    content: KirilLotinFarqi,
  },
  {
    slug: "transliteratsiya-nima",
    title: "Транслитерация нима? — Ўзбек тилида транслитерация",
    description:
      "Транслитерация ва таржима фарқи, ўзбек тилида транслитерациянинг расмий қоидалари ва автоматик транслитерация қандай ишлайди.",
    date: "2026-06-10",
    readingMinutes: 5,
    keywords: [
      "transliteratsiya nima",
      "транслитерация",
      "uzbek transliteration",
      "kiril lotin transliteratsiya",
      "ўзбек транслитерация",
    ],
    content: TransliteratsiyaNima,
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
