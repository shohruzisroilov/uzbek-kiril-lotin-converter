# Kiril ↔ Lotin Konvertor

O'zbek matni va fayllarni Kiril va Lotin yozuvlari o'rtasida tez konvertatsiya qiluvchi veb-ilova.

## Texnologiyalar

- **Next.js 15** — App Router
- **React 19** — Funksional komponentlar
- **TypeScript 5** — Strict mode
- **TailwindCSS 3.4** — Styling
- **lucide-react** — Ikonkalar

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda oching: [http://localhost:3000](http://localhost:3000)

## Buyruqlar

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint tekshiruvi
```

## Papka tuzilmasi

```
├── app/
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Bosh sahifa
├── components/
│   ├── ConverterPage.tsx   # Asosiy UI va mantiq
│   ├── Button.tsx          # Tugma komponenti
│   ├── TextArea.tsx        # Matn maydoni
│   ├── ToggleSwitch.tsx    # Toggle komponenti
│   ├── FileUploader.tsx    # Fayl yuklash
│   ├── ThemeProvider.tsx   # Qorong'u/yorug' rejim
│   ├── ToastContext.tsx    # Bildirishnoma tizimi
│   ├── ToastContainer.tsx  # Bildirishnomalar UI
│   └── index.ts            # Eksportlar
├── lib/
│   ├── converter.ts        # Kiril ↔ Lotin algoritmi
│   ├── utils.ts            # Yordamchi funksiyalar
│   └── index.ts            # Eksportlar
├── globals.css             # Global stillar
└── tailwind.config.ts      # Tailwind konfiguratsiyasi
```

## Xususiyatlar

- Kiril → Lotin va Lotin → Kiril konvertatsiya
- Avtomatik yozuv turini aniqlash
- Real vaqtda konvertatsiya (debounce bilan)
- `.txt` va `.docx` fayl yuklash va yuklab olish
- Konvertatsiya tarixi (oxirgi 15 ta)
- Qorong'u/yorug' rejim
- Klaviatura yorliqlari: `Ctrl+Enter`, `Ctrl+Shift+C`, `Ctrl+K`
- localStorage orqali avtosaqlash

## Litsenziya

MIT
