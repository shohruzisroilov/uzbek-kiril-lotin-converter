# Product

## Register

brand

## Users

Everyday Uzbek-speaking people who need to move text between the Cyrillic and Latin Uzbek alphabets. They arrive mostly from Google searches like "kiril lotin", often on mid-tier Android phones, often in a hurry, often non-technical. Use cases include:

- A student converting an assignment between scripts a teacher requires.
- An office worker translating a `.docx` document where formatting must survive.
- An older relative who learned in Cyrillic, trying to read or send something in Latin (or vice versa).
- Occasional power users (translators, editors) returning daily with larger documents.

Primary success metric: a first-time mobile visitor lands, gets the conversion done, and trusts it enough to come back or share the link. Power users are a secondary audience whose needs must not break the primary one.

## Product Purpose

kirillotin.uz is a free, browser-only conversion tool between Uzbek Cyrillic and Latin alphabets, with `.txt` and `.docx` support (preserving docx formatting). The entire site is the product: there is no app to install, no account, no server roundtrip — text never leaves the browser.

Strategically, the site exists to be **the** answer Uzbek users find when they search for this. Success looks like: trusted by name, recommended in chats, faster and more honest than ad-laden alternatives. Because the tool itself is simple, the differentiator is craft, trust, and a distinctly Uzbek voice — not features.

## Brand Personality

**Calm. Trustworthy. Native-Uzbek.**

- **Voice:** Plain, respectful Uzbek. Direct sentences, no marketing hype, no exclamation marks. Reads like a competent neighbor explaining something, not a startup pitching it.
- **Tone:** Quietly confident. The site says what it does and gets out of the way. Promises are minimal and kept (offline, free, private).
- **Emotional goal:** A user closes the tab feeling the task was easy and the site was honest. No anxiety, no surprise, no "where did my text go".

The Uzbek-ness should come from typography, copy, and small considered details, not flags, motifs, or kitsch.

## Anti-references

Actively avoid the **generic SaaS template** look. Specifically, refuse:

- Sky-blue + Inter + gradient text + check-mark feature grids. (The current design leans into this; we are pulling away from it, not toward it.)
- "AI-powered", "blazing fast", or any vocabulary that flags this as another startup landing.
- Hero with a giant centered headline plus three identical cards underneath.
- Crypto/fintech neon, glow shadows, dark-mode-as-cool-default.
- Translator-competitor mimicry (Google Translate, Yandex layouts).
- Government-portal stiffness, flag colors, or table-heavy bureaucratic layouts.

If a casual viewer could guess "Uzbek converter utility" from the palette and layout alone, the design has failed the category-reflex test.

## Design Principles

1. **Trust is the product.** Every visible element should earn the claim "your text never leaves your browser." Choose materials, copy, and interactions that feel honest rather than slick.
2. **The converter is the hero.** Not a feature grid, not a FAQ wall — the input/output pair and the file uploader are the page. Everything else exists to support them.
3. **Restraint over decoration.** One committed color, generous whitespace, real typographic hierarchy. Closer to Stripe/Linear restraint than to Tailwind-template maximalism. No effects without a reason.
4. **Native, not translated.** The Uzbek voice in copy, micro-interactions, and rhythm should feel like the site was designed in Uzbek first, not localized from English afterwards.
5. **Mobile-first, calmly.** The first-time visitor on a cheap Android in a hurry is the design target. If a choice helps a desktop power user but slows or confuses that visitor, the power user loses.

## Accessibility & Inclusion

- **WCAG 2.1 AA** as the floor for color contrast, focus visibility, and keyboard reachability.
- **Reduced motion** must be respected end-to-end (currently honored in `globals.css` — keep it that way for any new motion).
- **Mobile-first**: tap targets ≥ 44px, action buttons that survive the 320px viewport, no layouts that require horizontal scroll.
- **Script awareness**: every text-bearing element must render Uzbek Cyrillic (Ў, Қ, Ғ, Ҳ) and Latin (Oʻ, Gʻ, apostrophe) cleanly. Test fonts on both before adopting.
- **Form labels and ARIA** on every input, button, and toggle. Output textareas must announce updates politely (no aggressive live-region spam).
- Avoid color as the sole carrier of meaning (e.g. don't rely on red alone to signal "destructive").
