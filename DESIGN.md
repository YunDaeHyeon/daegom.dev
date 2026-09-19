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
  secondary-dark: "#b4b4b9"
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
- **Graphite** (`#6e6e73` / dark: `#b4b4b9`): captions, dates, tags, status words, and other glanceable metadata — not the running body copy itself. Verified ≥4.5:1 contrast against both background values (dark: ~8.2:1). The dark value was lightened from an earlier `#98989d` (~5.9:1) after real-user feedback that long-form reading (Lab post bodies, project/decision summaries, detail-page bullets) in dim gray-on-black caused eye strain; those surfaces were also moved from Graphite to Ink so only truly secondary/glanceable text stays dimmed.

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

Home, Work, Decisions, About, and Lab are sections of a single scrollable page (`id="top"`, `id="work"`, `id="decisions"`, `id="about"`, `id="lab"`), not separate routes — this is a portfolio introducing one person, and the brief called for it to read as one continuous, self-introducing scroll rather than a multi-page site. `/work` and `/decisions` still resolve (redirecting to `/#work` / `/#decisions`) so old links don't break. Writing is the one nav item left unbuilt; it stays disabled until it has a section to point to.

Individual Work and Decision items break this rule on purpose: each has its own detail page at `/work/<slug>` and `/decisions/<slug>`, reached by clicking a list-row title. The one-page rule governs the top-level destinations a nav click can reach, not the content one level below them — a title click is a deliberate "go deeper," not primary navigation.

### Named Rules
**The Continuous Scroll Rule.** Home → Work → Decisions → About → Lab is one scroll, not five destinations. Nav links move the reading position within the page (`<a href="#section">`), they never navigate to a new document.

Each section carries `scroll-margin-top` matching the sticky header's height, so a nav click settles the section cleanly below the header rather than partially behind it. `scroll-behavior: smooth` (disabled under `prefers-reduced-motion`) animates that jump. Scroll-snap was tried and removed — it fought ordinary scrolling and felt uncomfortable rather than assistive; free scrolling plus the smooth anchor-jump on click is the deliberate choice.

Only the hero (`#top`) forces `min-h-dvh`, for a deliberate full-viewport first impression. Content sections (Projects, About, Lab) size to their own content plus the documented `section-y`/`section-y-lg` padding instead — an earlier version forced `min-h-dvh` on every section, but on tall viewports it left content-light sections (About) swimming in empty space with no relationship to how much they actually had to show; direct user feedback reversed it.

## Elevation & Depth

Flat at rest. Every static surface still carries depth and grouping entirely through the hairline border/divider system and background-tone steps (Paper → Surface → Wash) — a deliberate reading of Minimalism & Swiss Style: structure through line and tone, not simulated lighting. The one exception is the Modal (Components), which floats over dimmed content and earns the system's only shadow token, `--shadow-modal` (`0 20px 60px rgba(0,0,0,0.15)` light / `rgba(0,0,0,0.5)` dark).

### Shadow Vocabulary
- **Modal** (`shadow-modal`): the single floating-panel case. Nothing else in the system uses a shadow.

### Named Rules
**The Flat-at-Rest Rule.** Surfaces do not cast shadows at rest. A modal is the one surface that isn't at rest relative to the page — see The One-Shadow Exception under Components.

## Shapes

Corners are gently rounded, never sharp and never pill-shaped: 6px on small elements (tags), 8px on any larger surface. Straight hairline dividers (1px, Hairline color) do the structural work that borders/boxes would otherwise do.

## Components

### Favicon, Apple Touch Icon & Open Graph Image
- Generated at build/request time via `next/og` (`app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`) rather than static image files — the design (Ink background, Paper "D" monogram / name+tagline) stays code, tied to the same tokens as the rest of the system instead of drifting as a separately-exported asset.
- **Font exception:** these three generators load `lib/fonts/noto-sans-kr-bold-subset.ttf` (a minimal Noto Sans KR subset, glyphs limited to the exact strings rendered) instead of Inter/JetBrains Mono. Both site fonts lack Hangul glyphs — the same reason behind The Latin-Mono Rule — and this is a narrow, code-documented exception (`.impeccable/config.json` ignoreValues) rather than a real typography-system change: these images are never part of the live DOM.
- `metadataBase` is set to `https://daegom.dev` in `app/layout.tsx` so the generated `og:image`/`twitter:image` tags resolve to absolute production URLs.

### Navigation
- Sticky (`position: sticky; top: 0`) so it stays reachable while scrolling through the one-page structure; opaque `background` so content doesn't show through underneath it.
- Site name set in mono, `shrink-0`, links to `#top`; primary links (Home / Work / Decisions / About / Lab) in body type, each an in-page anchor, never a route change.
- Unbuilt sections (currently just Writing) render as non-interactive, 50%-opacity text — present in the structure, not yet a dead link — and are hidden below the `sm` breakpoint.
- **The link row itself is `min-w-0` + `overflow-x-auto`, pushed right with `ml-auto` rather than the row's `justify-between`.** As sections were added the label row stopped fitting some narrow widths; without `min-w-0` a flex child won't shrink below its content's natural width, so it pushed the whole header (and page) wider instead of wrapping or scrolling. `min-w-0` lets it shrink, `overflow-x-auto` gives it an internal scroll instead of a page-level one — the nav scrolls in place before anything breaks layout.
- No active-state treatment yet (no section currently highlights itself in nav as it scrolls into view); add one (scroll-spy) if the page grows more sections.

