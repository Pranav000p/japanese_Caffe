# 藤電 カフェ — Japanese Café Website: Full Implementation Plan

> **Project Name:** `fujiden-cafe`
> **Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Theatre.js (optional), Lenis (smooth scroll)
> **Language:** Japanese (ja) — all UI copy in Japanese
> **Aesthetic Direction:** *Showa-era nostalgia meets modern editorial minimalism* — ink-stained textures, warm amber glows, deliberate negative space, cinematic scroll sequences
> **Unforgettable Element:** The hero section uses Image 4 (convenience store at night, puddle reflection) as a full-bleed cinematic parallax backdrop with a "light gasp" bloom animation on load — as if you're stepping into rain-soaked neon for the first time

---

## 1. Project Setup

```bash
npx create-next-app@latest fujiden-cafe \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

cd fujiden-cafe

# Core deps
npm install framer-motion lenis @studio-freight/react-lenis
npm install tailwindcss-animate clsx tailwind-merge

# UI component lib (Radix primitives for accessible modals/accordions)
npm install @radix-ui/react-dialog @radix-ui/react-accordion

# Font loading
npm install next/font  # built-in — use for Noto Serif JP + Zen Old Mincho

# Optional: canvas noise texture
npm install simplex-noise
```

### `tailwind.config.ts` additions
```ts
theme: {
  extend: {
    fontFamily: {
      mincho: ['var(--font-zen-mincho)', 'serif'],
      gothic: ['var(--font-noto-sans-jp)', 'sans-serif'],
    },
    colors: {
      ink:     '#1a1410',
      washi:   '#f5efe6',
      amber:   '#d4863a',
      neon:    '#ff4d5a',
      mist:    '#8ba3a8',
      coal:    '#0d0e0f',
    },
    animation: {
      'bloom':      'bloom 2.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      'rain':       'rain 0.6s linear infinite',
      'float':      'float 6s ease-in-out infinite',
      'ink-reveal': 'inkReveal 1.2s ease forwards',
    },
    keyframes: {
      bloom: {
        '0%':   { opacity: '0', filter: 'brightness(3) blur(40px)' },
        '40%':  { opacity: '0.9', filter: 'brightness(1.8) blur(8px)' },
        '100%': { opacity: '1', filter: 'brightness(1) blur(0px)' },
      },
      inkReveal: {
        '0%':   { clipPath: 'inset(0 100% 0 0)' },
        '100%': { clipPath: 'inset(0 0% 0 0)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%':      { transform: 'translateY(-12px)' },
      },
      rain: {
        '0%':   { transform: 'translateY(-100%)' },
        '100%': { transform: 'translateY(100vh)' },
      }
    }
  }
}
```

---

## 2. Fonts

In `app/layout.tsx` — load via `next/font/google`:

```tsx
import { Zen_Old_Mincho, Noto_Sans_JP } from 'next/font/google'

const zenMincho = Zen_Old_Mincho({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-zen-mincho',
})

const notoSansJP = Noto_Sans_JP({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
})
```

---

## 3. File & Folder Structure

