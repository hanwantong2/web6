# Figma project package — Nexus

Everything in `deliverable/` is exported as SVG so it can be dropped straight into a Figma
file and turned into editable frames. The SVGs are 1 : 1 with the production sizes, so
pasting them into a 1440 × 1024 (or 375 × 812) frame keeps pixel-accurate layout.

## 1. Create the file

1. New Figma file → name it **Nexus — Web app design**.
2. Add pages, in this order (left panel → Pages):
   `00 Cover`, `01 Structure`, `02 Wireframes`, `03 UI Kit`, `04 Designs`,
   `05 Screens`, `06 Dark mode`, `07 Mobile`, `08 Onboarding`, `09 Banners`,
   `10 Promo site`.

## 2. Import each group

| Figma page | Drop these files | Frame to create first |
|---|---|---|
| 01 Structure | `deliverable/01-structure/*.svg` | free-size, 2100 × 1500 |
| 02 Wireframes | `deliverable/02-wireframes/desktop/*.svg` | 1440 × 1024 |
| 02 Wireframes | `deliverable/02-wireframes/mobile/*.svg` | 375 × 812 |
| 03 UI Kit | `deliverable/02-wireframes/ui-kit/ui-kit.svg` | 1920 × 2600 |
| 04 Designs | `deliverable/03-designs/desktop/*.svg` | 1440 × 1024 |
| 05 Screens | `deliverable/04-screens/desktop/*.svg` | 1440 × 1024 |
| 05 Screens | `deliverable/04-screens/mobile/*.svg` | 375 × 812 |
| 06 Dark mode | `deliverable/05-interactive/screens-dark/*.svg` | 1440 × 1024 |
| 06 Dark mode | `deliverable/05-interactive/mobile-dark/*.svg` | 375 × 812 |
| 07 Mobile | `deliverable/05-interactive/mobile-design/*.svg` | 375 × 812 |
| 08 Onboarding | `deliverable/03-designs/onboarding-desktop/*.svg` | 1920 × 1080 |
| 08 Onboarding | `deliverable/03-designs/onboarding-mobile/*.svg` | 375 × 812 |
| 08 Onboarding | `deliverable/05-interactive/gif/*.gif` | animated plugin: “GIF to frames” |
| 09 Banners | `deliverable/05-interactive/banners/*.svg` | 1920 × 600 |
| 10 Promo site | `deliverable/06-promo-site/ui-kit/*.svg`, `breakpoints/*.svg` | 1920 / 1440 / 1194 / 834 / 375 wide |

## 3. Turn the visuals into a component library

1. Select an atom on the **03 UI Kit** page (button, input, badge, avatar, icon).
2. `Ctrl + Alt + K` (Create component) → rename as
   `Button / Primary / Default`, `Input / Text / Focus`, `Badge / Status / Ok`, following
   `Category / Component / Variant`.
3. Add variants with `Add variant` and cover the state matrix from the UI Kit page:
   default · hover · focus · pressed · disabled · loading · error.
4. Group the screen-level sections (sidebar, top bar, panel, modal, toast) as separate
   components so screens can be re-assembled from the library.

## 4. Prototype & dark mode

1. Dark mode: select the frames on the **06 Dark mode** page → right panel →
   *Fill* → *Apply variable mode* → `Dark`. Keep the same names as the light frames so
   designers can swap modes on one frame.
2. Onboarding: on the **08 Onboarding** page, link the four frames with
   *Prototype → On click → Navigate to*, set *Smart animate* for the dots, then
   *Present* and record the GIF (`deliverable/05-interactive/gif/`).
3. Interactions that are hard to fake in Figma (drag & drop, count-up, toast
   auto-dismiss) are demonstrated in `deliverable/05-interactive/prototype/index.html`.

## 5. Naming rules

- Frames: `Area / Screen / State` → `Core / My Tasks / default`, `Core / My Tasks / empty`.
- Layers: rename the groups inside an imported SVG once, then reuse the file as the
  library source of truth.
- Colour and text styles: create *Local styles* from the token list on the UI Kit page
  (`colour/brand`, `text/h2`, `radius/lg`, `space/16`) before building new screens.
