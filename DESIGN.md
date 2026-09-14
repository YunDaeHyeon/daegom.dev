---
name: daegom.dev
description: Personal portfolio for an iOS developer — minimal, trustworthy, honest.
colors:
  primary: "#1d1d1f"
  secondary: "#6e6e73"
  accent: "#0071e3"
  accent-foreground: "#ffffff"
  background: "#fbfbfd"
  card: "#ffffff"
  muted: "#f5f5f7"
  border: "#d2d2d7"
  background-dark: "#1c1c1e"
  card-dark: "#2c2c2e"
  muted-dark: "#232325"
  border-dark: "#38383a"
  primary-dark: "#f5f5f7"
  secondary-dark: "#98989d"
  accent-dark: "#2997ff"
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, Inter, \"Segoe UI\", Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, Inter, \"Segoe UI\", Roboto, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    letterSpacing: "0.06em"
rounded:
  sm: "6px"
  md: "8px"
spacing:
  gutter: "24px"
  gutter-lg: "32px"
  section-y: "64px"
  section-y-lg: "96px"
  row-y: "24px"
components:
  profile-photo:
    backgroundColor: "{colors.muted}"
    rounded: "{rounded.md}"
    width: "260px"
    height: "250px"
  tag:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  status-label:
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
  nav-link:
    textColor: "{colors.primary}"
    typography: "{typography.body}"
---

# Design System: daegom.dev

## Overview

**Creative North Star: "The Engineering Log"**

The site reads like a well-kept engineering log, not a portfolio trying to sell itself: neutral ground, one functional accent, and typography that never editorializes. Minimalism & Swiss Style supplies the discipline — grid-based, high-contrast, no decoration for its own sake — rendered in an Apple-system register (the same near-black/near-white/system-blue vocabulary as macOS and iOS) because the subject is an iOS developer and the tone the brief asked for is Notion/Linear-adjacent trust, not startup marketing energy.

The system exists to let honest content stand without visual apology. A discontinued project and a shipped one carry identical typographic weight; the only thing that changes is a small mono status word. Nothing on the page is allowed to argue that a failure was actually fine, or that a shipped project was more impressive than it was — the type system has no mechanism for emphasis-as-persuasion, only emphasis-as-hierarchy.

**Key Characteristics:**
- Neutral-plus-one-accent color strategy; the accent (`#0071e3` / `#2997ff` dark) appears only on interactive text, never as decoration.
- Two-font system: Inter (via the `-apple-system` stack) for everything read as prose or UI, JetBrains Mono reserved for data — dates, stack tags, status words.
- Flat at rest. Hairline 1px dividers carry structure; no shadows, no gradients, no glass.
- Dark mode follows `prefers-color-scheme` with a toned dark ground (`#1c1c1e`), never pure black.

## Colors

Neutral-dominant palette with a single functional blue accent; the palette is intentionally near-identical to Apple's own system grays and system blue.

### Primary
- **Ink** (`#1d1d1f` / dark: `#f5f5f7`): headings and primary body text.

### Secondary
- **Graphite** (`#6e6e73` / dark: `#98989d`): secondary text, captions, dates, tags, status words. Verified ≥4.5:1 contrast against both background values.

### Accent
- **System Blue** (`#0071e3` / dark: `#2997ff`): links and interactive text only. Verified 4.5:1 (light) and 5.6:1 (dark) contrast against background.

### Neutral
- **Paper** (`#fbfbfd` / dark: `#1c1c1e`): page background. Dark mode is a toned charcoal, never `#000000`.
- **Surface** (`#ffffff` / dark: `#2c2c2e`): card/raised-content background.
- **Wash** (`#f5f5f7` / dark: `#232325`): tag/chip fill, subtle section backgrounds.
- **Hairline** (`#d2d2d7` / dark: `#38383a`): all dividers and borders.

### Named Rules
**The One Accent Rule.** System Blue is the only saturated color on the page and it is reserved for things you can click. It never fills a background, never decorates a card, never marks status.

**The No-Verdict Rule.** Status words (shipped / paused / discontinued / in progress) are always set in Graphite, never in a destructive or success color. Status is information, not a judgment — see [[decisions-tone]] in PRODUCT.md.

## Typography

**Display/Body Font:** Inter, with `-apple-system, BlinkMacSystemFont` given priority in the stack so Apple devices render native SF Pro; Inter is the web fallback for everyone else.
**Label/Mono Font:** JetBrains Mono, with `ui-monospace, SFMono-Regular, Menlo` as system fallback.

**Character:** A single confident sans for everything that reads as language, and a small, quiet mono for everything that reads as data. The pairing should feel like a well-made developer tool, not a design portfolio.

### Hierarchy
- **Display** (600, clamp(2.25rem, 4vw, 3rem), 1.15 line-height, -0.02em tracking): page-level name/section headings (h1).
- **Title** (600, 1rem–1.5rem): page and section headings (h1/h2 on Work, Decisions).
- **Body** (400, 1rem–1.125rem, 1.5–1.75 line-height, max 65ch): paragraphs and descriptions.
- **Label** (500, 0.6875rem, 0.06em tracking, uppercase): status words, mono metadata (dates, stack tags).

### Named Rules
**The Data-Is-Mono Rule.** JetBrains Mono is used only for actual data — dates, status, stack names — never as a decorative "technical" costume on prose.

