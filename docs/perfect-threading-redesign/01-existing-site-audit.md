# Existing site audit

Inspected on 2026-10-11 from the GitHub repository at commit 22337852f406935ec43bfe824dc11821265ff237. README is stale and claims Next.js 14/App Router; actual package is Next.js 15.3.3, React 19, Tailwind 4, TypeScript, Framer Motion 12, Pages Router.

## Route inventory
- /: homepage hero, four popular services, three customer testimonials, three blog previews, final booking action.
- /about: salon story and quote, blog link, three different testimonials, final booking action.
- /services: five categories and 56 service entries. Previously exposed one category at a time behind state.
- /booking: four booking category cards. Men's Haircut uses external Calendly through router.push; the other three instruct visitors to call 973-341-5970.
- /contact: street address, phone, email, Instagram handle, directions and Google Maps iframe.
- /blog: three approved article teasers.
- /blog/facial-guide: complete facial article with process and benefits lists and contact sidebar.
- /blog/threading-guide: full threading article with a benefits list and contact sidebar.
- /blog/waxing-guide: full waxing article with a benefits list and contact sidebar.

## Booking baseline
The services array includes a Calendly URL for all categories, but only Men's Haircut actually invokes it. Other categories render a phone message and telephone link. A separate Calendly component exists but is not referenced by these page components. Link destination: https://calendly.com/pvparekh14/perfect-threading-appointment. No appointment was created.

## Business information
Contact page retains 235 Parsippany Rd, Parsippany NJ 07054; 973-341-5970; salon@gmail.com; @perfecthairandbeautysalon. Footer uses a differently formatted version of the same number and partial address. Existing Instagram footer link is a placeholder (#). Both values are retained pending owner confirmation.

## Content inconsistencies (preserve both)
Homepage: Eyebrow Threading $10. Services: Eyebrow $9. They are differently labeled and priced; do not harmonize without owner instruction.

## Technical findings
- Header.tsx and ServiceCards.tsx exist, but Layout imports Navbar and Footer.
- Existing nav was desktop-only with nested redundant wrappers.
- Many pages relied on identical card/shadow/rose-gradient section patterns.
- Original globals included automatic dark-mode colors despite predominantly light Tailwind sections.
- Old image props use deprecated layout and objectFit forms in several pages.
- Existing Next.js config ignores ESLint errors during build.
- Original package script uses next lint, which may be unsupported in installed Next 15 tooling; addressed on branch.
- Asset files: facial.jpg (27 KB), haircut.jpg (19 KB), pf-ss.jpg.png (132 KB), pompadour-haircut-silhouette-free-men-hair-cut-trendy-stylish-male-hairstyle-silhouette-free-vector.jpg (49 KB), threading.jpg (148 KB), waxing.jpg (25 KB), waxing2.jpg (37 KB), waxing3.jpg (383 KB). Asset dimensions and licensing were NOT established.
- Other files: favicon.ico, template SVGs, tsconfig, package-lock, and API hello example.

## Access and testing limits
The live site could not be fetched by available external web retrieval. Repository source was inspected, but browser screenshots and viewport interactions were not available. Existing Vercel project has preview SSO protection. Do not describe runtime interaction or visual outcomes as observed until tested.
