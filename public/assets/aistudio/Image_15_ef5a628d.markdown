---
name: Civic Peer Response Interface
colors:
  surface: '#171400'
  surface-dim: '#171400'
  surface-bright: '#403a0e'
  surface-container-lowest: '#110e00'
  surface-container-low: '#201c00'
  surface-container: '#242000'
  surface-container-high: '#302a01'
  surface-container-highest: '#3b3509'
  on-surface: '#eee4a8'
  on-surface-variant: '#c6c5d2'
  inverse-surface: '#eee4a8'
  inverse-on-surface: '#363106'
  outline: '#90909c'
  outline-variant: '#454650'
  surface-tint: '#bcc3ff'
  primary: '#bcc3ff'
  on-primary: '#1e296f'
  primary-container: '#000b58'
  on-primary-container: '#727cc7'
  inverse-primary: '#4e59a0'
  secondary: '#a7c8ff'
  on-secondary: '#003060'
  secondary-container: '#214778'
  on-secondary-container: '#94b7ee'
  tertiary: '#84d4d0'
  on-tertiary: '#003735'
  tertiary-container: '#001d1c'
  on-tertiary-container: '#3b8e8b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dfe0ff'
  primary-fixed-dim: '#bcc3ff'
  on-primary-fixed: '#03105b'
  on-primary-fixed-variant: '#364087'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a7c8ff'
  on-secondary-fixed: '#001c3b'
  on-secondary-fixed-variant: '#214778'
  tertiary-fixed: '#a0f1ec'
  tertiary-fixed-dim: '#84d4d0'
  on-tertiary-fixed: '#00201f'
  on-tertiary-fixed-variant: '#00504d'
  background: '#171400'
  on-background: '#eee4a8'
  surface-variant: '#3b3509'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '800'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.04em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies the ethos of modern civic action and peer solidarity under the national ethos of *Bela Negara* ("Pahlawan Masa Kini"). Engineered specifically for rapid, disciplined mutual aid among university students, the interface guides students through peer de-escalation, rapid financial containment, and evidence logging within the critical 60-minute window of fraud or social engineering scams.

The visual style merges structured civic-tech utility with calm, tactical reassurance. It discards alarmist red alerts in favor of authoritative composure, grounding high-stress scenarios with steady, legible visual cues. The design direction relies on **Modern Civic High-Contrast**: deep institutional indigos and oceanic teals provide sovereign gravitas, paired with high-visibility cream indicators that anchor user focus without triggering panic. Interfaces must project immediate operational capability, legal fidelity, peer trust, and institutional readiness.

## Colors

The palette uses a deliberate 4-tier dark-foundation structure to maintain focus during critical incidents, prevent visual fatigue, and guarantee WCAG AAA contrast ratios across all critical surfaces.

### Semantic Mapping & Palette Application
- **Deep Navy (`#000B58`)**: Serves as the primary sovereign foundation, baseline application canvas, and primary foreground tone when layered over Cream surfaces.
- **Dark Blue (`#003161`)**: Serves as the operational surface tier, card background, input plate, and modal substrate. It establishes structural depth over the primary base.
- **Teal (`#006A67`)**: Designates action, verification, valid states, protocol progress indicators, and confirmed defensive steps.
- **Cream (`#FFF4B7`)**: Functions as the primary high-urgency neutral. It is deployed for primary headline text against dark surfaces, dominant call-to-action fills, crucial countdown chronometers, and active selection state borders.

### Functional Roles & Contrast Hierarchy
- **Primary Text on Dark**: `#FFF4B7` (Cream) or `#FFFFFF` (Pure White) strictly against `#000B58` or `#003161`.
- **Secondary / Supporting Text on Dark**: `#A5B4CB` (Muted Steel Slate) for instructional metadata, secondary timestamps, and legal caveats.
- **Text on Cream Surfaces**: `#000B58` (Deep Navy) only. Never use gray, teal, or light values on cream.
- **Urgent Timer & Countdown**: Pure `#FFF4B7` framed with `#006A67` to convey focused intervention rather than catastrophic failure.

## Typography

The typography uses Plus Jakarta Sans exclusively across all display, narrative, and operational metadata tiers. Engineered with geometric clarity and humanist balance, it maintains ultra-high legibility on small handheld viewports in high-stress outdoor or campus environments.

### Typographic Hierarchy Rules
- **Countdown & Step Headings (`headline-xl`, `headline-lg`)**: Used strictly for elapsed/remaining golden minutes, immediate action titles, and primary containment directives. Uses tighter letter tracking to preserve structural solidity.
- **Instructions & Guided De-escalation (`body-lg`, `body-md`)**: Balanced line heights prevent reading errors during anxious peer interactions. Maximum reading length must not exceed 64 characters per line.
- **Status Badges, Legal Verifications, & Metadata Labels (`label-lg`, `label-md`, `label-sm`)**: Set with elevated font weights (600/700) and increased letter spacing to ensure scannability at a glance.

## Layout & Spacing

The layout model implements a structured fluid grid calibrated for field responsiveness on mobile devices, expanding into clean columnar workflows on tablets and triage desktops.

### Responsive Breakpoints & Columns
- **Mobile (<640px)**: 4-column fluid grid, `1rem` outer margin, `1rem` column gutter. All interactive step flows occupy full canvas width to prevent tap errors.
- **Tablet (640px - 1024px)**: 8-column grid, `2rem` outer margin, `1rem` column gutter. Action cards and checklists span 4 or 8 columns.
- **Desktop (>1024px)**: 12-column grid, max-width `1200px` centered canvas, `3rem` outer margin, `1.5rem` column gutter. Split view model: 7 columns for evidence and protocol execution, 5 columns for bank hotline access, student verification data, and timer tracking.