**The Latin-Mono Rule.** JetBrains Mono only ever renders Latin/ASCII data (dates, `SwiftUI`, `SHIPPED`). Any label mixing Hangul — the name/role line, prose — uses the sans stack instead: the mono font has no Hangul glyphs and silently falls back mid-string, breaking the fixed-width rhythm and mixing two typefaces in one line.

## Layout

12-column conceptual grid inside a 1200px max-width container, with 24px side gutters below the `sm` breakpoint and 32px above it. Content is list-first rather than card-first: Work and Decisions render as single-column row lists (title / meta / summary), each row separated by a 1px hairline, rather than a grid of boxed cards — this reads closer to a Notion database or Linear issue list than a marketing showcase.

Vertical rhythm: page sections use 64px top padding on mobile, 96px on `sm` and up; list rows use 24–28px vertical padding; body copy is capped at 65ch for reading comfort.

### One-page structure

Home, Work, and Decisions are sections of a single scrollable page (`id="top"`, `id="work"`, `id="decisions"`), not separate routes — this is a portfolio introducing one person, and the brief called for it to read as one continuous, self-introducing scroll rather than a multi-page site. `/work` and `/decisions` still resolve (redirecting to `/#work` / `/#decisions`) so old links don't break.

### Named Rules
**The Continuous Scroll Rule.** Home → Work → Decisions is one scroll, not three destinations. Nav links move the reading position within the page (`<a href="#section">`), they never navigate to a new document.

Each section is at least one viewport tall (`min-h-dvh`) with `scroll-margin-top` matching the sticky header's height, so a nav click settles the section cleanly below the header rather than partially behind it. `scroll-behavior: smooth` (disabled under `prefers-reduced-motion`) animates that jump. Scroll-snap was tried and removed — it fought ordinary scrolling and felt uncomfortable rather than assistive; free scrolling plus the smooth anchor-jump on click is the deliberate choice.

## Elevation & Depth

Flat by design. No shadows anywhere in the current build — depth and grouping are carried entirely by the hairline border/divider system and background-tone steps (Paper → Surface → Wash). This is a deliberate reading of Minimalism & Swiss Style: structure through line and tone, not through simulated lighting.

### Named Rules
**The Flat-at-Rest Rule.** Surfaces do not cast shadows. If a future interactive surface (a modal, a dropdown) needs separation, that is the first legitimate use of a shadow in this system — introduce one shadow token then, not before.

## Shapes

Corners are gently rounded, never sharp and never pill-shaped: 6px on small elements (tags), 8px on any larger surface. Straight hairline dividers (1px, Hairline color) do the structural work that borders/boxes would otherwise do.

## Components

### Navigation
- Sticky (`position: sticky; top: 0`) so it stays reachable while scrolling through the one-page structure; opaque `background` so content doesn't show through underneath it.
- Site name set in mono, left-aligned, links to `#top`; primary links (Home / Work / Decisions) in body type, right-aligned, each an in-page anchor (`#top` / `#work` / `#decisions`), never a route change.
- Unbuilt sections (About / Lab / Writing) render as non-interactive, 50%-opacity text — present in the structure, not yet a dead link — and are hidden below the `sm` breakpoint to keep the mobile header to the working links only.
- No active-state treatment yet (no section currently highlights itself in nav as it scrolls into view); add one (scroll-spy) if the page grows more sections.

### Status Label
- Mono, 11px, uppercase, 0.06em tracking, Graphite/Secondary color always — see The No-Verdict Rule. No background, no icon.

### Tag (stack/tech chip)
- **Shape:** 6px radius.
- **Fill:** Wash background, Secondary text, mono 11px.
- No border, no hover state (informational, not interactive).

### Profile Photo
- **Shape:** Portrait 4:5, max 260px wide, 8px radius, 1px Hairline border, `object-fit: cover` (never stretched).
- **Source:** `public/photos/profile.jpg`, served through `next/image` for automatic responsive sizing/format.
- **Position:** shares an intrinsic `flex flex-wrap` row with the hero text, not a viewport-breakpoint switch. The text column has `min-w-[280px]` and the photo is `shrink-0`, so the photo drops to its own line exactly when the row can no longer hold both without the `gap-10` (40px) collapsing below it — a real available-space threshold rather than a fixed screen size, and the reason a very wide external monitor and a middling tablet can both be "wrapped" or "side-by-side" correctly.

### List Row (Work / Decisions)
- **Border:** 1px Hairline top-divider between rows (`divide-y`), no border on the row itself.
- **Content:** title (Title weight) + mono meta (date/period, right-aligned) on one line at `sm` and up, stacking on mobile; body-colored one-line summary below; optional tag row.
- **Internal Padding:** 24px vertical (28px at `sm`).

## Do's and Don'ts

### Do:
- **Do** keep status words in Secondary/Graphite regardless of what the status is.
- **Do** reserve System Blue for actual links and interactive text.
- **Do** use JetBrains Mono only for dates, stack names, and status — real data, never decoration.
- **Do** let discontinued/paused entries share the exact same row styling as shipped ones.

### Don't:
- **Don't** introduce a shadow, gradient, or glass effect — the system is flat by rule, not by omission.
- **Don't** color status labels red/green/amber, or otherwise visually rank projects or contributions.
- **Don't** use emoji as icons; use inline SVG (Heroicons/Lucide) if an icon is ever needed.
- **Don't** wrap Work/Decisions items in bordered card boxes — the list-row pattern is the system's native container for repeated content.
