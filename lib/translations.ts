export type Locale = "uz-cyr" | "uz-lat" | "ru" | "en";

export interface TranslationDict {
  metaTitle: string;
  metaDesc: string;
  logoSub: string;
  navAbout: string;
  navFeatures: string;
  navFaq: string;
  navBlog: string;
  navContact: string;
  navDonate: string;
  contactTooltip: string;
  themeToggleDark: string;
  themeToggleLight: string;
  
  uploaderDropzone: string;
  uploaderProcessing: string;
  uploaderConverting: string;
  uploaderReady: string;
  uploaderDownload: string;
  uploaderRemove: string;
  uploaderErrFormat: string;
  uploaderErrSize: string;
  uploaderErrEmpty: string;
  uploaderErrUnknown: string;
  uploaderErrRead: string;

  panelInputHeader: string;
  panelInputClear: string;
  panelInputPlaceholder: string;
  panelOutputHeader: string;
  panelOutputCopy: string;
  panelOutputCopied: string;
  panelOutputDownload: string;
  panelOutputPlaceholder: string;
  panelCharCount: string;

  aboutEyebrow: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  
  featuresTitle: string;
  featuresPrivacyEyebrow: string;
  featuresPrivacyTitle: string;
  featuresPrivacyDesc: string;
  featuresWordEyebrow: string;
  featuresWordTitle: string;
  featuresWordDesc: string;
  featuresFootnote: string;

  faqEyebrow: string;
  faqTitle: string;
  faqQ1: string;
  faqA1: string;
  faqQ2: string;
  faqA2: string;
  faqQ3: string;
  faqA3: string;
  faqQ4: string;
  faqA4: string;
  faqQ5: string;
  faqA5: string;
  faqQ6: string;
  faqA6: string;
  faqQ7: string;
  faqA7: string;
  faqQ8: string;
  faqA8: string;

  seoAlphabetEyebrow: string;
  seoAlphabetTitle: string;
  seoAlphabetDesc: string;
  seoThCyr: string;
  seoThLat: string;
  seoThExCyr: string;
  seoThExLat: string;
  seoRulesEyebrow: string;
  seoRulesTitle: string;
  seoHistoryEyebrow: string;
  seoHistoryTitle: string;
  
  modalDonateTitle: string;
  modalDonateDesc: string;
  modalDonateCopy: string;
  modalDonateCopied: string;
  modalDonateCopiedToast: string;
  modalDonateHolder: string;
  modalContactTitle: string;
  modalContactDesc: string;
  modalContactLink: string;
  modalContactItServices: string;
  modalContactItDesc: string;
  modalContactSuggest: string;
  modalContactSuggestDesc: string;
  modalClose: string;

  toastNoTextToCopy: string;
  toastCopied: string;
  toastCopyError: string;
  toastNoTextToDownload: string;
  toastCleared: string;
  toastUndo: string;
  toastFileLoaded: string;
  toastFileLoadError: string;
}