### Component Spacing Rhythm
- **Micro Spacing (`space-xs`, `space-sm`)**: Reserved for badge padding, chip internal gap, and adjacent label-icon pairings.
- **Standard Stack Spacing (`space-md`, `space-lg`)**: Applied to checklist item gaps, form field stacks, and card interior padding.
- **Section Transitions (`space-xl`)**: Applied between distinct protocol phases (e.g., immediate account freeze vs. legal incident logging).

## Elevation & Depth

This design system avoids heavy shadows, glossy skeuomorphism, and high-opacity blurs, prioritizing immediate structural clarity through **Tonal Layering** and **Crisp Precision Outlines**.

### Elevation Scale
- **Canvas Baseline (Elevation 0)**: `#000B58`. The deepest background layer representing system readiness.
- **Substrate Cards & Panels (Elevation 1)**: `#003161` surface with a continuous 1px outline rendered in `rgba(255, 244, 183, 0.12)`. No dropshadow.
- **Active / Interactive Step Containers (Elevation 2)**: `#003161` surface with a crisp 1.5px border rendered in `#006A67` (Teal) or `#FFF4B7` (Cream for currently active steps). Ambient underglow: `0 8px 24px -4px rgba(0, 11, 88, 0.6)`.
- **Modals, Floating Emergency Bars & Critical Overlays (Elevation 3)**: `#000B58` solid background, 1px border in `#FFF4B7`, supported by an anchor shadow: `0 16px 32px -8px rgba(0, 0, 0, 0.7)`.

## Shapes

The geometric architecture is anchored around a precise **16px radius (`rounded-lg` / Level 2)** standard. This structural roundness humanizes the civic aid experience, easing visual tension while avoiding excessive playfulness or juvenile softness.

### Geometry Specifications
- **Action Cards, Modals, & Triage Panels**: Exactly `16px` border-radius (`rounded-lg`).
- **Input Fields & Protocol Buttons**: Unified at `12px` to `16px` border-radius to align seamlessly with card borders.
- **Tags, Counters, & Quick-Action Chips**: `8px` (`rounded-md`) for micro components to avoid visual conflict with parent cards.
- **Circular Elements**: Dedicated strictly to timer rings, student peer avatars, and numerical step indicator badges.

## Components

### Buttons
- **Primary Civic Action (e.g., "Hubungi Call Center Bank", "Amankan Akun")**: Background `#FFF4B7` (Cream), foreground text `#000B58` (Deep Navy), font-weight 700, radius 16px. Height 52px for immediate thumb acquisition. Hover/Active state shifts to `#FFFFFF` with an inner border of `#006A67`.
- **Secondary Action (e.g., "Catat Kronologi", "Salin Nomor Rekening")**: Background `#003161`, text `#FFF4B7`, border 1.5px solid `#006A67`. Hover state changes background to `#006A67` with `#FFF4B7` text.
- **Tertiary / Utility**: Ghost surface, text `#FFF4B7` with an underline decoration; used exclusively for navigational back-actions and secondary disclaimers.

### Chips & Badges
- **Status Badges**: Border radius 8px, padding `4px 10px`.
  - *Active Step*: Background `rgba(255, 244, 183, 0.15)`, text `#FFF4B7`, border 1px solid `#FFF4B7`.
  - *Verified / Completed*: Background `rgba(0, 106, 103, 0.25)`, text `#FFFFFF`, border 1px solid `#006A67`.
  - *Golden Hour Countdown Badge*: Solid `#006A67` container, text `#FFF4B7`, high-visibility display font (`label-lg`).

### Input Fields
- Surface `#003161`, border 1px solid `rgba(255, 244, 183, 0.25)`, border radius 16px, text `#FFFFFF`, placeholder text `#A5B4CB`.
- Focus state: Border transitions to 2px solid `#FFF4B7` with no glow, ensuring absolute contrast and visual confirmation of focus.

### Checkboxes & Step Radios
- Size 24px x 24px with 6px corner radius for checkboxes, full circle for radios.
- Unselected: Dark Blue `#003161` fill with 1.5px border in `#A5B4CB`.
- Selected: Solid `#006A67` fill with `#FFF4B7` checkmark/bullet icon, bordered by `#FFF4B7`.

### Protocol Cards (Action Lists)
- Container background `#003161`, corner radius 16px, padding `space-lg`, structural border 1px solid `rgba(255, 244, 183, 0.12)`.
- When marked as the current active priority: The card border switches to 2px solid `#FFF4B7`, featuring a left-accent pillar of 4px in `#006A67`.

### Specialized Domain Components
- **The Golden 60 Countdown Ring**: A persistent hero component featuring a prominent, high-contrast SVG radial indicator displaying remaining minutes. Background path in `#003161`, stroke progression in `#FFF4B7`, and inner elapsed numerals rendered in `headline-xl` (`#FFF4B7`).
- **Emergency Telephony Action Card**: Dedicated bank/fintech direct dialer. Features quick one-tap verification of official student-verified fraud center telephone numbers, formatted with prominent copy-to-clipboard actions and direct call initiation.
- **Evidence Locker Matrix**: Standardized, sequential image and screenshot upload drop-zones optimized to capture transaction IDs, fraudulent WhatsApp chats, and fake APK download links before evidence is erased.