### About
- Flat sections in one column, matching the List Row idiom used elsewhere: 학력/경력/활동 as row lists (org/school + role/major on the left, mono period on the right, an optional muted note line beneath for 활동); 자격증/수상/멘토링 활동 as plain `DetailSections` bullet lists (see The Itemized-Detail Rule — this is the same component Work/Decision detail pages use, reused here because the content shape — flat, factual, dated — is identical).
- **Contact** no longer lives in About: email and GitHub sit in the Home hero under the primary "프로젝트 보기" CTA as pill badges (`ContactBadge`) — the same outline-pill shape as the App Store `BadgeLink` on Projects, each with a drawn `currentColor` icon (envelope / GitHub mark). The email badge keeps the literal address as its label so it stays copyable when `mailto:` has no mail client to open. About now ends after 자격증/수상/멘토링 and comes last in the scroll (Home → Projects → Lab → About).
- No resume link renders until a real one exists; an empty/placeholder link is worse than no link.

### Lab
- Structurally identical section shell (heading + one-line description) with no content yet — an honest "not ready to show" note, not a fabricated placeholder project. Replace the line, don't add fake entries, once real experiments exist.

### Status Label
- Mono, 11px, uppercase, 0.06em tracking, Graphite/Secondary color always — see The No-Verdict Rule. No background, no icon.

### Tag (stack/tech chip)
- **Shape:** 6px radius.
- **Fill:** Wash background, Secondary text, mono 11px.
- No border, no hover state (informational, not interactive).

### Profile Photo
- **Shape:** Portrait 4:5, max 260px wide, 8px radius, 1px Hairline border, `object-fit: cover` (never stretched).
- **Source:** `public/photos/profile-id.jpg`, served through `next/image` for automatic responsive sizing/format. The filename is deliberately versioned: `next/image` responses are cached by URL for 4h (`max-age=14400`), so replacing the photo under the same name leaves returning visitors on the old one. Rename the file whenever the photo changes.
- **Position:** shares an intrinsic `flex flex-wrap justify-between` row with the hero text, not a viewport-breakpoint switch. The text column (`min-w-[280px] max-w-[65ch] flex-1`) grows to its natural reading width when there's room and `justify-between` pushes the photo toward the row's right edge rather than gluing it to the text; below the wrap point the photo is `shrink-0` and drops to its own line exactly when the row can no longer hold both without the `gap-10` (40px) floor collapsing — a real available-space threshold rather than a fixed screen size.

### List Row (Work / Decisions)
- **Border:** 1px Hairline top-divider between rows (`divide-y`), no border on the row itself.
- **Content:** title (Title weight) + mono meta (date/period, right-aligned) on one line at `sm` and up, stacking on mobile; body-colored one-line summary below; optional tag row.
- **Internal Padding:** 24px vertical (28px at `sm`).
- **Title:** links to the item's detail page (`/work/<slug>`, `/decisions/<slug>`). Underline is transparent at rest, Hairline on hover — present but quiet, matching the system's restraint around decoration.
- **App icon (Work only, optional):** a 20px (list) / 32px (detail page) `rounded-sm` image immediately before the title, only when the project actually has a real app/product icon (`WorkItem.icon`) — `alt=""` since the adjacent title already names it. This is real artifact, not decoration: never a generic folder/category icon standing in for a project without one.

### Detail Page (Work / Decisions)
- Reached only by clicking a list-row title — never a route a visitor lands on directly from a nav link.
- **Structure:** title → meta (period, or date + Status Label) → one-line summary (same copy as the list) → stack tags / links row (Work) or links row (Decisions) → itemized sections → related cross-links.
- **Itemized sections (Named Rule below) replace narrative paragraphs here.** Each section is a plain-text heading (e.g. "담당한 기능", "시도한 것", "판단과 발견") followed by a flat bullet list — terse, concrete, one fact per line, never a flowing story paragraph.
- **Cross-links:** a Work item lists its `관련 Decisions`; a Decision lists its `관련 프로젝트` — plain underlined text links between the two content types, no card treatment.
- **Presentation:** a Notion-card-style modal overlay when reached by clicking within the site (an intercepted route — the URL still updates, so it's shareable and the browser back button closes it); the same content renders as a full page with a `← Work` / `← Decisions` back-link when the URL is opened directly (a shared link, a hard refresh). One content component (`WorkDetailContent` / `DecisionDetailContent`) backs both presentations — only the wrapper differs.

### Modal
- **Chrome:** centered panel, `max-w-2xl`, 8px radius, 1px Hairline border, `shadow-modal` (the system's first and only shadow token — see The Flat-at-Rest Rule's exception below). Backdrop is 50%-opacity black regardless of theme.
- **Dismissal:** click the backdrop, press Escape, click the small × in the top-right corner, or use the browser's back button — all equivalent, all resolve to `router.back()`.
- **Never** a route the modal is the only way to reach; every modal route has a full-page equivalent for direct links.

### Named Rules
**The Itemized-Detail Rule.** Detail-page content is bulleted facts under plain headings, not narrative prose. A bullet reads as "did X" or "found Y," not as a sentence building toward a moral. This is a deliberate departure from earlier narrative-paragraph drafts — bullets scan faster and resist embellishment better than a story arc does.

**The One-Shadow Exception.** The Flat-at-Rest Rule (Elevation & Depth) anticipated exactly this: a modal is the system's first legitimate use of a shadow, because a floating panel over dimmed content needs the separation a border alone can't give it at this scale. No other component earns a shadow by this precedent.

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
