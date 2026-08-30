# Hissa qo'shish qo'llanmasi

Rahmat! Bu loyha o'zbek tilidagi matnlarni Kiril va Lotin yozuvlari o'rtasida bepul o'girish uchun ochiq manba (open source) sifatida ishlab chiqilmoqda. Har qanday hissa — kod, xato hisoboti, imlo tuzatish yoki taklif — qadrlanadi.

## Mundarija

- [Qanday hissa qo'shsam bo'ladi?](#qanday-hissa-qoshsam-boladi)
- [Ishga tushirish](#ishga-tushirish)
- [Loyha tuzilmasi](#loyha-tuzilmasi)
- [Konvertatsiya algoritmiga o'zgartirish](#konvertatsiya-algoritmiga-ozgartirish)
- [Kod uslubi](#kod-uslubi)
- [Commit qoidalari](#commit-qoidalari)
- [Pull Request jarayoni](#pull-request-jarayoni)

## Qanday hissa qo'shsam bo'ladi?

Kod yozishni bilmasangiz ham foydali bo'lishingiz mumkin:

| Hissa | Qanday |
|---|---|
| 🔤 Konvertatsiya xatosi | [Issue oching](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/issues/new?template=conversion_error.yml) — kiritish, hozirgi va kutilgan natija bilan |
| 🐛 Sayt xatosi | Bug report shabloni orqali |
| ✨ Yangi imkoniyat | Avval issue oching, muhokama qilamiz, keyin kod yozing |
| 📝 Matn/imlo | README yoki sayt matnidagi xatolarni to'g'ridan-to'g'ri PR bilan tuzating |
| 🌍 Tarjima | `lib/translations.ts` faylida yangi til qo'shish |
| ⭐ Star | Loyha ko'proq odamga yetib borishiga yordam beradi |

Birinchi marta hissa qo'shayotgan bo'lsangiz — [`good first issue`](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/labels/good%20first%20issue) yorlig'idagi issue larga qarang.

## Ishga tushirish

Talab: **Node.js 20+**

```bash
# 1. Repoyani fork qiling (GitHub'da "Fork" tugmasi)

# 2. O'z fork ingizni klon qiling
git clone https://github.com/SIZNING-USERNAME/uzbek-kiril-lotin-converter.git
cd uzbek-kiril-lotin-converter

# 3. Asl repoyani upstream sifatida qo'shing
git remote add upstream https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter.git

# 4. Bog'liqliklar
npm install

# 5. Env fayl (majburiy emas — analytics uchun)
cp .env.example .env.local

# 6. Dev server
npm run dev
```

Ochiladi: http://localhost:3000

### Buyruqlar

```bash
npm run dev        # Development server
npm run build      # Production build — PR yubormasdan oldin shart
npm run lint       # ESLint
npx tsc --noEmit   # TypeScript tekshiruvi
```

## Loyha tuzilmasi

```
app/          Next.js App Router — sahifalar, metadata, SEO, PWA manifest
components/   React komponentlar (ConverterPage.tsx — asosiy UI)
components/posts/  Blog maqolalari (JSX ko'rinishida)
lib/converter.ts   ⭐ Kiril ↔ Lotin algoritmi — eng muhim fayl
lib/utils.ts       Fayl I/O, clipboard, .docx bilan ishlash
lib/translations.ts  Interfeys tarjimalari
```

Butun konvertatsiya **brauzerda** bajariladi. Foydalanuvchi matni hech qachon serverga yuborilmaydi — bu loyhaning asosiy va'dasi, uni buzadigan o'zgarish qabul qilinmaydi.

## Konvertatsiya algoritmiga o'zgartirish

[`lib/converter.ts`](lib/converter.ts) ikki yo'nalishli xaritadan iborat:

- `cyrillicToLatinMap` — belgi-belgi xarita (`Ғ → Gʻ`, `Ў → Oʻ`, ...)
- `latinToCyrillicPairs` — **uzunroq ketma-ketlik birinchi** tartibida saralangan massiv (`shch` → `sh` → `s`). Tartibni buzmang, aks holda `sh` `s`+`h` sifatida o'qiladi.

Apostrof uchta variantda qo'llab-quvvatlanadi: `'` (U+0027), `ʻ` (U+02BB), `’` (U+2019).

Xarita o'zgartirsangiz, PR da quyidagi jadvalni to'ldiring:

| Kiritish | Oldin | Keyin |
|---|---|---|
| `Ўзбекистон` | `Ozbekiston` | `Oʻzbekiston` |

Va imkon bo'lsa rasmiy imlo qoidasiga havola qo'shing. Konvertatsiya o'zgarishlari eng ehtiyotkorlik bilan ko'rib chiqiladi — chunki ular barcha foydalanuvchilarga ta'sir qiladi.

Sinash uchun kamida shu holatlarni tekshiring:

- Bosh harf va kichik harf (`Ш` va `ш`)
- So'z boshi/oxiridagi apostrof
- Aralash matn (lotin + kiril bir xatboshida)
- Raqam va tinish belgilari o'zgarmasligi
- Ikki tomonlama o'girish: matn → lotin → kiril natijasi asliga yaqin bo'lishi

## Kod uslubi

- **TypeScript strict** — `any` ishlatmang
- **Tailwind** — alohida CSS fayl yozmang, utility klasslardan foydalaning
- Mavjud kod uslubiga ergashing: komponent nomlari `PascalCase`, fayl nomlari komponent nomi bilan bir xil
- Yangi kutubxona qo'shishdan oldin issue oching — bundle hajmi loyha uchun muhim
- Izohlar o'zbek yoki ingliz tilida bo'lishi mumkin, lekin bir fayl ichida aralashtirmang

`npm run lint` va `npx tsc --noEmit` xatosiz o'tishi shart.

> `react/no-unescaped-entities` qoidasi ataylab o'chirilgan ([`.eslintrc.json`](.eslintrc.json)): o'zbek tilida apostrof (`o'zbek`, `qo'shish`) deyarli har bir jumlada uchraydi va uni `&apos;` ga almashtirish matnni o'qib bo'lmas holga keltiradi.

## Commit qoidalari

[Conventional Commits](https://www.conventionalcommits.org/) formatidan foydalaning:

```
feat: .pdf fayllarni qo'llab-quvvatlash qo'shildi
fix: "ц" harfi so'z boshida noto'g'ri o'girilardi
docs: README ga deploy bo'limi qo'shildi
style: tugma paddinglari to'g'rilandi
refactor: converter mantiqi soddalashtirildi
chore: bog'liqliklar yangilandi
```

## Pull Request jarayoni

1. `main` dan yangi branch oching: `git checkout -b fix/ts-harfi`
2. O'zgarishlarni kiriting
3. `npm run lint && npx tsc --noEmit && npm run build` — hammasi o'tishi kerak
4. Commit qiling va fork ingizga push qiling
5. PR oching, shablonni to'ldiring va bog'liq issue ni `Closes #123` bilan bog'lang
6. CI yashil bo'lishini kuting

Kichik, bitta maqsadga qaratilgan PR lar tezroq ko'rib chiqiladi. Katta o'zgarish rejalashtirgan bo'lsangiz, avval issue oching — mehnatingiz behuda ketmasligi uchun.

## Savol bormi?

[Issue](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/issues) oching yoki [Telegram](https://t.me/Shohruz_Isroilov) orqali yozing.

Hissa qo'shish orqali siz kodingiz [MIT litsenziyasi](LICENSE) ostida tarqatilishiga rozilik bildirasiz.
