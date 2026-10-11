# Design decision log

## D01: Art direction
Decision: warm modern beauty editorial with rose-plum/ivory palette.
Evidence: neighborhood salon needs approachability and straightforward service discovery, while beauty references support photography and editorial typography.
Alternatives: pure minimal luxury, repeated gradients and SaaS-style cards.
Tradeoff: fewer fashionable effects, stronger business authenticity.
Verification: screenshot review at 390, 1440 and 3440 widths, with 99 route-viewport checks.

## D02: Services directory
Decision: full catalogue visible with category anchor navigation, image-led introductions and restrained name/price rows.
Evidence: original tab state hid four of five categories by default.
Alternatives: tab-only filtering or 56 cards.
Tradeoff: long page, but category shortcuts reduce navigation friction.
Verification: original 56 name/price pairs compared with rendered service rows at five widths.

## D03: Booking remains unchanged
Decision: retain Men’s Haircut Calendly redirect and three telephone instructions, restyle surrounding interface only.
Evidence: original source invokes Calendly only for haircut although data objects mention a common URL.
Alternatives: expand Calendly routing or activate unused embed.
Tradeoff: mixed booking pathways remain, but no customer-facing promise is fabricated.
Verification: source inspection and rendered booking control/link tests; real external navigation still requires final live-browser confirmation.

## D04: Content preservation over rewriting
Decision: original seven article/about/booking/contact/blog source pages preserved byte-for-byte; homepage uses original text with an unchanged visible heading; services transformed only for presentation, exact source data preserved.
Evidence: owner explicitly approves all existing copy and claims.
Alternatives: individual React page copy refactors.
Tradeoff: some page architecture remains tied to original markup, but avoids accidental content changes.
Verification: source snapshot checks and browser-rendered service comparisons.

## D05: Technical SEO
Decision: Pages Router next/head, route-specific approved-copy metadata, canonical production domain, verified NAP BeautySalon structured data, sitemap and robots.
Evidence: Google local-business guidelines and repository's documented Vercel domain.
Tradeoff: future owner-approved metadata and Google Business Profile access might improve results.
Verification: build and source audit; external indexation and canonical crawler validation pending.

## D06: Accessibility and responsive refinement
Decision: high-contrast menu states, visible inline booking contact link, darker decorative monogram, keyboard-friendly navigation, restrained motion and expanded ultrawide editorial containers.
Evidence: 2026-10-11 Chromium screenshots and axe-core scans identified three distinct contrast/link issues, all resolved.
Tradeoff: simple accessible styles over subtle low-contrast editorial decorations.
Verification: GitHub Actions 38179095351 passed 99 viewport combinations and automated accessibility checks with no reported violations.

## D08: Motion as functional, optional polish
Decision: a short staged hero entrance (title, introduction, booking link and hero photograph), one-time intersection-based reveals for selected below-the-fold content, a subtle header scrolled state, and pointer-device hover microinteractions. Existing business copy and booking routes stay untouched.
Evidence: Motion's published intersection-observer approach and web.dev's guidance on respectful non-essential animation. Visual inspiration: Awwwards Goldust Spa interaction direction, interpreted conservatively rather than copied.
Alternatives rejected: persistent parallax, page-loading blocking splash screens, scroll hijacking, character-by-character headings, fake loading animations, and always-moving backgrounds.
Accessibility and performance: styles activate only after client hydration and leave server-rendered HTML visible; short transform/opacity based animations avoid layout shifts; only offscreen targets are hidden temporarily; single pooled IntersectionObserver, passive RAF-throttled scroll listener, once-only unobserve, route cleanup, touch hover disabled and prefers-reduced-motion bypass.
Verification: browser smoke includes 390/1440 entrance, observer scroll and scrolled header, reduced-motion, JS-disabled content availability, and original 56 service rows, in addition to all previous 99 route/viewport checks.
