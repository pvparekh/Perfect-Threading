# Design decision log

## D01: Art direction
Decision: warm modern beauty editorial with rose-plum/ivory palette.
Evidence: local salon needs approachability and clear actions; beauty references reward strong typography and high-quality photos.
Alternatives: pure minimalist luxury, trendy gradient-card layouts.
Tradeoff: fewer fashionable effects, stronger practical identity.
Verification: actual home/mobile/ultrawide screenshot reviews.

## D02: Services directory
Decision: full expanded catalogue with top category anchors and restrained rows.
Evidence: original click-to-switch hides 4/5 of 56 items from immediate readers and possibly search crawlers.
Alternatives: tab-only filtering or large 56-card grid.
Tradeoff: longer page, but users can jump to category.
Verification: compare all 56 labels and prices, test anchors/mobile wrapping.

## D03: Booking remains unchanged
Decision: retain existing booking page source conditions and destinations; reskin rather than replace.
Evidence: original source only invokes Calendly for Men's Haircut.
Alternatives: inline embed for all services or replacing scheduling.
Tradeoff: split phone/Calendly route remains.
Verification: browser clickthrough without booking.

## D04: Content unchanged by design
Decision: leave eight approved public page files byte-identical; apply shared layout/CSS enhancements.
Evidence: business approves all existing copy including claims and punctuation.
Alternatives: rewrite JSX page by page.
Tradeoff: old markup limits composition beyond CSS; prioritize exact content preservation.
Verification: locked source manifest and rendered screenshots.

## D05: SEO additions
Decision: Pages Router Head metadata, verified local-business JSON-LD and existing URL sitemap.
Evidence: Google docs support verified NAP structured data; Vercel project lists perfect-threading.vercel.app as associated domain.
Alternatives: keyword-heavy new article and service copy.
Tradeoff: meta descriptions only use approved excerpts; opportunity for owner-approved richer metadata later.
Verification: inspect deployed head, valid JSON-LD, sitemap/robots, canonical URL.