```
src/
├── app/
│   ├── layout.tsx            # Root layout: fonts, Lenis provider, cursor
│   ├── page.tsx              # Home (Hero + sections)
│   ├── about/page.tsx        # About Us — 私たちについて
│   ├── contact/page.tsx      # Contact Us — お問い合わせ
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Floating pill nav
│   │   ├── Footer.tsx        # Footer with links
│   │   └── CustomCursor.tsx  # Ink-drop cursor
│   │
│   ├── sections/
│   │   ├── HeroSection.tsx        # Full cinematic hero
│   │   ├── ConceptSection.tsx     # Philosophy / 哲学
│   │   ├── MenuSection.tsx        # Menu preview — メニュー
│   │   ├── AtmosphereSection.tsx  # Gallery / ambiance
│   │   └── LocationSection.tsx   # Hours & map — アクセス
│   │
│   ├── ui/
│   │   ├── RainCanvas.tsx         # Animated rain overlay
│   │   ├── NoiseOverlay.tsx       # Film grain texture
│   │   ├── SteamEffect.tsx        # CSS steam wisps
│   │   ├── InkDivider.tsx         # Brush stroke SVG divider
│   │   ├── ScrollProgress.tsx     # Vertical kanji scroll bar
│   │   └── ParallaxImage.tsx      # Reusable parallax wrapper
│   │
│   └── modals/
│       ├── TermsModal.tsx
│       └── PrivacyModal.tsx
│
├── lib/
│   ├── lenis.tsx             # Lenis smooth scroll provider
│   └── utils.ts              # cn() helper
│
└── public/
    └── images/
        ├── hero-bg.jpg           # Image 4 (nighttime konbini)
        ├── concept-1.jpg         # Image 1 (street storefront)
        ├── concept-2.jpg         # Image 2 (minimalist illustration)
        └── ramen-art.jpg         # Image 3 (cat ramen ukiyo-e)
```

---

## 4. Page-by-Page Breakdown

---

### 4.1 Root Layout (`app/layout.tsx`)

