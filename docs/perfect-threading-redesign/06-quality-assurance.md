# Quality assurance ledger

## Verified from repository source
- Main base commit recorded and separated development branch created.
- Source routes and original booking conditions inspected.
- All 56 service names and prices programmatically extracted before modifications.
- All original public route source files except the services view deliberately left intact.
- Sitemap lists nine existing public routes.

## Not verified
- No complete local dependency install, TypeScript build, lint, or Lighthouse score was run in the assistant environment.
- Browser screenshot review across 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560, and 3440 CSS widths remains outstanding.
- Manual menu keyboard, focus visibility, actual click-to-call, Maps iframe, browser-back, reduced-motion and Calendly runtime tests remain outstanding.
- Automated GitHub Actions build/lint run status must be reviewed if available.
- Vercel manual preview deployment call returned 403 forbidden for the selected project scope. This is an authorization blocker, not a code-build result.
- Production was not changed.

## Required final QA
1. Run npm ci, npm run typecheck, npm run lint, npm run build.
2. Run node scripts/verify-content-preservation.mjs.
3. Test all nine routes by direct load, refresh, navigation and back.
4. Test service index anchors and 56 fully readable price rows, including text zoom.
5. Test phone, Calendly, contact email, directions and map without placing an appointment.
6. Use real rendered screenshots at specified widths, inspect cropping and overlap, repair issues.
7. Perform automated axe/Lighthouse and separate keyboard and screen-reader reviews.
8. Check console errors, font/image network requests, hydration warnings, and focus state.
9. Distinguish real field Web Vitals from lab audit results.

## Acceptance status
INCOMPLETE pending deployment build and genuine browser QA. Do not merge to production.
