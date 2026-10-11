# Immutable content baseline and regression protocol

This project treats 2026-10-11 main branch commit 22337852f406935ec43bfe824dc11821265ff237 as the approved baseline.

## Complete source snapshot
See approved-content-snapshot.json. It contains the complete original contents and Git blob SHAs for all nine public page files plus the original Navbar and Footer. The JSX and literals capture every article paragraph, list, price, testimonial, heading, contact string and call to action. It is intentional that the original strings, punctuation and capitalization remain intact, including existing em dashes.

Service entries from the extracted source: Threading 9; Waxing 18; Facials 13; Hair 13; Other 3. Total 56.

## Verification
Run node scripts/verify-content-preservation.mjs. It rejects any change to the eight non-service source pages and compares the complete ordered service-category and price inventory to the source snapshot. Shared Navbar and Footer must preserve recognizable business labels and values. Manual rendered-content comparison is also mandatory before final approval, because source text can exist without being visible.

## Unresolved owner questions, not edits
- Homepage Eyebrow Threading $10 vs menu Eyebrow $9.
- Email salon@gmail.com must not be silently replaced.
- Instagram footer href # is unverified; preserve until a real destination is approved.
- Do not expand Calendly to non-haircut services merely because the data lists a shared link.
