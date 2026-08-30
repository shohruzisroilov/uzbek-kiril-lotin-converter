# Kiril ↔ Lotin Konvertor

> O'zbek matni va fayllarni Kiril va Lotin yozuvlari o'rtasida bepul, tez va aniq konvertatsiya qiluvchi vebsayt.

🌐 **Rasmiy sayt:** [kirillotin.uz](https://kirillotin.uz)

[![CI](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/actions/workflows/ci.yml/badge.svg)](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/blob/main/CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/shohruzisroilov/uzbek-kiril-lotin-converter?style=social)](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/stargazers)

## Imkoniyatlar

- ✅ Kiril → Lotin konvertatsiya
- ✅ Lotin → Kiril konvertatsiya
- ✅ Real vaqtda avtomatik o'girish (yozganingizda darhol)
- ✅ Yozuv turini avtomatik aniqlash
- ✅ `.txt` va `.docx` fayllarni yuklash va yuklab olish
- ✅ `.docx` formatlashini saqlab qolish (shrift, rang, shakl)
- ✅ Natijani nusxalash va `.txt` shaklida yuklab olish
- ✅ Qorong'u rejim (Dark Mode)
- ✅ Mobil va planshet uchun moslangan dizayn
- ✅ To'liq bepul, ro'yxatdan o'tish shart emas
- ✅ Barcha amallar brauzeringizda — matn serverga yuborilmaydi

## Texnologiyalar

| Texnologiya | Versiya | Vazifa |
|---|---|---|
| [Next.js](https://nextjs.org) | 15 | App Router, SSR, metadata |
| [React](https://react.dev) | 19 | UI komponentlar |
| [TypeScript](https://typescriptlang.org) | 5 | Strict typing |
| [TailwindCSS](https://tailwindcss.com) | 3.4 | Styling |
| [lucide-react](https://lucide.dev) | latest | Ikonkalar |
| [JSZip](https://stuk.github.io/jszip/) | 3.10 | `.docx` fayllar bilan ishlash |

## Ishga tushirish

### Talablar

- Node.js **18+**
- npm yoki yarn yoki pnpm

### Lokal o'rnatish

```bash
# Repoyani klon qiling
git clone https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter.git
cd uzbek-kiril-lotin-converter

# Bog'liqliklarni o'rnating
npm install

# Dev server ni ishga tushiring
npm run dev
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)

### Buyruqlar

```bash
npm run dev      # Development server (hot reload)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint tekshiruvi
```

## Papka tuzilmasi

```
.
├── app/
│   ├── layout.tsx          # Root layout, metadata, SEO
│   ├── page.tsx            # Bosh sahifa
│   ├── icon.tsx            # Favicon
│   ├── manifest.ts         # PWA manifest
│   ├── opengraph-image.tsx # OG rasm
│   ├── robots.ts           # robots.txt
│   └── sitemap.ts          # sitemap.xml
├── components/
│   ├── ConverterPage.tsx   # Asosiy UI va mantiq
│   ├── Button.tsx
│   ├── TextArea.tsx
│   ├── FileUploader.tsx
│   ├── ThemeProvider.tsx   # Dark mode
│   ├── ToastContext.tsx
│   └── ToastContainer.tsx
├── lib/
│   ├── converter.ts        # Kiril ↔ Lotin algoritmi
│   └── utils.ts            # File I/O, clipboard, .docx
├── globals.css
└── tailwind.config.ts
```

## Klaviatura yorliqlari

| Yorliq | Vazifa |
|---|---|
| `Ctrl + K` | Hammasini tozalash |

## Deploy

Loyhani [Vercel](https://vercel.com) ga deploy qilish — eng oson yo'l:

1. GitHub repo ni Vercel ga ulang
2. "Deploy" tugmasini bosing
3. Tayyor ✨

Boshqa platformalar: Netlify, Cloudflare Pages, yoki o'z VPS serveringiz.

## Hissa qo'shish

Bu ochiq manba loyha — pull request va issue lar mamnuniyat bilan qabul qilinadi. Boshlashdan oldin [CONTRIBUTING.md](CONTRIBUTING.md) ni o'qing: u yerda loyha tuzilmasi, konvertatsiya algoritmiga o'zgartirish kiritish qoidalari va kod uslubi yozilgan.

Qisqacha:

1. Repoyani **fork** qiling
2. Yangi branch yarating (`git checkout -b fix/ts-harfi`)
3. `npm run lint && npx tsc --noEmit && npm run build` — hammasi o'tsin
4. Commit qiling (`git commit -m 'fix: ...'`) va push qiling
5. **Pull Request** oching

### Xato yoki taklif

| Nima | Qayerga |
|---|---|
| 🔤 Konvertatsiya noto'g'ri | [Konvertatsiya xatosi](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/issues/new?template=conversion_error.yml) |
| 🐛 Saytdagi xato | [Bug report](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/issues/new?template=bug_report.yml) |
| ✨ Yangi imkoniyat | [Taklif](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/issues/new?template=feature_request.yml) |
| 🔒 Xavfsizlik zaifligi | [SECURITY.md](SECURITY.md) — ochiq issue ochmang |

Konvertatsiya xatosi haqida xabar berayotganda albatta misol keltiring: kiritish matni, hozirgi (noto'g'ri) natija va kutilgan natija.

Ishtirokchilardan [Xatti-harakat kodeksi](CODE_OF_CONDUCT.md) ga rioya qilish kutiladi.

## Litsenziya

[MIT](LICENSE) © [Shohruzdev](https://t.me/Shohruz_Isroilov)

Foydalanish, o'zgartirish va tarqatish ruxsat etiladi. Litsenziya nusxasini kiritib qoling.

## Muallif

**Shohruz Isroilov** (Shohruzdev)

- 🌐 Sayt: [kirillotin.uz](https://kirillotin.uz)
- 💬 Telegram: [@Shohruz_Isroilov](https://t.me/Shohruz_Isroilov)
- 🐙 GitHub: [@shohruzisroilov](https://github.com/shohruzisroilov)

---

Agar loyha foydali bo'lsa, ⭐ **star** bering — bu meni katta qo'llab-quvvatlash bo'ladi!
