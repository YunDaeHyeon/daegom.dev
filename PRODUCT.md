# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (user's choice)

## Users

Hiring managers, technical recruiters, and engineering peers evaluating an iOS developer for roles or collaboration. *(Inferred from portfolio purpose — not separately confirmed; flag if wrong.)*

## Product Purpose

A personal portfolio for an iOS developer. It presents the developer's work, the reasoning behind past decisions, side experiments, and writing — honestly and without inflation, so a viewer can accurately judge the developer's actual contribution and thinking.

## Positioning

Honesty over impressiveness. Unlike typical portfolios that maximize perceived impact, this site:
- never claims "designed" or "led" unless that was literally true;
- never ranks teammates' contributions numerically;
- treats failed or discontinued projects as legitimate content rather than omitting them.

## Operating Context

Six top-level areas:
- **Home**
- **About** — includes a photo of the developer
- **Work** — shipped/current projects
- **Decisions** — the record of past technical/product decisions, including failed or discontinued projects; kept low-key on main/listing pages, full detail only on click-through
- **Lab** — experiments
- **Writing**

## Capabilities and Constraints

- Failed/discontinued projects live in Decisions as legitimate entries, not hidden — but summarized low-key wherever they surface outside their own detail page.
- Contribution language is factually gated: words like "designed" or "led" are used only when literally accurate for that project.
- No numeric or ranked attribution of teammates' contributions, anywhere on the site.

## Evidence on Hand

Delivered and live on the site:
- Name, role, and intro copy in the Home hero, plus a profile photo (currently placed in Home's hero since About doesn't exist as a page yet — move it there if/when About is built).
- 3 real Work entries (미러링부스, 절약학개론, DrPill) with actual scope, stack, and GitHub links.
- 4 real Decisions entries spanning shipped, in-progress, and one discontinued project, each with a real one-line summary and a longer `detail` field already captured in `app/page.tsx` but not yet rendered (reserved for a future per-item detail page).

Still not delivered: About page content beyond the photo, Lab, Writing. Do not fabricate project details, employers, dates, or outcomes for these — wait for real content.

## Product Principles

1. Honest over impressive — never overstate contribution or outcome.
2. Failure is legitimate content, not something to bury — but it stays low-key until a visitor chooses to go deeper.
3. Individual attribution only; no comparative or numeric ranking of collaborators.
4. Minimal, trustworthy presentation (Notion/Linear-like) over decorative or "designed to impress" visuals.