export const translations: Record<Locale, TranslationDict> = {
  "uz-cyr": {
    metaTitle: "Kiril Lotin Konvertor — Kirildan Lotinga yoki Lotindan Kirilga o'tkazish onlayn | Кирил Лотин",
    metaDesc: "Kiril lotin konvertor — kirildan lotinga yoki lotindan kirilga bepul, tez va aniq o'tkazish. Matn yoki .txt, .docx faylini yuklang — natijani darhol oling. Кирил Лотин конвертор, transliteratsiya, ўгириш.",
    logoSub: "kirillotin.uz",
    navAbout: "Сайт ҳақида",
    navFeatures: "Имкониятлар",
    navFaq: "Саволлар",
    navBlog: "Блог",
    navContact: "Боғланиш",
    navDonate: "💛 Донат",
    contactTooltip: "IT хизматлари учун боғланинг",
    themeToggleDark: "Тунги режимга ўтиш",
    themeToggleLight: "Кун режимига ўтиш",
    uploaderDropzone: "Файл юклаш ёки бу ерга ташланг (.txt, .docx · макс 5MB)",
    uploaderProcessing: "Юкланмоқда...",
    uploaderConverting: "Конвертация қилинмоқда",
    uploaderReady: "Тайёр",
    uploaderDownload: "Юклаб олиш",
    uploaderRemove: "Файлни олиб ташлаш",
    uploaderErrFormat: ".txt ёки .docx файлини юкланг",
    uploaderErrSize: "Файл ҳажми 5MB дан кам бўлиши керак",
    uploaderErrEmpty: "Файл бўш ёки ўқиб бўлмади",
    uploaderErrUnknown: "Номаълум файл тури",
    uploaderErrRead: "Файлни ўқишда хатолик юз берди",
    panelInputHeader: "Матн киритинг",
    panelInputClear: "Тозалаш",
    panelInputPlaceholder: "Бу ерга лотин ёки кирилл ёзувига ўгириш керак бўлган матнни киритинг...",
    panelOutputHeader: "Натижа",
    panelOutputCopy: "Нусхалаш",
    panelOutputCopied: "Нусхаланди",
    panelOutputDownload: "Юклаб олиш",
    panelOutputPlaceholder: "Бу ерда натижа чиқади...",
    panelCharCount: "белги",
    aboutEyebrow: "Сайт ҳақида",
    aboutTitle: "Kiril ↔ Lotin Konvertor",
    aboutDesc1: "O'zbek tilidagi matnlarni Kiril alifbosidan Lotin alifbosiga va teskari, Lotindan Kirilga bir zumda o'girish uchun bepul onlayn vosita. Sayt matn, .txt va .docx fayllarni qo'llab-quvvatlaydi. Docx formatlash to'liq saqlanib qoladi. Barcha amallar faqat sizning brauzeringizda amalga оширилади, матн серверга юборилмайди.",
    aboutDesc2: "",
    featuresTitle: "Имкониятлар",
    featuresPrivacyEyebrow: "Maxfiylik",
    featuresPrivacyTitle: "Матнингиз serverga yuborilmaydi",
    featuresPrivacyDesc: "Barcha konvertatsiya jarayoni sizning brauzeringizda amalga oshiriladi. Biz ham, boshqa hech kim ham yozganingizni ko'rmaydi. Bir marta ochilgandan keyin sayt internetsiz ham ishlayveradi.",
    featuresWordEyebrow: "Hujjatlar",
    featuresWordTitle: "Word (.docx) fayllarni formatlash bilan ўгириш",
    featuresWordDesc: "Махсус MS Word (.docx) файлини юкланг. Конвертор ичидаги барча ранглар, жадваллар ва форматлаш элементларини сақлаб қолган ҳолда матнни ўгириб беради.",
    featuresFootnote: "Бепул. Рўйхатдан ўтиш йўқ. Реклама йўқ.",
    faqEyebrow: "FAQ",
    faqTitle: "Кўп бериладиган саволлар",
    faqQ1: "Кирилл-лотин ўгиргич бепулми?",
    faqA1: "Ҳа, сайтимиздан фойдаланиш мутлақо бепул. Ҳеч қандай чекловларсиз матн ёки Word ҳужжатларини ўгиришингиз мумкин. Агар лойиҳамиз сизга фойдали бўлган бўлса, «Донат» тугмаси орқали қўллаб-қувватлашингиз мумкин.",
    faqQ2: "Матнларим хавфсизликда қоладими?",
    faqA2: "Тўлиқ хавфсизлик кафолатланади. Ҳеч қандай маълумот ташқи серверларга юборилмайди. Конвертация тўлиқ сизнинг браузерингиз (JS коди) ичида бажарилади. Истасангиз, интернетни ўчириб ҳам текшириб кўришингиз мумкин.",
    faqQ3: "Word (.docx) файлларидаги жадвал ва расмлар нима бўлади?",
    faqA3: "Конвертор .docx файли ичидаги барча жадваллар, матн ранглари, қалин ёки қия (bold/italic) ёзувларни ўз ҳолича сақлайди. Уларни янги алифбога ўтказиб, файл тузилишига zarar yetkazmaydi.",
    faqQ4: "Юмшоқлик белгиси ва махсус ҳарфлар тўғри ўгириладими?",
    faqA4: "Ҳа. Бизнинг алгоритм ўзбек тили имло қоидаларига мослаштирилган. Масалан, «яъни» сўзи «ya'ni» бўлиб, «эълон» сўзи «e'lon» бўлиб, «Ш» ҳарфи «Sh» шаклида, бош ҳарф ва кичик ҳарфлар мослиги сақланган ҳолда ўгирилади.",
    faqQ5: "Қандай файлларни юклаш мумкин?",
    faqA5: ".txt ва .docx форматидаги файллар, максимум 5 MB ҳажмда.",
    faqQ6: "Йўналишни сайт ўзи аниқлайдими?",
    faqA6: "Ҳа. Матн киритганингизда сайт унинг кирилда ёки лотинда эканлигини аниқлаб, тегишли йўналишни танлайди. Қўлда алмаштириш ҳам мумкин.",
    faqQ7: "Мобил телефонида ишлайдими?",
    faqA7: "Ҳа, сайт Android, iPhone ва планшетлар учун тўлиқ мослаштирилган. Алоҳида илова ўрнатиш шарт эмас.",
    faqQ8: "Бирор сўз нотўғри ўгирилса нима қилиш керак?",
    faqA8: "Телеграм орқали дастурчи билан боғланинг (@Shohruz_Isroilov). Муаммо тезда тузатилади.",
    seoAlphabetEyebrow: "Алифбо",
    seoAlphabetTitle: "Кирил ва Лотин ҳарфлари жадвали",
    seoAlphabetDesc: "Ўзбек тилидаги барча кирил ҳарфларининг лотинча эквиваленти ва мисоллар билан тўлиқ жадвал.",
    seoThCyr: "Кирил",
    seoThLat: "Лотин",
    seoThExCyr: "Мисол (Кирил)",
    seoThExLat: "Мисол (Лотин)",
    seoRulesEyebrow: "Қоидалар",
    seoRulesTitle: "Кирил ва Лотин ёзув қоидалари",
    seoHistoryEyebrow: "Тарих",
    seoHistoryTitle: "Ўзбек ёзуви ҳақида",
    modalDonateTitle: "Лойиҳани қўллаб-қувватланг",
    modalDonateDesc: "Агар ушбу конвертор сизнинг ишингизни осонлаштирган бўлса, лойиҳани ихтиёрий донат орқали қўллаб-қувватлашингиз мумкин. Йиғилган маблағлар сервер харажатлари ва янги функциялар қўшишга сарфланади.",
    modalDonateCopy: "Нусхалаш",
    modalDonateCopied: "Нусхаланди!",
    modalDonateCopiedToast: "Карта рақами нусхаланди",
    modalDonateHolder: "Shohruz Isroilov · Humo karta",
    modalContactTitle: "Боғланиш",
    modalContactDesc: "Агар сизда сайт бўйича таклифлар бўлса ёки веб-сайтлар ва мобил иловалар ишлаб чиқиш бўйича ҳамкорлик қилмоқчи бўлсангиз, мен билан боғланишингиз мумкин:",
    modalContactLink: "Телеграм орқали ёзиш",
    modalContactItServices: "IT хизматлари",
    modalContactItDesc: "Веб-сайт, мобил илова, дастур ёки бошқа IT лойиҳа буюртмаси учун",
    modalContactSuggest: "Муаммо ёки таклиф",
    modalContactSuggestDesc: "Сайтда хато топдингизми ёки яхшилаш учун таклифингиз борми?",
    modalClose: "Ёпиш",
    toastNoTextToCopy: "Нусхалаш учун матн йўқ",
    toastCopied: "Нусха олинди",
    toastCopyError: "Кўчиришда хато",
    toastNoTextToDownload: "Юклаб олиш учун матн йўқ",
    toastCleared: "Тозаланди",
    toastUndo: "Бекор қилиш",
    toastFileLoaded: '"{name}" юкланди',
    toastFileLoadError: "Файлни юклашда хато",
  },
  "uz-lat": {
    metaTitle: "Kiril Lotin Konvertor — Kirildan Lotinga yoki Lotindan Kirilga o'tkazish onlayn | Kiril Lotin",
    metaDesc: "Kiril lotin konvertor — kirildan lotinga yoki lotindan kirilga bepul, tez va aniq o'tkazish. Matn yoki .txt, .docx faylini yuklang — natijani darhol oling. Kiril Lotin konvertor, transliteratsiya, o'tkazish.",
    logoSub: "kirillotin.uz",
    navAbout: "Sayt haqida",
    navFeatures: "Imkoniyatlar",
    navFaq: "Savollar",
    navBlog: "Blog",
    navContact: "Bog'lanish",
    navDonate: "💛 Donat",
    contactTooltip: "IT xizmatlari uchun bog'laning",
    themeToggleDark: "Tungi rejimga o'tish",
    themeToggleLight: "Kun rejimiga o'tish",
    uploaderDropzone: "Fayl yuklash yoki bu yerga tashlang (.txt, .docx · maks 5MB)",
    uploaderProcessing: "Yuklanmoqda...",
    uploaderConverting: "Konvertatsiya qilinmoqda",
    uploaderReady: "Tayyor",
    uploaderDownload: "Yuklab olish",
    uploaderRemove: "Faylni olib tashlash",
    uploaderErrFormat: ".txt yoki .docx faylini yuklang",
    uploaderErrSize: "Fayl hajmi 5MB dan kam bo'lishi kerak",
    uploaderErrEmpty: "Fayl bo'sh o'qib bo'lmadi",
    uploaderErrUnknown: "Noma'lum file turi",
    uploaderErrRead: "Faylni o'qishda xatolik yuz berdi",
    panelInputHeader: "Matn kiriting",
    panelInputClear: "Tozalash",
    panelInputPlaceholder: "Bu yerga lotin yoki kirill yozuviga o'girish kerak bo'lgan matnni kiriting...",
    panelOutputHeader: "Natija",
    panelOutputCopy: "Nusxalash",
    panelOutputCopied: "Nusxalandi",
    panelOutputDownload: "Yuklab olish",
    panelOutputPlaceholder: "Bu yerda natija chiqadi...",
    panelCharCount: "belgi",
    aboutEyebrow: "Sayt haqida",
    aboutTitle: "Kiril ↔ Lotin Konvertor",
    aboutDesc1: "O'zbek tilidagi matnlarni Kiril alifbosidan Lotin alifbosiga va teskari, Lotindan Kirilga bir zumda o'giriish uchun bepul onlayn vosita. Sayt matn, .txt va .docx fayllarni qo'llab-quvvatlaydi. Docx formatlash to'liq saqlanib qoladi. Barcha amallar faqat sizning brauzeringizda amalga oshiriladi, matn serverga yuborilmaydi.",
    aboutDesc2: "",
    featuresTitle: "Imkoniyatlar",
    featuresPrivacyEyebrow: "Maxfiylik",
    featuresPrivacyTitle: "Matningiz serverga yuborilmaydi",
    featuresPrivacyDesc: "Barcha konvertatsiya jarayoni sizning brauzeringizda amalga oshiriladi. Biz ham, bosha hech kim ham yozganingizni ko'rmaydi. Bir marta ochilgandan keyin sayt internetsiz ham ishlayveradi.",
    featuresWordEyebrow: "Hujjatlar",
    featuresWordTitle: "Word (.docx) fayllarni formatlash bilan o'girish",
    featuresWordDesc: "Maxsus MS Word (.docx) faylini yuklang. Konvertor ichidagi barcha ranglar, jadvallar va formatlash elementlarini saqlab qolgan holda matnni o'girib beradi.",
    featuresFootnote: "Bepul. Ro'yxatdan o'tish yo'q. Reklama yo'q.",
    faqEyebrow: "FAQ",
    faqTitle: "Ko'p beriladigan savollar",
    faqQ1: "Kirill-lotin o'girgich bepulmi?",
    faqA1: "Ha, saytimizdan foydalanish mutlaqo bepul. Hech qanday cheklovlarsiz matn yoki Word hujjatlarini o'girishingiz mumkin. Agar loyihamiz sizga foydali bo'lgan bo'lsa, «Donat» tugmasi orqali qo'llab-kuvvatlashingiz mumkin.",
    faqQ2: "Matnlarim xavfsizlikda qoladimi?",
    faqA2: "To'liq xavfsizlik kafolatlanadi. Hech qanday ma'lumot tashqi serverlarga yuborilmaydi. Konvertatsiya to'liq sizning brauzeringiz (JS kodi) ichida bajariladi. Istasangiz, internetni o'chirib ham tekshirib ko'rishingiz mumkin.",
    faqQ3: "Word (.docx) fayllaridagi jadval va rasmlar nima bo'ladi?",
    faqA3: "Konvertor .docx fayli ichidagi barcha jadvallar, matn ranglari, qalin yoki qiya (bold/italic) yozuvlarni o'z holicha saqlaydi. Ularni yozuv tuzilishiga zarar yetkazmasdan yangi alifboga o'tkazadi.",
    faqQ4: "Yumshoqlik belgisi va maxsus harflar to'g'ri o'giriladimi?",
    faqA4: "Ha. Bizning algoritm o'zbek tili imlo qoidalariga moslashtirilgan. Masalan, «ya'ni» so'zi «ya'ni» bo'lib, «e'lon» so'zi «e'lon» bo'lib, «Sh» harfi «Sh» shaklida, bosh harf va kichik harflar mosligi saqlangan holda o'giriladi.",
    faqQ5: "Qanday fayllarni yuklash mumkin?",
    faqA5: ".txt va .docx formatidagi fayllar, maksimum 5 MB hajmda.",
    faqQ6: "Yo'nalishni sayt o'zi aniqlaydimi?",
    faqA6: "Ha. Matn kiritganingizda sayt uning kirilda yoki lotinda ekanligini aniqlab, tegishli yo'nalishni tanlaydi. Qo'lda almashtirish ham mumkin.",
    faqQ7: "Mobil telefonida ishlaydi?",
    faqA7: "Ha, sayt Android, iPhone va planshetlar uchun to'liq moslashtirilgan. Alohida ilova o'rnatish shart emas.",
    faqQ8: "Biror so'z noto'g'ri o'girilsa nima qilish kerak?",
    faqA8: "Telegram orqali dasturchi bilan bog'laning (@Shohruz_Isroilov). Muammo tezda tuzatiladi.",
    seoAlphabetEyebrow: "Alifbo",
    seoAlphabetTitle: "Kiril va Lotin harflari jadvali",
    seoAlphabetDesc: "O'zbek tilidagi barcha kiril harflarining lotincha ekvivalenti va misollar bilan to'liq jadval.",
    seoThCyr: "Kiril",
    seoThLat: "Lotin",
    seoThExCyr: "Misol (Kiril)",
    seoThExLat: "Misol (Lotin)",
    seoRulesEyebrow: "Qoidalar",
    seoRulesTitle: "Kiril va Lotin yozuv qoidalari",
    seoHistoryEyebrow: "Tarix",
    seoHistoryTitle: "O'zbek yozuvi haqida",
    modalDonateTitle: "Loyihani qo'llab-quvvatlash",
    modalDonateDesc: "Agar ushbu konvertor sizning ishingizni osonlashtirgan bo'lsa, loyihani ixtiyoriy donat orqali qo'llab-quvvatlashingiz mumkin. Yig'ilgan mablag'lar server xarajatlari va yeni funksiyalar qo'shishga sarflanadi.",
    modalDonateCopy: "Nusxa olish",
    modalDonateCopied: "Nusxalandi!",
    modalDonateCopiedToast: "Karta raqami nusxalandi",
    modalDonateHolder: "Shohruz Isroilov · Humo karta",
    modalContactTitle: "Bog'lanish",
    modalContactDesc: "Agar sizda sayt bo'yicha takliflar bo'lsa yoki veb-saytlar va mobil ilovalar ishlab chiqish bo'yicha hamkorlik qilmoqchi bo'lsangiz, men bilan bog'lanishingiz mumkin:",
    modalContactLink: "Telegram orqali yozish",
    modalContactItServices: "IT xizmatlari",
    modalContactItDesc: "Veb-sayt, mobil ilova, dastur yoki boshqa IT loyiha buyurtmasi uchun",
    modalContactSuggest: "Muammo yoki taklif",
    modalContactSuggestDesc: "Saytda xato topdingizmi yoki yaxshilash uchun taklifingiz bormi?",
    modalClose: "Yopish",
    toastNoTextToCopy: "Nusxalash uchun matn yo'q",
    toastCopied: "Nusxa olindi",
    toastCopyError: "Ko'chirishda xato",
    toastNoTextToDownload: "Yuklab olish uchun matn yo'q",
    toastCleared: "Tozalandi",
    toastUndo: "Bekor qilish",
    toastFileLoaded: '"{name}" yuklandi',
    toastFileLoadError: "Faylni yuklashda xato",
  },
  "ru": {
    metaTitle: "Конвертер Кириллица Латиница — Онлайн перевод с кириллицы на латиницу и наоборот",
    metaDesc: "Кириллица латиница конвертер — бесплатный, быстрый и точный онлайн-перевод текста с кириллицы на латиницу и наоборот. Загрузите файл .txt или .docx и мгновенно получите результат. Транслитерация узбекского языка.",
    logoSub: "kirillotin.uz",
    navAbout: "О сайте",
    navFeatures: "Возможности",
    navFaq: "Вопросы",
    navBlog: "Блог",
    navContact: "Контакты",
    navDonate: "💛 Донат",
    contactTooltip: "Свяжитесь со мной для IT-услуг",
    themeToggleDark: "Перейти на темную тему",
    themeToggleLight: "Перейти на светлую тему",
    uploaderDropzone: "Загрузите файл или перетащите сюда (.txt, .docx · макс 5MB)",
    uploaderProcessing: "Загрузка...",
    uploaderConverting: "Конвертация...",
    uploaderReady: "Готово",
    uploaderDownload: "Скачать",
    uploaderRemove: "Удалить файл",
    uploaderErrFormat: "Загрузите файл .txt или .docx",
    uploaderErrSize: "Размер файла должен быть менее 5MB",
    uploaderErrEmpty: "Файл пуст или не читается",
    uploaderErrUnknown: "Неизвестный тип файла",
    uploaderErrRead: "Ошибка при чтении файла",
    panelInputHeader: "Введите текст",
    panelInputClear: "Очистить",
    panelInputPlaceholder: "Введите текст на кириллице или латинице...",
    panelOutputHeader: "Результат",
    panelOutputCopy: "Копировать",
    panelOutputCopied: "Скопировано",
    panelOutputDownload: "Скачать",
    panelOutputPlaceholder: "Результат конвертации...",
    panelCharCount: "символов",
    aboutEyebrow: "О сайте",
    aboutTitle: "Конвертер Кириллица ↔ Латиница",
    aboutDesc1: "Бесплатный онлайн-инструмент для мгновенного перевода узбекского текста с кириллицы на латиницу и обратно с латиницы на кириллицу. Сайт поддерживает текст, файлы .txt и .docx. Форматирование документа Docx полностью сохраняется. Все операции выполняются исключительно в вашем браузере, текст не отправляется на сервер.",
    aboutDesc2: "",
    featuresTitle: "Возможности",
    featuresPrivacyEyebrow: "Конфиденциальность",
    featuresPrivacyTitle: "Ваш текст не отправляется на сервер",
    featuresPrivacyDesc: "Весь процесс конвертации происходит в вашем браузере. Ни мы, ни кто-либо другой не увидит то, что вы пишете. После первой загрузки сайт работает даже без интернета.",
    featuresWordEyebrow: "Документы",
    featuresWordTitle: "Конвертация Word (.docx) с сохранением форматирования",
    featuresWordDesc: "Загрузите файл MS Word (.docx). Конвертер переведет текст, сохранив все цвета, таблицы и элементы форматирования внутри файла.",
    featuresFootnote: "Бесплатно. Без регистрации. Без рекламы.",
    faqEyebrow: "FAQ",
    faqTitle: "Часто задаваемые вопросы",
    faqQ1: "Конвертер кириллицы и латиницы бесплатный?",
    faqA1: "Да, использование нашего сайта абсолютно бесплатно. Вы можете без ограничений конвертировать текст или документы Word. Если наш проект оказался вам полезен, вы можете поддержать нас через кнопку «Донат».",
    faqQ2: "Мои тексты остаются в безопасности?",
    faqA2: "Полная безопасность гарантирована. Никакие данные не отправляются на внешние серверы. Конвертация выполняется полностью внутри вашего браузера (код JS). При желании вы можете проверить это, отключив интернет.",
    faqQ3: "Что произойдет с таблицами и изображениями в файлах Word (.docx)?",
    faqA3: "Конвертер сохраняет все таблицы, цвета текста, жирный или курсивный шрифт в файле .docx. Он переводит их на новый алфавит, не нарушая структуру файла.",
    faqQ4: "Правильно ли переводятся специальные буквы и знаки?",
    faqA4: "Да. Наш алгоритм адаптирован к правилам орфографии узбекского языка. Специальные буквы (Ў, Ғ, Қ, Ҳ, Ш, Ч), мягкие и твердые знаки, а также сложные случаи с буквами Е, Ё, Ю, Я переводятся в строгом соответствии с правилами.",
    faqQ5: "Какие файлы можно загружать?",
    faqA5: "Файлы в формате .txt и .docx, максимальным размером до 5 МБ.",
    faqQ6: "Определяет ли сайт направление автоматически?",
    faqA6: "Да. При вводе текста сайт автоматически определяет, написан ли он на кириллице или латинице, и выбирает соответствующее направление. Также можно переключить вручную.",
    faqQ7: "Работает ли сайт на мобильных телефонах?",
    faqA7: "Да, сайт полностью оптимизирован для мобильных устройств на Android, iPhone и планшетов. Установка отдельного приложения не требуется.",
    faqQ8: "Что делать, если слово переведено неправильно?",
    faqA8: "Свяжитесь с разработчиком в Telegram (@Shohruz_Isroilov). Проблема будет оперативно устранена.",
    seoAlphabetEyebrow: "Алфавит",
    seoAlphabetTitle: "Таблица букв Кириллицы и Латиницы",
    seoAlphabetDesc: "Полная таблица соответствия всех букв кириллицы узбекского языка их латинским эквивалентам с примерами.",
    seoThCyr: "Кириллица",
    seoThLat: "Латиница",
    seoThExCyr: "Пример (Кир.)",
    seoThExLat: "Пример (Лат.)",
    seoRulesEyebrow: "Правила",
    seoRulesTitle: "Правила написания Кириллицы и Латиницы",
    seoHistoryEyebrow: "История",
    seoHistoryTitle: "Об узбекской письменности",
    modalDonateTitle: "Поддержка проекта",
    modalDonateDesc: "Если этот конвертер облегчил вашу работу, вы можете поддержать проект добровольным пожертвованием. Собранные средства идут на покрытие расходов на сервер и добавление новых функций.",
    modalDonateCopy: "Копировать",
    modalDonateCopied: "Скопировано!",
    modalDonateCopiedToast: "Номер карты скопирован",
    modalDonateHolder: "Шохруз Ислоилов · Карта Humo",
    modalContactTitle: "Контакты",
    modalContactDesc: "Если у вас есть предложения по улучшению сайта или вы хотите сотрудничать по разработке веб-сайтов и мобильных приложений, вы можете связаться со мной:",
    modalContactLink: "Написать в Telegram",
    modalContactItServices: "IT-услуги",
    modalContactItDesc: "Для заказа веб-сайта, мобильного приложения, программы или других IT-проектов",
    modalContactSuggest: "Проблема или предложение",
    modalContactSuggestDesc: "Нашли ошибку на сайте или есть предложение по улучшению?",
    modalClose: "Закрыть",
    toastNoTextToCopy: "Нет текста для копирования",
    toastCopied: "Скопировано",
    toastCopyError: "Ошибка при копировании",
    toastNoTextToDownload: "Нет текста для скачивания",
    toastCleared: "Очищено",
    toastUndo: "Отменить",
    toastFileLoaded: '"{name}" загружен',
    toastFileLoadError: "Ошибка при загрузке файла",
  },
  "en": {
    metaTitle: "Cyrillic to Latin Converter — Online Uzbek transliteration tool",
    metaDesc: "Cyrillic Latin converter — free, fast, and accurate online translation of text from Cyrillic to Latin and vice versa. Upload a .txt or .docx file and get the result instantly. Transliteration for Uzbek.",
    logoSub: "kirillotin.uz",
    navAbout: "About",
    navFeatures: "Features",
    navFaq: "FAQ",
    navBlog: "Blog",
    navContact: "Contact",
    navDonate: "💛 Donate",
    contactTooltip: "Contact me for IT services",
    themeToggleDark: "Switch to dark theme",
    themeToggleLight: "Switch to light theme",
    uploaderDropzone: "Upload file or drag here (.txt, .docx · max 5MB)",
    uploaderProcessing: "Uploading...",
    uploaderConverting: "Converting...",
    uploaderReady: "Ready",
    uploaderDownload: "Download",
    uploaderRemove: "Remove file",
    uploaderErrFormat: "Upload a .txt or .docx file",
    uploaderErrSize: "File size must be under 5MB",
    uploaderErrEmpty: "File is empty or unreadable",
    uploaderErrUnknown: "Unknown file type",
    uploaderErrRead: "Error reading file",
    panelInputHeader: "Enter text",
    panelInputClear: "Clear",
    panelInputPlaceholder: "Enter Cyrillic or Latin text...",
    panelOutputHeader: "Result",
    panelOutputCopy: "Copy",
    panelOutputCopied: "Copied",
    panelOutputDownload: "Download",
    panelOutputPlaceholder: "Conversion result...",
    panelCharCount: "characters",
    aboutEyebrow: "About",
    aboutTitle: "Cyrillic ↔ Latin Converter",
    aboutDesc1: "A free online tool for instant translation of Uzbek texts from Cyrillic alphabet to Latin alphabet and vice versa. The site supports raw text, .txt, and .docx files. MS Word (.docx) formatting is fully preserved. All operations are performed strictly in your browser, and your text is never sent to any server.",
    aboutDesc2: "",
    featuresTitle: "Features",
    featuresPrivacyEyebrow: "Privacy",
    featuresPrivacyTitle: "Your text is never sent to the server",
    featuresPrivacyDesc: "The entire conversion process takes place in your browser. Neither we nor anyone else will see what you write. Once loaded, the site works completely offline.",
    featuresWordEyebrow: "Documents",
    featuresWordTitle: "Transliterate Word (.docx) keeping formatting",
    featuresWordDesc: "Upload MS Word (.docx) files directly. The converter processes the text while preserving all colors, tables, and formatting styles.",
    featuresFootnote: "Free. No registration. No ads.",
    faqEyebrow: "FAQ",
    faqTitle: "Frequently Asked Questions",
    faqQ1: "Is the Cyrillic-Latin converter free?",
    faqA1: "Yes, our website is completely free to use. You can convert text or Word documents without any limit. If our project was useful to you, you can support us via the «Donate» button.",
    faqQ2: "Are my texts kept secure?",
    faqA2: "Full security is guaranteed. No data is sent to external servers. The conversion is performed entirely inside your browser (via JavaScript). You can verify this by turning off your internet connection.",
    faqQ3: "What happens to tables and images in Word (.docx) files?",
    faqA3: "The converter preserves all tables, text colors, bold, or italic styles in the .docx file. It converts the text to the new alphabet without damaging the document structure.",
    faqQ4: "Are special characters and soft/hard signs converted correctly?",
    faqA4: "Yes. Our algorithm is tailored specifically to the grammar and spelling rules of the Uzbek language. Special characters (Ў, Ғ, Қ, Ҳ, Ш, Ч) and complex cases involving E, Yo, Yu, Ya are fully supported.",
    faqQ5: "What files can be uploaded?",
    faqA5: "Files in .txt and .docx format, up to a maximum size of 5 MB.",
    faqQ6: "Does the site detect translation direction automatically?",
    faqA6: "Yes. Once you type, the site detects whether the text is in Cyrillic or Latin and sets the direction. You can also switch manually.",
    faqQ7: "Does it work on mobile phones?",
    faqA7: "Yes, the site is fully optimized for mobile devices on Android, iPhone, and tablets. No app installation is required.",
    faqQ8: "What should I do if a word is translated incorrectly?",
    faqA8: "Contact the developer via Telegram (@Shohruz_Isroilov). The issue will be resolved quickly.",
    seoAlphabetEyebrow: "Alphabet",
    seoAlphabetTitle: "Cyrillic and Latin Alphabet Table",
    seoAlphabetDesc: "Full mapping table of Uzbek Cyrillic letters to their Latin equivalents with examples.",
    seoThCyr: "Cyrillic",
    seoThLat: "Latin",
    seoThExCyr: "Example (Cyr.)",
    seoThExLat: "Example (Lat.)",
    seoRulesEyebrow: "Rules",
    seoRulesTitle: "Cyrillic and Latin Spelling Rules",
    seoHistoryEyebrow: "History",
    seoHistoryTitle: "About Uzbek Writing",
    modalDonateTitle: "Support the Project",
    modalDonateDesc: "If this converter has made your work easier, you can support the project with a voluntary donation. The collected funds will go toward covering server costs and adding new features.",
    modalDonateCopy: "Copy",
    modalDonateCopied: "Copied!",
    modalDonateCopiedToast: "Card number copied",
    modalDonateHolder: "Shohruz Isroilov · Humo card",
    modalContactTitle: "Contact",
    modalContactDesc: "If you have suggestions for the site or wish to cooperate on web/mobile development, feel free to contact me:",
    modalContactLink: "Message on Telegram",
    modalContactItServices: "IT Services",
    modalContactItDesc: "To order a website, mobile application, software, or other IT projects",
    modalContactSuggest: "Issue or suggestion",
    modalContactSuggestDesc: "Found a bug on the site or have a suggestion to improve it?",
    modalClose: "Close",
    toastNoTextToCopy: "No text to copy",
    toastCopied: "Copied",
    toastCopyError: "Error copying text",
    toastNoTextToDownload: "No text to download",
    toastCleared: "Cleared",
    toastUndo: "Undo",
    toastFileLoaded: '"{name}" loaded',
    toastFileLoadError: "Error loading file",
  },
};
