# Design system and reusable principles

Chosen direction: warm modern salon combined with contemporary editorial presentation. This outperforms pure minimal luxury for accessibility and business authenticity.

## Direction comparison
- Editorial beauty: distinctive photography and type, but can overwhelm practical service selection.
- Warm modern salon: approachable and clear, but risks becoming visually ordinary.
- Minimal luxury: disciplined, but can falsely imply upscale pricing and overprioritize whitespace.
- Selected hybrid: warm ivory backgrounds, burgundy/rose accents, blackened plum body text, editorial serif display and crisp sans-serif utility text. Customer paths remain obvious.

## Tokens
- Paper: #fbf7f3; ivory: #fffdfb; ink: #2c2326; muted: #6e5e62.
- Accent: #9c435a; darker interactive: #762c42; blush surface: #f0e0de; borders: #e6d8d4.
- Display: Georgia (system serif); body: Inter (self-hosted via existing dependency).
- Fluid major headings with bounded clamp() scaling, narrower text measure for articles, fluid horizontal gutters.
- Feedback transitions: ~200 to 250ms; editorial visual transitions: ~450ms where selective.
- Reduced-motion users receive nearly instant changes and non-smooth scrolling.

## Composition grammar
- Home: editorial split hero, open service menu with subtle numbering, testimonial columns, asymmetrically sized journal imagery, contrasting final call to action.
- Services: index/anchor navigation and five fully visible scrollable menu sections, editorial image/category separation.
- About: copy/story and typographic brand quote, then retained testimonials and calls to action.
- Booking: clear service images and exact current booking choices.
- Contact: textual NAP alongside a large location map.
- Blog: editorial directory and calm article reading grid.
- Footer: oversized typographic brand closure and clear navigation.

## Interaction rules
- Essential information is never hover-only. All links are semantic.
- No auto carousel, full-screen loaders, scroll hijacking, infinite ambient animation or fake activity.
- Menu exposes expanded/collapsed state; support Escape and route-change close.
- Preserve all original interactive destinations.
- Do not use unlicensed or fabricated salon imagery.

## Quality checkpoints
Before and after each page: check approved content, brand harmony, pricing visibility, keyboard navigation, motion restraint, image crop, mobile and ultrawide widths. Track limitations honestly.