- Apply font CSS variables to `<html>`
- Wrap children in `<LenisProvider>` for smooth scroll
- Mount `<CustomCursor>` (ink-drop that follows mouse)
- Mount `<NoiseOverlay>` — fixed, pointer-events-none grain layer at 4% opacity
- Meta: `<html lang="ja">`
- Default background: `bg-coal` (#0d0e0f)

---

### 4.2 Navbar (`components/layout/Navbar.tsx`)

**Design:** Floating pill at the top-center. On scroll past 80px, pill gets a `backdrop-blur-md bg-ink/70 border border-amber/20` frosted glass effect.

**Links (Japanese):**
- `ホーム` → `/`
- `メニュー` → `/#menu`
- `私たちについて` → `/about`
- `お問い合わせ` → `/contact`
- `予約する` → CTA button (amber, pill-shaped)

**Framer Motion:** `useScroll` → `useTransform` to animate navbar background opacity. `AnimatePresence` for mobile menu slide-down.

**Mobile:** Hamburger → full-screen overlay menu with staggered link reveals.

---

### 4.3 Hero Section (`components/sections/HeroSection.tsx`)

**The centerpiece — must be extraordinary.**

#### Background
- Image 4 (rainy night konbini) as `<Image fill>` with `object-cover`
- Positioned as `fixed` within a scroll-triggered sticky container
- Overlay layers (bottom to top):
  1. `bg-coal/40` base darkening
  2. `RainCanvas` — HTML5 canvas animated rain streaks (60fps, semi-transparent white)
  3. Radial amber gradient at bottom-center (simulates neon glow from the store)
  4. `NoiseOverlay` grain

#### Light Gasp Animation (on mount)
```
Sequence triggered once on load:
1. Screen starts at brightness(3) blur(40px) opacity(0) — white hot flash
2. Over 2.4s, blooms down to normal — "eyes adjusting to the neon"
3. After bloom settles (t=1.5s), puddle reflection ripple effect begins (CSS radial pulse on the puddle area)
```
Implement via Framer Motion `animate` prop on the hero `<div>` with `filter` keyframes.

#### Rain Canvas (`components/ui/RainCanvas.tsx`)
```ts
// ~120 rain streaks, randomized x, speed, length, opacity
// Each frame: translate down, wrap when off screen
// Color: rgba(180, 210, 255, 0.15)
// Canvas is fixed, pointer-events-none, z-10
```

#### Content Overlay
```
Vertical layout, centered:

[Small text — uppercase tracking-widest, amber color]
"創業 昭和三十二年"  (Est. Showa 32)

[Main headline — Zen Old Mincho, 7xl, white, ink-reveal animation]
"ふじ電カフェ"

[Subtitle — light weight, mist color, fade-in delay 0.8s]
"雨の夜に、温かい一杯を。"
(On a rainy night, a warm cup.)

[Scroll indicator — animated downward kanji 下]
Pulse animation, amber color
```

#### Scroll Parallax
- Use `useScroll` + `useTransform` from Framer Motion
- As page scrolls 0→500px:
  - Hero image: `y: 0 → 200px` (parallax pull-back)
  - Content text: `y: 0 → -80px` (floats up)
  - Rain canvas opacity: `1 → 0.3`
  - Overlay darkening increases

---

### 4.4 Concept Section (`components/sections/ConceptSection.tsx`)

**Design:** Dark section `bg-ink`. Two-column grid on desktop (single on mobile).

**Left column:**
- Image 1 (street storefront photo) in a slightly rotated frame (`rotate-[-1.5deg]`)
- Brushstroke border (SVG clip-path)
- Float animation applied

**Right column:**
- Small label: `コンセプト` in amber tracking-widest
- Headline: `"昭和の記憶、現代の味"` (Showa memories, modern taste) — Zen Mincho, 4xl
- Body copy about café philosophy (3 short paragraphs in Japanese)
- Ink-reveal animation triggered when section enters viewport (`useInView` from Framer)

**Divider:** SVG brushstroke `<InkDivider>` between sections, animated draw-on effect

---

### 4.5 Menu Section (`components/sections/MenuSection.tsx`)

**Design:** Washi paper texture background (`bg-washi`). Dark ink text. Ukiyo-e aesthetic.

**Layout:** 3 columns — カテゴリー cards
- ☕ コーヒー (Coffee)
- 🍵 日本茶 (Japanese Tea)  
- 🍜 軽食 (Light Food)

**Each card:**
- Aged paper card bg with subtle grain
- Hand-drawn style icon (SVG)
- 3–4 menu items with prices in yen
- On hover: card lifts with `box-shadow` amber glow + slight scale

**Image 3** (cat ramen ukiyo-e) used as a decorative floating element, bottom-right of section, with float animation.

**Framer:** `staggerChildren: 0.1` on card container, cards slide up on scroll entry.

---

### 4.6 Atmosphere Section (`components/sections/AtmosphereSection.tsx`)

**Design:** Horizontal scroll gallery (Lenis + drag) or masonry grid.

**Images:** Images 1, 2, 4 in varied sizes and slight rotations.

**Image 2** (minimalist illustration with red sun) displayed large, full-width at section entry with a slow zoom-out effect (`scale: 1.15 → 1` on scroll).

**Caption typography:** White on dark, Zen Mincho italic, bottom-left corner of each image.

---

### 4.7 Location Section (`components/sections/LocationSection.tsx`)

**Design:** Split section. Left = dark with info. Right = styled map embed or illustrated map.

**Info block:**
```
営業時間 (Hours)
月〜金: 8:00 - 22:00
土・日: 9:00 - 23:00

住所 (Address)
東京都台東区浅草X-X-X

電話 (Phone)
03-XXXX-XXXX
```

**Steam Effect:** 3 CSS `<SteamEffect>` wisps rising from a drawn cup SVG above the hours block.

---

### 4.8 Footer (`components/layout/Footer.tsx`)

**Design:** `bg-coal`, thin amber top border. Three-column grid.

**Column 1:** Logo + tagline
**Column 2:** Quick links (same as nav)
**Column 3:** Footer legal links

```
利用規約 (Terms of Use)     → opens <TermsModal>
プライバシーポリシー (Privacy Policy) → opens <PrivacyModal>
```

**Modals:** Radix `<Dialog>` with Framer Motion enter/exit animation. Scrollable content. Japanese legal boilerplate text. Close button styled as `×` in top-right.

**Bottom bar:** `© 2024 ふじ電カフェ. All rights reserved.`

---

### 4.9 About Page (`app/about/page.tsx`)

**Hero:** Image 2 (minimalist illustration) as full-bleed header with text overlay.
Headline: `"私たちについて"` — ink-reveal animation.

**Story Section:**
- Timeline of café history (昭和 → 現代) using a vertical line with ink-dot markers
- Each era: year label (amber) + 2-sentence description
- Framer: each timeline item fades in on scroll with stagger

**Team Section:** 3 "staff cards" — washi paper bg, role in Japanese, brief intro. No real photos — use stylized CSS avatar placeholders with ukiyo-e-inspired color fills.

**Values Section:** 3 pillars displayed as large kanji with English subtitle and description:
- `誠` — Sincerity
- `和` — Harmony  
- `匠` — Craftsmanship

Each kanji has ink-brush stroke reveal animation using SVG mask.

---

### 4.10 Contact Page (`app/contact/page.tsx`)

**Design:** Full-page dark layout. Left side: large Image 1 (storefront) parallax column. Right side: form.

**Form fields (Japanese labels):**
- お名前 (Name)
- メールアドレス (Email)
- お電話番号 (Phone) — optional
- お問い合わせ内容 (Message) — textarea
- 送信する (Submit) button — amber, full-width on mobile

**Styling:** Input fields have `border-b border-amber/30` underline style only (no boxes). Focus state: amber glow + line expands. Very editorial/Japanese magazine feel.

**Submit:** Client-side validation with inline error messages in Japanese. On success: animated checkmark + `"お問い合わせありがとうございます"` message.

---

## 5. Animation & Effects System

### Framer Motion Variants (define in `lib/animations.ts`)

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

export const inkReveal = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] } }
}

