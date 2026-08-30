# Xavfsizlik siyosati

## Qo'llab-quvvatlanadigan versiya

Faqat [kirillotin.uz](https://kirillotin.uz) da ishlab turgan oxirgi versiya qo'llab-quvvatlanadi.

## Zaiflik haqida xabar berish

Xavfsizlik zaifligini **ochiq issue sifatida joylashtirmang**.

Buning o'rniga:

- 📨 Telegram: [@Shohruz_Isroilov](https://t.me/Shohruz_Isroilov)
- 🔒 Yoki GitHub'ning [Security Advisory](https://github.com/shohruzisroilov/uzbek-kiril-lotin-converter/security/advisories/new) formasi orqali

Xabaringizda quyidagilarni yozing: zaiflik turi, takrorlash qadamlari va mumkin bo'lgan ta'sir.

**Javob muddati:** 72 soat ichida javob beriladi.

## Loyhaning xavfsizlik modeli

Bu to'liq **client-side** ilova:

- Foydalanuvchi kiritgan matn va yuklangan fayllar **serverga yuborilmaydi**
- Konvertatsiya brauzerda, JavaScript orqali bajariladi
- Backend, ma'lumotlar bazasi yoki foydalanuvchi hisoblari yo'q
- Yagona tashqi so'rov — analytics (`.env` orqali sozlanadi, ixtiyoriy)

Shu sababli eng jiddiy hisoblanadigan zaifliklar: XSS, `.docx` faylini qayta ishlashda zararli arxiv (zip bomb, path traversal) va bog'liqliklardagi ma'lum CVE lar.
