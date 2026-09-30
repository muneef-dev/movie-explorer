# Responsive Layout Repair

## Goal

Preserve the existing visual design while making the search controls and movie-detail metadata comfortable and readable at the application's 320px minimum width.

## Audit Findings

- Desktop layout works without horizontal overflow. The full navigation, split hero, filters, and five-column movie grid display correctly.
- Tablet layout at 768px works without horizontal overflow. The navigation drawer, three-column grid, search controls, movie details, and favorites empty state display correctly.
- Mobile layout at 375px works without horizontal overflow. The two-column grid, drawer navigation, filters, and hero display correctly.
- Movie-detail metadata becomes compressed on narrow screens because all values remain in a single wrapping row.
- The search input and action buttons remain in one row at the 320px supported minimum, leaving too little room for useful input text.

## Design

### Search controls

Use a column layout below the Material UI `sm` breakpoint and retain the current row layout at `sm` and above. On phones, the input occupies the full width and the action group aligns to the right. The Search button remains clearly visible and the optional clear button stays beside it.

### Movie details metadata

Use a vertical metadata stack on phones with consistent spacing between rating, release date, runtime, and language. Restore the current wrapping row from the `sm` breakpoint upward.

### Verification

- Add focused component tests that assert the responsive style contract for the search form and details metadata.
- Run the full automated test suite and production build.
- Recheck the deployed or local application at desktop, 768px tablet, 375px mobile, and 320px minimum widths.
- Confirm no horizontal overflow, clipped controls, or browser console errors.

## Scope

- Do not redesign typography, colors, cards, navigation, or page structure.
- Do not change application data flow or behavior.
- Do not change tablet and desktop layouts beyond preserving their current responsive rules.

