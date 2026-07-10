"use client";

import { useLanguage } from "@/components/LanguageContext";
import { Locale } from "@/lib/translations";

export function SeoContent() {
  const { locale, t } = useLanguage();

  const rules = LOCALIZED_RULES[locale] || LOCALIZED_RULES["uz-cyr"];

  return (
    <div className="space-y-16">
      {/* Harflar jadvali */}
      <section id="harflar" className="space-y-6 scroll-mt-20">
        <div className="text-center space-y-2">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
            {t("seoAlphabetEyebrow")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("seoAlphabetTitle")}
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            {t("seoAlphabetDesc")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-800">
          <table className="w-full text-base">
            <thead className="bg-gray-100 dark:bg-gray-800/80 border-b border-gray-300 dark:border-gray-700">
              <tr className="text-left text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300">
                <th className="px-4 py-3.5 font-bold">{t("seoThCyr")}</th>
                <th className="px-4 py-3.5 font-bold">{t("seoThLat")}</th>
                <th className="px-4 py-3.5 font-bold">{t("seoThExCyr")}</th>
                <th className="px-4 py-3.5 font-bold">{t("seoThExLat")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-850">
              {LETTER_TABLE.map((row) => (
                <tr key={row.cyr} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40">
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{row.cyr}</td>
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{row.lat}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{row.exCyr}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{row.exLat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Qoidalar */}
      <section id="qoidalar" className="space-y-6 scroll-mt-20">
        <div className="text-center space-y-2">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
            {t("seoRulesEyebrow")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("seoRulesTitle")}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {rules.map((rule) => (
            <article
              key={rule.title}
              className="p-5 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-800/40"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                {rule.title}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                {rule.text}
              </p>
              {rule.examples && (
                <div className="flex flex-wrap gap-2">
                  {rule.examples.map((ex) => (
                    <span
                      key={ex}
                      className="inline-block px-3 py-1 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm font-mono font-semibold text-gray-800 dark:text-gray-200"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Haqida / Tarix */}
      <section id="haqida" className="space-y-6 scroll-mt-20">
        <div className="text-center space-y-2">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
            {t("seoHistoryEyebrow")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {t("seoHistoryTitle")}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto prose prose-base sm:prose-lg dark:prose-invert prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-loose prose-strong:text-gray-950 dark:prose-strong:text-gray-50">
          {locale === "uz-cyr" && (
            <>
              <p>
                Ўзбек тили <strong>XX асрда</strong> бир неча марта алифбосини алмаштирган.
                1929 йилгача араб ёзуви, 1929–1940 йилларда лотин ёзуви, 1940 йилдан бошлаб
                эса кирил ёзуви расмий алифбо сифатида қўлланилган. 1993 йилда Ўзбекистон
                мустақилликка эришгач, янгидан лотин ёзувига ўтиш бошланди.
              </p>
              <p>
                Бугунги кунда Ўзбекистонда <strong>иккала ёзув ҳам</strong> кенг қўлланилади.
                Расмий ҳужжатлар, мактаб дарсликлари ва давлат сайтлари лотин ёзувида,
                аммо кўпгина китоблар, газеталар, ёшларнинг катта қисми ҳамон кирил
                ёзувида ёзишни афзал кўради. Ушбу қарама-қаршилик икки ёзув ўртасида
                тез ва аниқ <strong>конвертация қилиш</strong> эҳтиёжини туғдиради.
              </p>
              <p>
                <strong>Kirillotin.uz</strong> ушбу муаммони ҳал қилиш учун яратилган.
                Сайтимиз орқали ўзбек тилидаги ҳар қандай матн ёки <code>.txt</code>,{" "}
                <code>.docx</code> файлни кирилdan лотинга ёки аксинча, лотиндан кирилга
                бир неча сонияда ўгириб олиш мумкин. Ўгириш жараёни{" "}
                <strong>тўлиқ браузерингизда</strong> амалга оширилади — матн серверга
                юборилмайди ва махфийлик сақланади.
              </p>
              <p>
                Конвертация алгоритми ҳозирги расмий ўзбек лотин алифбоси (2019 йил
                ўзгартиришлари билан) асосида ишлайди. Махсус ҳарфлар (Ў, Ғ, Қ, Ҳ, Ш, Ч),
                юмшоқ ва қаттиқ белгилар, ҳамда сўз бошидаги ва ўртасидаги{" "}
                <strong>Е, Ё, Ю, Я</strong> каби нозик ҳолатлар инобатга олинган.
              </p>
            </>
          )}

          {locale === "uz-lat" && (
            <>
              <p>
                O'zbek tili <strong>XX asrda</strong> bir necha marta alifbosini almashtirgan.
                1929-yilgacha arab yozuvi, 1929–1940-yillarda lotin yozuvi, 1940-yildan boshlab
                esa kiril yozuvi rasmiy alifbo sifatida qo'llanilgan. 1993-yilda O'zbekiston
                mustaqillikka erishgach, yangidan lotin yozuviga o'tish boshlandi.
              </p>
              <p>
                Bugungi kunda O'zbekistonda <strong>ikkala yozuv ham</strong> keng qo'llaniladi.
                Rasmiy hujjatlar, maktab darsliklari va davlat saytlari lotin yozuvida,
                ammo ko'pgina kitoblar, gazetalar, yoshlarning katta qismi hamon kiril
                yozuvida yozishni afzal ko'radi. Ushbu qarama-qarshilik ikki yozuv o'rtasida
                tez va aniq <strong>konvertatsiya qilish</strong> ehtiyojini tug'diradi.
              </p>
              <p>
                <strong>Kirillotin.uz</strong> ushbu muammoni hal qilish uchun yaratilgan.
                Saytimiz orqali o'zbek tilidagi har qanday matn yoki <code>.txt</code>,{" "}
                <code>.docx</code> faylni kirildan lotinga yoki aksincha, lotindan kirilga
                bir necha soniyada o'girib olish mumkin. O'girish jarayoni{" "}
                <strong>to'liq brauzeringizda</strong> amalga oshiriladi — matn serverga
                yuborilmaydi va maxfiylik saqlanadi.
              </p>
              <p>
                Konvertatsiya algoritmi hozirgi rasmiy o'zbek lotin alifbosi (2019-yil
                o'zgartirishlari bilan) asosida ishlaydi. Maxsus harflar (O', G', Q, H, Sh, Ch),
                yumshoq va qattiq belgilar, hamda so'z boshidagi va o'rtasidagi{" "}
                <strong>E, Yo, Yu, Ya</strong> kabi nozik holatlar inobatga olingan.
              </p>
            </>
          )}

          {locale === "ru" && (
            <>
              <p>
                Узбекский язык в <strong>XX веке</strong> несколько раз менял свой алфавит.
                До 1929 года использовалась арабская письменность, в 1929–1940 годах — латиница, а с 1940 года
                официальным алфавитом стала кириллица. После обретения Узбекистаном независимости в 1993 году
                начался постепенный переход обратно на латинскую графику.
              </p>
              <p>
                Сегодня в Узбекистане <strong>активно используются оба алфавита</strong>.
                Официальные документы, школьные учебники и государственные сайты публикуются на латинице,
                но художественная литература, газеты и старшее поколение часто предпочитают кириллицу. Это разделение
                создает постоянную потребность в быстром и точном <strong>переводе текстов</strong> между двумя системами.
              </p>
              <p>
                Сайт <strong>Kirillotin.uz</strong> создан для простого решения этой проблемы.
                С помощью нашего конвертера вы можете за несколько секунд перевести любой текст или файлы <code>.txt</code>,{" "}
                <code>.docx</code> с кириллицы на латиницу и наоборот. Процесс конвертации выполняется{" "}
                <strong>полностью в вашем браузере</strong> — текст не передается на сервер, гарантируя конфиденциальность.
              </p>
              <p>
                Алгоритм конвертации работает по официальным правилам узбекской латиницы (с изменениями 2019 года).
                Он учитывает правильный перевод специфических букв (Ў, Ғ, Қ, Ҳ, Ш, Ч), знаков апострофа,
                а также сложные случаи позиционного произношения букв <strong>Е, Ё, Ю, Я</strong>.
              </p>
            </>
          )}

          {locale === "en" && (
            <>
              <p>
                The Uzbek language has changed its script several times during the <strong>20th century</strong>.
                Until 1929, the Arabic script was used. From 1929 to 1940, the Latin alphabet was implemented, which was
                then replaced by Cyrillic in 1940. Following Uzbekistan's independence in 1993, the country initiated a transition back to the Latin alphabet.
              </p>
              <p>
                Currently, <strong>both Cyrillic and Latin scripts</strong> remain widely used in Uzbekistan.
                Official papers, school textbooks, and state websites are in Latin, while many books, newspapers, and older generations still prefer Cyrillic. This coexistence creates a continuous demand for fast and reliable <strong>transliteration tools</strong>.
              </p>
              <p>
                <strong>Kirillotin.uz</strong> was developed to address this exact challenge.
                Our website lets you convert any text, <code>.txt</code>, or <code>.docx</code> file from Cyrillic to Latin and vice versa in a few seconds. The conversion process runs <strong>entirely inside your browser</strong>, meaning your text is never sent to a server, keeping your data secure.
              </p>
              <p>
                The transliteration algorithm complies with the current official Uzbek Latin standards (including the 2019 changes). Special characters (O', G', Q, H, Sh, Ch), apostrophes, and position-based vowel rules for <strong>E, Yo, Yu, Ya</strong> are fully handled.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

const LETTER_TABLE = [
  { cyr: "А а", lat: "A a", exCyr: "Ака", exLat: "Aka" },
  { cyr: "Б б", lat: "B b", exCyr: "Бола", exLat: "Bola" },
  { cyr: "В в", lat: "V v", exCyr: "Вақт", exLat: "Vaqt" },
  { cyr: "Г г", lat: "G g", exCyr: "Гул", exLat: "Gul" },
  { cyr: "Д д", lat: "D d", exCyr: "Дўст", exLat: "Do'st" },
  { cyr: "Е е", lat: "E / Ye", exCyr: "Ер, Сел", exLat: "Yer, Sel" },
  { cyr: "Ё ё", lat: "Yo", exCyr: "Ёш", exLat: "Yosh" },
  { cyr: "Ж ж", lat: "J j", exCyr: "Жон", exLat: "Jon" },
  { cyr: "З з", lat: "Z z", exCyr: "Заҳмат", exLat: "Zahmat" },
  { cyr: "И и", lat: "I i", exCyr: "Иш", exLat: "Ish" },
  { cyr: "Й й", lat: "Y y", exCyr: "Йўл", exLat: "Yo'l" },
  { cyr: "К к", lat: "K k", exCyr: "Китоб", exLat: "Kitob" },
  { cyr: "Л л", lat: "L l", exCyr: "Лола", exLat: "Lola" },
  { cyr: "М м", lat: "M m", exCyr: "Меҳр", exLat: "Mehr" },
  { cyr: "Н н", lat: "N n", exCyr: "Нон", exLat: "Non" },
  { cyr: "О о", lat: "O o", exCyr: "Ота", exLat: "Ota" },
  { cyr: "П п", lat: "P p", exCyr: "Пахта", exLat: "Paxta" },
  { cyr: "Р р", lat: "R r", exCyr: "Раҳмат", exLat: "Rahmat" },
  { cyr: "С с", lat: "S s", exCyr: "Севги", exLat: "Sevgi" },
  { cyr: "Т т", lat: "T t", exCyr: "Тошкент", exLat: "Toshkent" },
  { cyr: "У у", lat: "U u", exCyr: "Уй", exLat: "Uy" },
  { cyr: "Ф ф", lat: "F f", exCyr: "Фарзанд", exLat: "Farzand" },
  { cyr: "Х х", lat: "X x", exCyr: "Хайр", exLat: "Xayr" },
  { cyr: "Ц ц", lat: "S / Ts", exCyr: "Цех", exLat: "Sex" },
  { cyr: "Ч ч", lat: "Ch", exCyr: "Чой", exLat: "Choy" },
  { cyr: "Ш ш", lat: "Sh", exCyr: "Шаҳар", exLat: "Shahar" },
  { cyr: "Ъ ъ", lat: "'", exCyr: "Маъно", exLat: "Ma'no" },
  { cyr: "Ь ь", lat: "(тушади)", exCyr: "Конький", exLat: "Konkiy" },
  { cyr: "Э э", lat: "E e", exCyr: "Эшик", exLat: "Eshik" },
  { cyr: "Ю ю", lat: "Yu", exCyr: "Юлдуз", exLat: "Yulduz" },
  { cyr: "Я я", lat: "Ya", exCyr: "Ярим", exLat: "Yarim" },
  { cyr: "Ў ў", lat: "O'", exCyr: "Ўзбек", exLat: "O'zbek" },
  { cyr: "Қ қ", lat: "Q", exCyr: "Қалам", exLat: "Qalam" },
  { cyr: "Ғ ғ", lat: "G'", exCyr: "Ғоя", exLat: "G'oya" },
  { cyr: "Ҳ ҳ", lat: "H", exCyr: "Ҳаво", exLat: "Havo" },
];

const LOCALIZED_RULES: Record<Locale, { title: string; text: string; examples?: string[] }[]> = {
  "uz-cyr": [
    {
      title: "Апостроф (') ишлатиш",
      text: "Ўзбек лотин алифбосида апостроф иккита асосий вазифани бажаради: 'O ва 'G ҳарфларининг бир қисми сифатида ва унлидан кейин қаттиқ талаффуз учун.",
      examples: ["Ўзбек → O'zbek", "Маъно → Ma'no", "Сирғалмоқ → Sirg'almoq", "Ғалаба → G'alaba"],
    },
    {
      title: "Ш, Ч, Нг — иккита ҳарф билан ёзилади",
      text: "Кирил алифбосидаги битта ҳарф Ш, Ч ва Нг лотин ёзувида иккита ҳарф билан ифодаланади: Sh, Ch, Ng. Бу ҳарфларни ёзишда катта-кичик жиҳат тўғри сақланиши керак (мисол: SHAHAR эмас, Shahar).",
      examples: ["Шаҳар → Shahar", "Чой → Choy", "Сингил → Singil"],
    },
    {
      title: "Е ҳарфининг икки талаффузи",
      text: "Кирил Е ҳарфи сўз бошида ва унлидан кейин 'Ye' деб ўгирилади, ундошдан кейин эса фақат 'E' бўлади. Бу ўзбек тилидаги энг кўп хато қилинадиган қоидалардан бири.",
      examples: ["Ер → Yer", "Емак → Yemak", "Мен → Men", "Кел → Kel"],
    },
    {
      title: "Ё, Ю, Я — доимо иккита ҳарф",
      text: "Ё, Ю, Я ҳарфлари ҳар доим Yo, Yu, Ya шаклида ёзилади (қаерда келишидан қатъий назар). Сўз ўртасида ҳам бирлашмайди.",
      examples: ["Ёш → Yosh", "Юлдуз → Yulduz", "Ярим → Yarim", "Дарё → Daryo"],
    },
    {
      title: "Х ва Ҳ — иккита ҳар хил товуш",
      text: "Кирил Х ҳарфи лотинда X билан, Ҳ эса H билан ёзилади. Бу икки ҳарфни адаштириш — энг кенг тарқалган хато. Талаффузда ҳам фарқ бор: Х — қаттиқ, Ҳ — юмшоқ.",
      examples: ["Хайр → Xayr", "Ҳаво → Havo", "Хато → Xato", "Ҳалол → Halol"],
    },
    {
      title: "Ц ҳарфининг ўгирилиши",
      text: "Кирил Ц ҳарфи сўз бошида ва унлидан кейин 'S' деб, ундошдан кейин эса 'Ts' деб ёзилади. Бу асосан рус тилидан кирган сўзларда учрайди.",
      examples: ["Цемент → Sement", "Цирк → Sirk", "Концерт → Konsert"],
    },
    {
      title: "Ь ҳарфи тушиб қолади",
      text: "Кирилдаги юмшоқлик белгиси (Ь) лотинда ҳеч қандай белги билан ифодаланмайди — оддийгина тушиб қолади. Сўзнинг қолган қисми ёзилаверади.",
      examples: ["Конький → Konkiy", "Альбом → Albom"],
    },
    {
      title: "Бош ҳарфлар ва тиниш белгилари",
      text: "Конвертация жараёнида бош ҳарфлар, тиниш белгилари (нуқта, вергул, савол белгиси), рақамлар ва бўш жойлар ўз ҳолича сақланиб қолади. Фақат ҳарфлар алмашади.",
      examples: ["Салом, дунё! → Salom, dunyo!"],
    },
  ],
  "uz-lat": [
    {
      title: "Apostrof (') ishlatish",
      text: "O'zbek lotin alifbosida apostrof ikkita asosiy vazifani bajaradi: O' va G' harflarining bir qismi sifatida va unlidan keyin qattiq talaffuz uchun.",
      examples: ["O'zbek", "Ma'no", "Sirg'almoq", "G'alaba"],
    },
    {
      title: "Sh, Ch, Ng — ikkita harf bilan yoziladi",
      text: "Kiril alifbosidagi bitta harf Sh, Ch va Ng lotin yozuvida ikkita harf bilan ifodalanadi: Sh, Ch, Ng. Bu harflarni yozishda katta-kichik jihat to'g'ri saqlanishi kerak (misol: SHAHAR emas, Shahar).",
      examples: ["Shahar", "Choy", "Singil"],
    },
    {
      title: "E harfining ikki talaffuzi",
      text: "Kiril E harfi so'z boshida va unlidan keyin 'Ye' deb o'giriladi, undoshdan keyin esa faqat 'E' bo'ladi. Bu o'zbek tilidagi eng ko'p xato qilinadigan qoidalardan biri.",
      examples: ["Yer", "Yemak", "Men", "Kel"],
    },
    {
      title: "Yo, Yu, Ya — doimo ikkita harf",
      text: "Yo, Yu, Ya harflari har doim Yo, Yu, Ya shaklida yoziladi (qaerda kelishidan qat'iy nazar). So'z o'rtasida ham birlashmaydi.",
      examples: ["Yosh", "Yulduz", "Yarim", "Daryo"],
    },
    {
      title: "X va H — ikkita har xil tovush",
      text: "Kiril X harfi lotinda X bilan, H esa H bilan yoziladi. Bu ikki harfni adashtirish — eng keng tarqalgan xato. Talaffuzda ham farq bor: X — qattiq, H — yumshoq.",
      examples: ["Xayr", "Havo", "Xato", "Halol"],
    },
    {
      title: "Ts harfining o'girilishi",
      text: "Kiril Ts harfi so'z boshida va unlidan keyin 'S' deb, undoshdan keyin esa 'Ts' deb yoziladi. Bu asosan rus tilidan kirgan so'zlarda uchraydi.",
      examples: ["Sement", "Sirk", "Konsert"],
    },
    {
      title: "b belgisi tushib qoladi",
      text: "Kirildagi yumshoqlik belgisi (b) lotinda hech qanday belgi bilan ifodalanmaydi — oddiygina tushib qoladi. So'zning qolgan qismi yozilaveradi.",
      examples: ["Konkiy", "Albom"],
    },
    {
      title: "Bosh harflar va tinish belgilari",
      text: "Konvertatsiya jarayonida bosh harflar, tinish belgilari (nuqta, vergul, savol belgisi), raqamlar va bo'sh joylar o'z holicha saqlanib qoladi. Faqat harflar almashadi.",
      examples: ["Salom, dunyo!"],
    },
  ],
  "ru": [
    {
      title: "Использование апострофа (')",
      text: "В узбекской латинице апостроф выполняет две основные функции: является частью букв O' и G', а также используется после гласных для твердого произношения (разделительный знак).",
      examples: ["O'zbek", "Ma'no", "Sirg'almoq", "G'alaba"],
    },
    {
      title: "Буквосочетания Sh, Ch, Ng",
      text: "Буквы кириллицы Ш, Ч и сочетание Нг в латинице записываются двумя буквами: Sh, Ch, Ng. При этом важно соблюдать регистр букв (например: Shahar, а не SHAHAR).",
      examples: ["Shahar (Ш)", "Choy (Ч)", "Singil (Нг)"],
    },
    {
      title: "Два варианта произношения буквы Е",
      text: "Кириллическая буква Е в начале слова и после гласных переводится как 'Ye', а после согласных — как 'E'. Это одно из самых частых правил узбекской орфографии.",
      examples: ["Yer (земля)", "Yemak (есть)", "Men (я)", "Kel (приходи)"],
    },
    {
      title: "Буквы Ё, Ю, Я — всегда две буквы",
      text: "Кириллические буквы Ё, Ю, Я всегда записываются в латинице как Yo, Yu, Ya (независимо от их позиции в слове).",
      examples: ["Yosh (возраст)", "Yulduz (звезда)", "Yarim (половина)", "Daryo (река)"],
    },
    {
      title: "Буквы X и H — два разных звука",
      text: "Кириллическая буква Х пишется на латинице как X (твердый звук), а буква Ҳ — как H (мягкий придыхательный). Их смешение является самой частой ошибкой.",
      examples: ["Xayr (пока)", "Havo (воздух)", "Xato (ошибка)", "Halol (халяль)"],
    },
    {
      title: "Перевод буквы Ц",
      text: "Буква Ц в начале слова и после гласных пишется как 'S', а после согласных — как 'Ts'. Встречается в заимствованиях.",
      examples: ["Sement (цемент)", "Sirk (цирк)", "Konsert (концерт)"],
    },
    {
      title: "Мягкий знак (Ь) опускается",
      text: "Мягкий знак (Ь) из кириллицы никак не отображается на латинице — он просто опускается при переводе. Остальная часть слова пишется без изменений.",
      examples: ["Konkiy (коньки)", "Albom (альбом)"],
    },
    {
      title: "Заглавные буквы и пунктуация",
      text: "В процессе конвертации заглавные буквы, знаки препинания (точки, запятые, знаки вопроса), цифры и пробелы полностью сохраняются на своих местах.",
      examples: ["Salom, dunyo! (Привет, мир!)"],
    },
  ],
  "en": [
    {
      title: "Using the Apostrophe (')",
      text: "In the Uzbek Latin alphabet, the apostrophe serves two main purposes: it is an organic part of the letters O' and G', and it acts as a hard pronunciation sign after vowels.",
      examples: ["O'zbek", "Ma'no", "Sirg'almoq", "G'alaba"],
    },
    {
      title: "Digraphs Sh, Ch, Ng",
      text: "Cyrillic single letters Sh (Ш) and Ch (Ч), as well as the sound Ng (Нг), are written using two characters: Sh, Ch, Ng. Letter cases must be maintained properly (e.g., Shahar, not SHAHAR).",
      examples: ["Shahar (city)", "Choy (tea)", "Singil (sister)"],
    },
    {
      title: "Two pronunciations of the letter E",
      text: "Cyrillic E at the beginning of a word and after vowels is converted as 'Ye', while after consonants it is written as 'E'. This is one of the most frequently misspelled rules.",
      examples: ["Yer (earth)", "Yemak (to eat)", "Men (I)", "Kel (come)"],
    },
    {
      title: "Yo, Yu, Ya — always two letters",
      text: "Cyrillic letters Yo (Ё), Yu (Ю), and Ya (Я) are always written as Yo, Yu, Ya regardless of their position in the word.",
      examples: ["Yosh (age)", "Yulduz (star)", "Yarim (half)", "Daryo (river)"],
    },
    {
      title: "Letters X and H — two distinct sounds",
      text: "Cyrillic X is written in Latin as X (velar fricative), whereas Ҳ is written as H (glottal fricative). Confusing these two is the most common orthographic error.",
      examples: ["Xayr (bye)", "Havo (weather)", "Xato (mistake)", "Halol (halal)"],
    },
    {
      title: "Conversion of the letter Ts (Ц)",
      text: "Cyrillic Ts (Ц) is written as 'S' at the beginning of words and after vowels, and as 'Ts' after consonants. Found mostly in loanwords.",
      examples: ["Sement (cement)", "Sirk (circus)", "Konsert (concert)"],
    },
    {
      title: "Soft sign (Ь) is omitted",
      text: "The soft sign (Ь) in Cyrillic has no representation in the Latin alphabet — it is simply dropped during transliteration. The rest of the word remains unchanged.",
      examples: ["Konkiy (skates)", "Albom (album)"],
    },
    {
      title: "Capitalization and Punctuation",
      text: "Capital letters, punctuation marks (periods, commas, question marks), digits, and spaces remain unchanged during conversion. Only alphabet characters are swapped.",
      examples: ["Salom, dunyo! (Hello, world!)"],
    },
  ],
};
