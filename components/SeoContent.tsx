export function SeoContent() {
  return (
    <div className="space-y-16">
      {/* Harflar jadvali */}
      <section id="harflar" className="space-y-6 scroll-mt-20">
        <div className="text-center space-y-2">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
            Алифбо
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Кирил ва Лотин ҳарфлари жадвали
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Ўзбек тилидаги барча кирил ҳарфларининг лотинча эквиваленти ва мисоллар билан тўлиқ жадвал.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto rounded-xl border border-gray-300 dark:border-gray-800">
          <table className="w-full text-base">
            <thead className="bg-gray-100 dark:bg-gray-800/80 border-b border-gray-300 dark:border-gray-700">
              <tr className="text-left text-sm uppercase tracking-wider text-gray-700 dark:text-gray-300">
                <th className="px-4 py-3.5 font-bold">Кирил</th>
                <th className="px-4 py-3.5 font-bold">Лотин</th>
                <th className="px-4 py-3.5 font-bold">Мисол (Кирил)</th>
                <th className="px-4 py-3.5 font-bold">Мисол (Лотин)</th>
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
            Қоидалар
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Кирил ва Лотин ёзув қоидалари
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {RULES.map((rule) => (
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

      {/* Haqida */}
      <section id="haqida" className="space-y-6 scroll-mt-20">
        <div className="text-center space-y-2">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400">
            Тарих
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Ўзбек ёзуви ҳақида
          </h2>
        </div>

        <div className="max-w-3xl mx-auto prose prose-base sm:prose-lg dark:prose-invert prose-headings:font-bold prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-loose prose-strong:text-gray-950 dark:prose-strong:text-gray-50">
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
            <code>.docx</code> файлни кирилдан лотинга ёки аксинча, лотиндан кирилга
            бир неча сонияда ўгириб олиш мумкин. Ўгириш жараёни{" "}
            <strong>тўлиқ браузеризда</strong> амалга оширилади — матн серверга
            юборилмайди ва махфийлик сақланади.
          </p>
          <p>
            Конвертация алгоритми ҳозирги расмий ўзбек лотин алифбоси (2019 йил
            ўзгартиришлари билан) асосида ишлайди. Махсус ҳарфлар (Ў, Ғ, Қ, Ҳ, Ш, Ч),
            юмшоқ ва қаттиқ белгилар, ҳамда сўз бошидаги ва ўртасидаги{" "}
            <strong>Е, Ё, Ю, Я</strong> каби нозик ҳолатлар инобатга олинган.
          </p>
        </div>
      </section>
    </div>
  );
}

const LETTER_TABLE: { cyr: string; lat: string; exCyr: string; exLat: string }[] = [
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

const RULES: { title: string; text: string; examples?: string[] }[] = [
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
];
