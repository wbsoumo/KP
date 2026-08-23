# Fix: homepage still shows the blank placeholder

## What's happening

The site itself is running fine (the server returns pages, no errors). The problem is that the home page was never built: `src/routes/index.tsx` still contains the default Lovable placeholder image, and the shared chrome (navigation, footer, starfield, planet cursor) is not wired into the root layout. So `/` looks empty even though `/work`, `/about`, `/creators` and `/contact` exist.

## What to build

1. **Root layout** (`src/routes/__root.tsx`)
   - Render `StarField`, `PlanetCursor`, `Nav`, the page `Outlet`, and `Footer` around every route.
   - Replace the default "Lovable App" title/description with Kreative Planet metadata.

2. **Home page** (`src/routes/index.tsx`) — replace the placeholder with the cosmic universe landing page:
   - Cinematic hero: "Kreative Planet — Creativity Without Gravity", founder line, magnetic CTAs to Contact and Work.
   - `#planets` section: the six creative planets (Ad, Film, Design, Social, Creator, Digital) in an orbital layout, each linking through to its detail/CTA — this is the anchor the nav and footer already point to.
   - Featured work strip pulling from the existing portfolio data, linking to `/work/$slug`.
   - Creator constellation teaser linking to `/creators`.
   - Closing contact band with the studio phone number and WhatsApp.
   - Route-specific `head()` metadata (title, description, og/twitter tags).

3. **Verification**
   - Load `/` in a browser check to confirm the hero, planets, work and footer all render, and that nav links and the `#planets` anchor work.

## Technical notes

- All content comes from the existing `src/lib/kp-data.ts`; no new data sources or backend needed.
- Reuse existing `Reveal`, `Magnetic`, `PlanetBody`, `SectionHeading`, `CtaLink` primitives from `src/components/kp/ui.tsx` — no new design tokens; colors stay on the existing cosmic tokens in `src/styles.css`.
- `StarField`/`PlanetCursor` are canvas/pointer components; mount them in the root layout only.