export const bloomIn = {
  initial: { opacity: 0, filter: 'brightness(4) blur(40px)' },
  animate: { opacity: 1, filter: 'brightness(1) blur(0px)',
    transition: { duration: 2.4, ease: [0.16, 1, 0.3, 1] } }
}

export const cardHover = {
  rest: { scale: 1, boxShadow: '0 0 0px rgba(212,134,58,0)' },
  hover: { scale: 1.02, boxShadow: '0 8px 40px rgba(212,134,58,0.3)',
    transition: { duration: 0.3 } }
}
```

### `useInView` Pattern
All section animations use:
```tsx
const ref = useRef(null)
const isInView = useInView(ref, { once: true, margin: '-10%' })
<motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
```

---

## 6. Custom Cursor (`components/layout/CustomCursor.tsx`)

```tsx
// Track mouse position with useMotionValue + useSpring (stiffness: 150, damping: 15)
// Two layers:
//   1. Small dot (8px, amber) — tight follow
//   2. Ring (32px, amber/30 border) — lagging spring follow
// On hover over links/buttons: ring expands to 48px, dot disappears (mix-blend-mode: difference)
// Hide default cursor: cursor: none on html
```

---

## 7. Scroll Progress Indicator

Vertical thin bar on right side of screen. Uses `useScroll` to animate height from `0% → 100%`. Styled with: `w-[2px] bg-amber/20`, fill is `bg-amber`. Small kanji `読` (reading) rotated 90° above the bar.

---

## 8. `LenisProvider` (`lib/lenis.tsx`)

```tsx
'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function LenisProvider({ children }) {
  const pathname = usePathname()
  
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [pathname])
  
  return <>{children}</>
}
```

---

## 9. Noise Overlay (`components/ui/NoiseOverlay.tsx`)

```tsx
// Fixed div, full screen, z-50, pointer-events-none
// background: url('/noise.png') repeat — generate a 200x200 noise PNG
// OR: use CSS filter: url(#noise) with inline SVG feTurbulence filter
// opacity: 0.04 — subtle grain without obscuring content
// mix-blend-mode: overlay
```

Inline SVG noise filter approach (no external file needed):
```tsx
<svg style={{ display: 'none' }}>
  <filter id="noise">
    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
