---
name: Кирил ↔ Лотин Конвертор
description: Browser-only Uzbek Cyrillic-Latin converter. Calm, trustworthy, native-Uzbek.
colors:
  signal-blue: "#0284c7"
  signal-blue-deep: "#0369a1"
  signal-blue-soft: "#e0f2fe"
  signal-blue-ink: "#0c3d66"
  paper-cream: "#f6f5f1"
  manuscript: "#fbfaf7"
  rule: "#e5e7eb"
  whisper: "#6b7280"
  ink-soft: "#374151"
  ink: "#111827"
  night: "#030712"
  night-surface: "#111827"
  night-elev: "#1f2937"
  night-rule: "#374151"
  affirm: "#10b981"
  affirm-deep: "#059669"
  alert: "#ef4444"
typography:
  display:
    fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "1rem"
  2xl: "1.5rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.manuscript}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue-deep}"
    textColor: "{colors.manuscript}"
    rounded: "{rounded.lg}"
  button-secondary:
    backgroundColor: "{colors.manuscript}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.whisper}"
    rounded: "{rounded.md}"
    padding: "0.375rem 0.75rem"
  button-affirm:
    backgroundColor: "{colors.affirm}"
    textColor: "{colors.manuscript}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
  button-alert:
    backgroundColor: "{colors.alert}"
    textColor: "{colors.manuscript}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 1rem"
  card:
    backgroundColor: "{colors.manuscript}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "1rem"
  input:
    backgroundColor: "{colors.manuscript}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1rem"
  chip-label:
    backgroundColor: "transparent"
    textColor: "{colors.signal-blue}"
    rounded: "{rounded.sm}"
    padding: "0 0"
  file-card:
    backgroundColor: "{colors.signal-blue-soft}"
    textColor: "{colors.signal-blue-deep}"
    rounded: "{rounded.lg}"
    padding: "0.75rem 1rem"
---

# Design System: Кирил ↔ Лотин Конвертор

## 1. Overview

**Creative North Star: "The Quiet Reference"**

The site should feel like a well-printed reference book opened on a desk: warm paper-white surface, generous margins, one ink color, type doing the work. Decoration is absent because it would interrupt. The user came to convert text, the way someone opens a dictionary to check a spelling — the page acknowledges that with composure, not enthusiasm.

This is a brand register where the brand is restraint. The system rejects the prevailing utility-tool aesthetic (sky-blue + Inter + check-mark feature grids + gradient text) that the current implementation partially inherits. Every change moves the page closer to a published artifact and away from a SaaS landing. Closer to Stripe's documentation set than to a Tailwind starter; closer to Are.na or a quiet editorial site than to Google Translate. The result must read as native Uzbek work, not as an English template translated into Cyrillic.

**Key Characteristics:**
- **Warm, paper-toned neutrals.** Never `#fff` or `#000`. The background is `paper-cream` (`#f6f5f1`), the surface is `manuscript` (`#fbfaf7`).
- **One committed primary**, used in ≤10% of the surface. Color is signal, not decoration.
- **Type-led hierarchy.** Scale and weight do the work shadows and color elsewhere try to do.
- **Generous whitespace at section seams**, tight rhythm within blocks.
- **Motion is functional only**: state changes, disclosure, toast entry and exit. No choreography, no scroll-driven effects.
- **Mobile-first layout**: every component must survive 320px without horizontal scroll.

## 2. Colors

The palette is paper-warm neutrals plus a single confident blue. There is no secondary or tertiary accent — that absence is the point.

### Primary
- **Signal Blue** (`#0284c7`): Reserved for the primary action of the converter (Download), the toggle's active state, the chip border around the loaded file, focus rings, and link hover. It does not appear in decoration, headings, gradients, or backgrounds outside of small, semantic moments. The current implementation overuses it; future work should pull back.
- **Signal Blue Deep** (`#0369a1`): Hover/active state for Signal Blue. Also used as text on the soft tint.
- **Signal Blue Soft** (`#e0f2fe`): Background of the loaded-file card only. Not a general background.
- **Signal Blue Ink** (`#0c3d66`): Reserved for dark-mode focus rings on tinted surfaces.

