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
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
