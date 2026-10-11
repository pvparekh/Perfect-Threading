# Quality assurance ledger

Updated: 2026-10-11.

## Verified successful automation

**GitHub Actions:** [Run 38179095351](https://github.com/pvparekh/Perfect-Threading/actions/runs/38179095351) succeeded on implementation commit `9f9c71979d0d659935848020318872c49c9be11c`.

- npm ci: passed.
- `npm run verify:content`: passed. Source lock guarantees original business copy in unchanged public pages and identical homepage visible heading; all five ordered service datasets contain the exact 56 original name/price pairs.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed.
- Chromium route/viewport smoke: **99 of 99 route-viewport combinations** executed for nine routes at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560 and 3440 CSS pixels.
- Script detected **zero failures, zero warnings and zero axe-core accessibility violations** in configured scans.
- All 56 services were matched against approved content in rendered UI at five widths; price/name nonoverlap, category anchors, phone/contact directions and booking control counts validated.
- Mobile navigation click, Escape, aria state, and navigation to Services passed.
- No reported horizontal document overflow, clipped h1 bounds or JavaScript page errors in the scripted scenarios.
- Screenshots for representative pages and widths have been generated and reviewed; source artifact at [the QA run artifacts](https://github.com/pvparekh/Perfect-Threading/actions/runs/38179095351).

## Findings fixed during review

- Replaced the homepage staggered-per-letter heading presentation while retaining approved heading text.
- Corrected decorative service monogram contrast.
- Corrected active Booking navigation contrast.
- Made the existing Contact us link on booking visibly underlined.
- Made mobile menu Escape/state and navigation checks deterministic.
- Widened visual compositions on ultrawide viewports while constraining readable text.
- Improved screenshot capture to load lazy images before full-page screenshots.

## Observations and remaining limitations

- The actual Google Maps iframe appears as a blank external region in GitHub-hosted headless Chromium screenshots. The original iframe URL, directions link, contact information and code remain unchanged. This is **not proof** the live map is broken; it still requires testing from an ordinary browser with unrestricted Google access.
- Vercel manual preview creation and deployment listing returned **403 Forbidden** for the connected `pvparekhs-projects` team scope. This was not a build error, and no preview deployment is verified.
- GitHub CI validates a locally served production build, not a deployment of this branch to Vercel.
- No real appointment was created. Existing Calendly URL and three telephone booking routes were statically confirmed and their rendered controls counted; actual external interaction in a normal browser requires final human QA.
- No real-user Core Web Vitals field data, lab Lighthouse performance measurements, complete screen-reader audit, or proof of WCAG 2.2 AA compliance exists yet. Axe passes are supporting evidence, not full certification.
- Image usage rights and suitability for a permanent public hero remain owner-dependent, although all assets were already present in the original repository.
- Existing owner-approved differences, notably homepage $10 eyebrow threading vs service menu $9 eyebrow, remain unchanged.
- Placeholder Instagram footer destination remains unchanged pending owner confirmation.

## Release gate

The frontend redesign is implemented and its automated build, content preservation, navigation, responsive and basic accessibility gates are **passed**. **Production release is not approved** until a verifiable preview, owner review, external integrations, manual assistive-tech review and genuine production authorization. The PR remains draft and production `main` unchanged.