### Neutral
- **Paper Cream** (`#f6f5f1`): The page background in light mode. Warm, low-saturation off-white that reads as paper, not screen.
- **Manuscript** (`#fbfaf7`): The card / input / surface color in light mode. Slightly lighter than Paper Cream so cards lift without a shadow.
- **Rule** (`#e5e7eb`): Hairline borders, dividers, dashed dropzone outline.
- **Whisper** (`#6b7280`): Secondary text, placeholders, footer copy, nav defaults.
- **Ink Soft** (`#374151`): Standard body copy weight, secondary headings.
- **Ink** (`#111827`): Primary headings, the strongest text used in light mode.
- **Night** (`#030712`): Page background in dark mode. A deep desaturated near-black, never pure black.
- **Night Surface** (`#111827`): Card / surface color in dark mode.
- **Night Elev** (`#1f2937`): Elevated surface in dark mode (toggle inactive, secondary button, hover states).
- **Night Rule** (`#374151`): Hairline borders in dark mode.

### Semantic
- **Affirm** (`#10b981`): Reserved for success toast and the "ready" inline confirmation. Currently the Copy and Download buttons also use it — that is wrong and should change (see Don'ts).
- **Alert** (`#ef4444`): Reserved exclusively for genuine error states (failed upload, conversion failure). Currently the Clear button uses it — that is wrong and should change (see Don'ts).

### Named Rules

**The No Pure White Rule.** `#ffffff` and `#000000` are forbidden in any surface, text, or border declaration. Pure white in light mode and pure black in dark mode read as a default, untouched template. Always tint toward warmth (light) or deep cool (dark). `bg-white` in code is remapped to `manuscript` via the override in `globals.css`; do not undo this override and do not introduce raw `#fff` in inline styles or new classes.

**The One Voice Rule.** Signal Blue may occupy at most 10% of any rendered viewport. Saturation is signal; if everything is blue, nothing is. When in doubt, demote a blue surface to Manuscript or a blue border to Rule.

**The Reserved Semantics Rule.** Red means error. Green means success. Neither color may be used for a non-semantic action (e.g. "Clear" or "Copy"). A neutral or ghost variant is always the right answer for those.

## 3. Typography

**Display Font:** Inter (with `system-ui`, `-apple-system`, `Segoe UI`, `Roboto`, `sans-serif` fallbacks).
**Body Font:** Inter (same stack).
**Subsets loaded:** `latin`, `cyrillic`, `cyrillic-ext` — both alphabets render from the same family, which is a non-negotiable requirement for this product.

**Character:** Inter is a neutral, screen-optimized humanist sans. It carries Uzbek Cyrillic cleanly (Ў, Қ, Ғ, Ҳ render without falling back) and is a defensible single-font choice. It is not, however, distinctive. A future direction may pair Inter with an editorial display face for headlines and reserved type moments; until that happens, hierarchy is built entirely from scale and weight contrast.

### Hierarchy
- **Display** (700, `clamp(1.875rem, 4vw, 3rem)`, line-height 1.1, tracking `-0.02em`): Reserved for the page H1 / hero headline. The current implementation under-uses this slot (the H1 ships at `text-lg sm:text-2xl`); future work should reclaim it.
- **Headline** (700, `clamp(1.5rem, 2.5vw, 1.875rem)`, line-height 1.2, tracking `-0.01em`): Section H2s ("Сайт ҳақида", "Имкониятлар", "Тез-тез бериладиган саволлар").
- **Title** (600, `1.125rem`, line-height 1.35): FAQ question headings, file card name, toggle button labels.
- **Body** (400, `1rem`, line-height 1.625): Default paragraph text. Cap measure at **65–75ch** in long-form sections (About, FAQ answers, SEO content).
- **Label** (600, `0.6875rem`, line-height 1.2, tracking `0.08em`, UPPERCASE): Section eyebrow labels ("Сайт ҳақида", "Имкониятлар", "Саволлар") above each H2 in the long-scroll content area.

### Named Rules

**The Two-Step Contrast Rule.** Adjacent type levels must differ by at least 1.25× in scale OR a 200-unit weight step. A 1rem 600 next to a 1rem 400 reads as flat; size it up or pull the weight further apart.

**The Cyrillic-First Test Rule.** Any candidate font must be evaluated on a real Uzbek Cyrillic string (`Ўзбек тилидаги матнларни конвертация қилиш`) and a real Uzbek Latin string (`Oʻzbek tilidagi matnlarni konvertatsiya qilish`) before adoption. If either renders with fallback glyphs, the font is rejected regardless of how good its Latin looks.

## 4. Elevation

The system is **flat-by-default, lifted-on-state**. Cards rest on the page without a shadow — the contrast between `paper-cream` and `manuscript` does the lifting tonally. Shadows appear only as a hover response on interactive surfaces and on primary buttons at rest (very subtle). There is no ambient depth, no stacked layers, no glassmorphism.

### Shadow Vocabulary
- **Lift (`shadow-sm`)** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Default on cards and primary buttons. Barely perceptible; just enough to separate from background under bright ambient light.
- **Hover Lift (`shadow-md`)** (`box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`): Card hover only on devices that actually have hover (gated via `@media (hover: hover) and (pointer: fine)`). Primary buttons also escalate to this on hover.
- **Inner Subtle (`inner-sm`)** (`box-shadow: inset 0 1px 2px 0 rgb(0 0 0 / 0.05)`): Defined but currently unused. Reserved for pressed/recessed surfaces if ever needed.
- **Glow** (`box-shadow: 0 0 20px -5px rgba(2,132,199,0.4)`): Defined but should not be used. Glow shadows are decorative; they violate the system. Slated for removal.

### Named Rules

**The Tonal Lift Rule.** Depth between surfaces comes from the tonal step between `paper-cream` (background) and `manuscript` (surface) — not from a shadow. If a new component needs to feel elevated, change its background to `manuscript`; do not reach for `shadow-sm` first.

**The No Glow Rule.** Coloured glow shadows (the `boxShadow.glow` token, any `0 0 Npx rgba(brand)`) are prohibited. They are a 2014 SaaS reflex and undermine The Quiet Reference. The token should be deleted, not used.

## 5. Components

### Buttons
- **Shape:** Gently curved corners, `rounded-xl` (`0.75rem`).
- **Primary (`button-primary`):** `signal-blue` background, `manuscript` text, `shadow-sm` at rest. Reserved for the single most important action on a screen — currently the in-card "Юклаб олиш" inside the file uploader. The action bar's three "Copy / Download / Clear" buttons should NOT all be Primary.
- **Secondary (`button-secondary`):** `manuscript` background, `ink-soft` text, hairline `rule` border, `shadow-sm`. Default for most actions.
- **Ghost (`button-ghost`):** Transparent background, `whisper` text, no border. For tertiary actions (nav links, "Бекор қилиш").
- **Affirm (`button-affirm`):** Emerald background, manuscript text. **Reserved for true success affordances only** (e.g. confirming a completed operation in a toast). Not for "Copy".
- **Alert (`button-alert`):** Red background. **Reserved for confirming a destructive operation that the user has already opted into** (e.g. inside a confirmation modal). Not for "Clear" as a default-state button.
- **States:** All buttons share a 100ms `scale(0.97)` press, a `smooth-transition` over `background-color / border / color / box-shadow / transform / opacity` at 180ms with `ease-out-strong`. Focus is a 2px ring of `signal-blue` offset by 2px from the surface, dark-mode offset against `night-surface`.

### Toggle (Direction Segmented Control)
- **Shape:** `rounded-lg` (`0.5rem`), full-width on mobile, content-width on desktop.
- **Frame:** Hairline `rule` border, `overflow: hidden` so segments share the rounded edge.
- **Active segment:** `signal-blue` background, `manuscript` text.
- **Inactive segment:** `manuscript` background (or `night-elev` in dark mode), `whisper` text, hover to a one-step lighter neutral.
- **No icons.** Text-only. The Cyrillic / Latin labels are themselves the strongest possible affordance.

### Cards
- **Corner Style:** `rounded-2xl` (`1rem`). The largest radius in the system; reserved for content cards.
- **Background:** `manuscript` (light) / `night-surface` (dark).
- **Shadow Strategy:** `shadow-sm` at rest. Hover escalates to `shadow-md` only on hover-capable pointers.
- **Border:** Hairline `rule` (`#e5e7eb`).
- **Internal Padding:** `1rem` (`p-4`) default.
- **Anti-pattern:** Never nest cards. The current `card > input-base` pattern in the converter is a card wrapping a bordered input — that is a double border, choose one.

### Inputs / Textareas
- **Style:** `rounded-xl` (`0.75rem`), `manuscript` background, hairline `rule` border, 12px vertical / 16px horizontal padding.
- **Focus:** 2px `signal-blue` ring, border becomes transparent (replaced by the ring). No glow.
- **Placeholder:** `whisper`, no italic, normal weight.
- **Output textarea:** Visually identical to input. `readOnly` is the only differentiator; do not add a different background, lock icon, or muted style — the label "Натижа" carries the meaning.

### File Uploader
The system's signature component. Has two states, both inline (no modal).

- **Empty state:** Dashed `rule` border (`border-2 border-dashed`), `rounded-xl`, no background, centred upload glyph + helper copy ("Файл юклаш ёки бу ерга ташланг (.txt, .docx · макс 5MB)"). Hover swaps the border to `signal-blue` softened. The dashed border is the only acceptable use of a dashed line in the system.
- **Loaded state:** Becomes a `signal-blue-soft` card with `signal-blue` border, file icon, file name, an inline status line (converting / ready), and the primary Download button on the right. This is one of the rare places where signal blue earns its tint.

### Disclosure (FAQ Item)
- **Shape:** `rounded-xl`, hairline `rule` border, `paper-cream`-tinted surface (slightly cooler than the page background to read as a control).
- **Header:** Full-width button, `title` typography, left-aligned question, right-aligned chevron.
- **Body animation:** `grid-template-rows: 0fr → 1fr` over 260ms `ease-out-strong`. Do not animate `height` or `max-height`. The chevron rotates 180° over the same duration.
- **Open/closed:** One open at a time. Visually distinguish the open question header (heavier weight or a subtle background shift), but do not add a coloured stripe or fill.

### Toast
- **Position:** Bottom centre (mobile) / bottom right (desktop), stacked.
- **Shape:** `rounded-xl`, `manuscript` background, hairline border in `rule`, `shadow-md`.
- **Motion:** Slides up 20px and fades in over 250ms `ease-out-strong`. Closes by reversing in 180ms. Both timings respect `prefers-reduced-motion`.
- **No icons by default.** Variant is communicated by a 2px left border in the semantic color (`affirm`, `alert`, `signal-blue` for info) — this is the **single permitted exception** to The No Side-Stripe Rule, because the toast is itself an ephemeral notification surface where a stripe carries information rather than decoration.

### Nav
- **Style:** Inline horizontal, ghost buttons separated by 4px, mobile scrolls horizontally with edge padding.
- **Default:** `whisper` text, no underline.
- **Hover:** `ink` text, soft `rule`-tinted background pill.
- **Active route:** Not currently represented; when added, use a hairline 2px underline under the link in `signal-blue`, never a filled pill.

## 6. Do's and Don'ts

### Do:
- **Do** use `paper-cream` (`#f6f5f1`) as the page background and `manuscript` (`#fbfaf7`) as the surface in light mode. The warmth is identity-level, not cosmetic.
- **Do** reserve **Signal Blue** for one or two real semantic moments per screen: the primary file download action, the toggle's active state, the loaded-file chip, focus rings.
- **Do** lead hierarchy with scale and weight contrast of at least 1.25× or 200 weight units between adjacent levels.
- **Do** test every font candidate on `Ўзбек тилидаги матнларни конвертация қилиш` and `Oʻzbek tilidagi matnlarni konvertatsiya qilish` before adoption.
- **Do** keep motion under 260ms and bound to state, disclosure, or toast lifecycle.
- **Do** respect `prefers-reduced-motion` everywhere; the current global override in `globals.css` is non-negotiable.

### Don't:
- **Don't** use `#ffffff` or `#000000` in any surface, border, or text declaration. Ever.
- **Don't** use `background-clip: text` with a gradient. The `.text-gradient` utility in `globals.css` and its use on the H1 arrow glyph violate this rule and should be removed.
- **Don't** build identical card grids of `icon + heading + sentence` items repeated 4-8 times. The current "Имкониятлар" section is a textbook violation and should be replaced with differentiated, unequally-sized blocks.
- **Don't** use the `.glass-card` utility. Defined but unused; should be deleted before it gets adopted.
- **Don't** use red (`alert`) as the default-state colour for "Clear" or any other recoverable destructive action. Demote to `secondary` or `ghost` and add an undo affordance instead.
- **Don't** use green (`affirm`) for "Copy" or any non-success action. Same reason — green means *something good just happened*, not *do something*.
- **Don't** ship two visually different primary actions for the same verb (the current implementation has a blue Download button in the file card and a green Download button in the action bar; pick one).
- **Don't** nest cards. The "card wraps a bordered input" pattern in the converter is a double border.
- **Don't** reach for `shadow-sm` to elevate a new surface. Use the tonal step between `paper-cream` and `manuscript` first.
- **Don't** use sky-blue + Inter + check-mark feature grids + gradient text. That stack reads as a generic SaaS template — the exact anti-reference named in `PRODUCT.md`.
- **Don't** use em dashes (`—` or `--`) in UI copy or content. Use periods, commas, colons, or parentheses.
- **Don't** add new top-level decorative effects (glow, blur, scroll-driven choreography). The Quiet Reference does not need them.

### Audit Tests
- If the page can be photographed and someone says "AI made that," The Quiet Reference is broken — re-check feature grids, gradient text, and identical-card patterns first.
- If a viewer could guess "Uzbek converter utility" from the palette alone, the category-reflex test has failed — Signal Blue is doing too much of the visual work.
- If a destructive action can be triggered with a single tap and no undo, The Reserved Semantics Rule and the broader trust principle are both being undermined.