</svg>
<div style={{ filter: 'url(#noise)', position: 'fixed', inset: 0, opacity: 0.04, zIndex: 50, pointerEvents: 'none', mixBlendMode: 'overlay' }} />
```

---

## 10. Steam Effect (`components/ui/SteamEffect.tsx`)

Pure CSS — 3 `<span>` elements:
```css
@keyframes steam {
  0%   { transform: translateY(0) scaleX(1); opacity: 0.6; }
  50%  { transform: translateY(-30px) scaleX(1.4); opacity: 0.3; }
  100% { transform: translateY(-60px) scaleX(0.8); opacity: 0; }
}
/* Each span: absolute, width 3px, height 20px, bg amber/40, border-radius full */
/* animation-delay: 0s, 0.3s, 0.6s respectively */
/* animation-duration: 2s, infinite */
```

---

## 11. Terms & Privacy Modals

Using Radix Dialog + Framer Motion overlay:

```tsx
// Overlay: bg-coal/80 backdrop-blur-sm — fade in
// Panel: bg-ink border border-amber/20 rounded-2xl max-w-2xl max-h-[80vh] overflow-y-auto
// Entry animation: scale(0.95) → scale(1) + opacity 0 → 1
// Japanese content with proper heading hierarchy
// Close: X button top-right, amber color
```

**Terms of Use (利用規約):** Standard sections — サービスの利用, 禁止事項, 免責事項, etc.
**Privacy Policy (プライバシーポリシー):** 個人情報の収集, 利用目的, 第三者提供, お問い合わせ, etc.

---

## 12. Color & Typography Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--coal` | `#0d0e0f` | Primary background |
| `--ink` | `#1a1410` | Card/section bg |
| `--washi` | `#f5efe6` | Light section bg |
| `--amber` | `#d4863a` | Accent, CTA, highlights |
| `--neon` | `#ff4d5a` | Danger, price emphasis |
| `--mist` | `#8ba3a8` | Secondary text |
| `--white` | `#faf8f5` | Primary text on dark |

| Role | Font | Weight |
|------|------|--------|
| Display / Headlines | Zen Old Mincho | 700–900 |
| Body | Noto Sans JP | 300–400 |
| Labels / Caps | Noto Sans JP | 500 |
| Accent numbers | Zen Old Mincho | 400 |

---

## 13. Responsive Breakpoints

- Mobile (`< 768px`): Single column, reduced font sizes, tap-friendly CTAs, no custom cursor
- Tablet (`768–1024px`): 2-col grids, compressed hero text
- Desktop (`> 1024px`): Full layout, custom cursor active, horizontal scroll gallery enabled

---

## 14. Performance Notes

- All images: use `next/image` with `priority` on hero, lazy on rest
- `RainCanvas`: use `requestAnimationFrame` with `cancelAnimationFrame` cleanup
- Framer Motion: use `LazyMotion` + `domAnimation` features to reduce bundle
- Fonts: `display: 'swap'` on all
- `'use client'` only on interactive components; layout sections can be server components

---

## 15. Page Routes Summary

| Route | Component | Japanese Title |
|-------|-----------|----------------|
| `/` | `app/page.tsx` | ホーム |
| `/about` | `app/about/page.tsx` | 私たちについて |
| `/contact` | `app/contact/page.tsx` | お問い合わせ |
| `#terms` | `<TermsModal>` in footer | 利用規約 |
| `#privacy` | `<PrivacyModal>` in footer | プライバシーポリシー |

---

## 16. Implementation Order (Recommended)

1. Project setup + Tailwind config + font loading
2. `globals.css` — base styles, CSS variables, keyframes
3. `LenisProvider` + root `layout.tsx`
4. `NoiseOverlay` + `CustomCursor` (mount in layout)
5. `Navbar` + `Footer` + modal shells
6. **HeroSection** — this is the highest-priority visual; nail the bloom + rain + parallax
7. `ConceptSection` → `MenuSection` → `AtmosphereSection` → `LocationSection`
8. Home `page.tsx` — compose all sections
9. `/about` page
10. `/contact` page
11. Terms + Privacy modal content
12. Polish: timing refinements, mobile testing, performance audit

---

*End of implementation plan. Give this document to your AI and instruct it to implement each section in the order listed above, referencing the animation variants and component structure as specified.*
