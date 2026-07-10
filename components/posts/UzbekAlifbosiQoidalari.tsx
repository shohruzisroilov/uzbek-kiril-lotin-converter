import Link from "next/link";

export function UzbekAlifbosiQoidalari() {
  return (
    <>
      <p>
        1993 йилда Ўзбекистон расмий равишда лотин ёзувига ўтди ва 2019 йилда
        айрим ҳарфлар янгиланди. Шунга қарамасдан, ҳозир ҳам кўпчилик лотин
        ёзувининг тўғри қоидаларини билмайди. Ушбу мақолада энг асосий
        қоидаларни кўриб чиқамиз.
      </p>

      <h2>Ўзбек лотин алифбоси — 29 ҳариф</h2>
      <p>
        Ҳозирги расмий ўзбек лотин алифбоси 29 ҳарифдан иборат. Уларнинг
        аксарияти инглиз алифбосига ўхшайди, аммо бир нечтаси ўзига хос:
      </p>
      <ul>
        <li>
          <strong>Oʻ (oʻ)</strong> — «ў» ҳарфи учун, тескари апостроф билан
          ёзилади
        </li>
        <li>
          <strong>Gʻ (gʻ)</strong> — «ғ» ҳарфи учун, тескари апостроф билан
          ёзилади
        </li>
        <li>
          <strong>Sh (sh)</strong> — «ш» ҳарфи учун, икки ҳариф
        </li>
        <li>
          <strong>Ch (ch)</strong> — «ч» ҳарфи учун, икки ҳариф
        </li>
        <li>
          <strong>Ng (ng)</strong> — «нг» товуши учун
        </li>
        <li>
          <strong>X (x)</strong> — «х» ҳарфи учун (inglizcha H эмас)
        </li>
        <li>
          <strong>H (h)</strong> — «ҳ» ҳарфи учун (inglizcha H)
        </li>
      </ul>

      <h2>Энг кўп адашиладиган ҳарфлар</h2>

      <h3>1. X ва H фарқи</h3>
      <p>
        Бу энг кўп хато қилинадиган жой. Кирилдаги «Х» лотинда{" "}
        <strong>X</strong> билан, «Ҳ» эса <strong>H</strong> билан ёзилади:
      </p>
      <ul>
        <li>Хайр → <strong>X</strong>ayr (X билан)</li>
        <li>Ҳаво → <strong>H</strong>avo (H билан)</li>
        <li>Бахт → Ba<strong>x</strong>t</li>
        <li>Маҳалла → Ma<strong>h</strong>alla</li>
      </ul>
      <p>
        Батафсил:{" "}
        <Link href="/blog/x-va-h-farqi">Х ва Ҳ ҳарфларининг фарқи</Link>.
      </p>

      <h3>2. Apostrof (ʼ) ишлатиш</h3>
      <p>
        Апостроф икки ҳолда ишлатилади: Oʻ ва Gʻ ҳарфларида ва айрим сўзларда
        маъно фарқлаш учун:
      </p>
      <ul>
        <li>Oʻzbek, Gʻarb — ҳарф таркибида</li>
        <li>Maʼno, jaʼm — маъно фарқлайдиган жойда</li>
      </ul>
      <p>
        Батафсил:{" "}
        <Link href="/blog/apostrof-qachon-ishlatiladi">
          Апостроф қачон ишлатилади
        </Link>
        .
      </p>

      <h3>3. Ye ва E фарқи</h3>
      <p>
        Сўз бошида ва товул ундошидан кейин кирил «Е» лотинда{" "}
        <strong>Ye</strong> билан ёзилади:
      </p>
      <ul>
        <li>Ер → <strong>Ye</strong>r</li>
        <li>Ейди → <strong>Ye</strong>ydi</li>
        <li>Лекин → L<strong>e</strong>kin (ундошдан кейин — E)</li>
      </ul>

      <h3>4. Ts ва Ch</h3>
      <ul>
        <li>Кирил «Ц» → лотин <strong>Ts</strong> (Tsirk → Tsirk)</li>
        <li>Кирил «Ч» → лотин <strong>Ch</strong> (Choy → Choy)</li>
      </ul>

      <h2>Матнни автоматик ўгириш</h2>
      <p>
        Бу қоидаларни ёдлаш шарт эмас —{" "}
        <Link href="/">Kirillotin.uz</Link> ҳаммасини автоматик ва тўғри
        бажаради. Матнни юборинг, натижани бир сонияда олинг.
      </p>
    </>
  );
}
