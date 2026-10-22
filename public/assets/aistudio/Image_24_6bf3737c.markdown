---
name: Academic Mentorship & Planning
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#444651'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#757682'
  outline-variant: '#c5c5d3'
  surface-tint: '#4059aa'
  primary: '#00236f'
  on-primary: '#ffffff'
  primary-container: '#1e3a8a'
  on-primary-container: '#90a8ff'
  inverse-primary: '#b6c4ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#3e2400'
  on-tertiary: '#ffffff'
  tertiary-container: '#5c3800'
  on-tertiary-container: '#ef9900'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164e'
  on-primary-fixed-variant: '#264191'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is tailored for university pedagogy students, pre-service educators, and practicum supervisors. It merges academic rigor with supportive, empathetic guidance. The visual tone is structured, calm, and intellectually empowering, intentionally designed to lower cognitive strain during rigorous lesson planning, field diary logging, and competency assessment.

The aesthetic follows an **Editorial Contemporary Minimal** direction:
- **Clean Structure:** Modular grid foundations that frame pedagogical frameworks (curricula, rubrics, and field notes) with absolute legibility.
- **Warm Institutionalism:** Avoids sterile corporate tropes; surfaces balance deliberate white space with soft contextual accents that make reflective practice intuitive and rewarding.
- **Empathetic Feedback:** Uses optimistic, grounding tones to highlight milestones, feedback loops, and practicum progress without punitive visual alarms.

## Colors

The palette establishes an authoritative yet welcoming hierarchy:
- **Primary (`#1E3A8A` - Deep Educational Indigo):** Anchor color for navigation chrome, primary actions, and primary academic headers. Provides institutional gravity and high-contrast readability.
- **Secondary (`#10B981` - Practicum Sage/Emerald):** Highlights growth metrics, completed pedagogical units, validated field hours, and positive mentor feedback.
- **Tertiary (`#F59E0B` - Warm Amber/Ochre):** Emphasizes pending supervisory notes, formative alerts, deadlines, and active reflection markers without inducing stress.
- **Neutral (`#0F172A` - Slate Ink):** Governs typographic hierarchy across a light surface base (`#F8FAFC`). Crisp, legible text that mitigates eye fatigue across intensive reading sessions.

Surface backgrounds rely on subtle cool off-whites (`#F8FAFC` to `#FFFFFF`) paired with soft slate perimeter dividers (`#E2E8F0`) to ensure clean contrast ratios exceeding WCAG AAA standards for body content.

## Typography

**Plus Jakarta Sans** is the single font family across all roles. Its geometric underpinnings provide modern clarity, while its humanist proportions bring approachability to formal documentation.

- **Headlines & Display:** Weighted at 700 to 800 with slight negative letter tracking to produce clear typographic entry points into syllabi and instructional units.
- **Body & Longform:** Set at 400 with comfortable line-heights (1.6x) optimized for narrative-heavy documents such as field diaries, classroom observations, and student assessments.
- **Labels & Metatags:** Set at 600 weight with subtle positive tracking for immediate scanning across schedule timelines, rubric badges, and status pills.

## Layout & Spacing

The layout is built upon an 8pt modular grid system paired with a fluid multi-column responsive layout:
- **Desktop (1024px+):** 12-column fluid grid, 2rem margins, 1.25rem gutters. Lesson plans leverage side-by-side split panels (curriculum objectives on the left, sequence steps on the right). Max container constraint caps at 1440px to preserve comfortable scan lengths.
- **Tablet (768px - 1023px):** 8-column layout, 1.5rem margins, 1rem gutters. Sidebar collapses into a drawer; secondary meta panels stack below the primary planning canvas.
- **Mobile (320px - 767px):** 4-column layout, 1rem margin, 0.75rem gutters. Field journal entry cards and planning steps collapse into continuous vertical flows with sticky bottom contextual navigation bars.

## Elevation & Depth

Visual hierarchy relies on **crisp structural borders paired with ultra-subtle ambient lift**:
- **Layering Base:** Canvases rest on `#F8FAFC`. Structural modules use pure `#FFFFFF` containers bounded by hairline borders (`1px solid #E2E8F0`).
- **Surface Elevation (Cards & Panels):** Subtle, diffused shadow with deep slate tinting (`0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 1px 3px -1px rgba(15, 23, 42, 0.03)`).
- **Interactive Hover & Float:** Modals, dropdowns, and draggable plan modules ascend with a focused elevation (`0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)`).
- **Active Focus & Reflection States:** Important observational highlights or active lesson blocks use tinted indigo or sage outlines (`2px solid rgba(30, 58, 138, 0.25)`) instead of heavy dropshadows to preserve academic minimalism.

## Shapes

The design system adopts **Level 2 (Rounded)**:
- Standard UI interactive components (inputs, list items, action buttons) feature an 8px (`0.5rem`) corner radius.
- Cards, pedagogical unit containers, and modular planning blocks use 16px (`1rem`) corner radius (`rounded-lg`).
- Modals, major reflective canvas views, and bottom sheets use 24px (`1.5rem`) corner radius (`rounded-xl`).
- Status indicators, category chips, and practicum hour tags use fully circular pill profiles (`rounded-full`) to differentiate metadata from actionable rectangular cards.

## Components

### Buttons
- **Primary:** Background `#1E3A8A`, text `#FFFFFF`, rounded 8px, font weight 600. Focus ring: 2px `#3B82F6` offset by 2px white.
- **Secondary / Ghost:** Transparent background, border `1px solid #CBD5E1`, text `#0F172A`, hover background `#F1F5F9`.
- **Destructive / Flag:** Background `#FEF2F2`, border `1px solid #FEE2E2`, text `#B91C1C`.

### Cards & Planning Modules
- Constructed on `#FFFFFF` surfaces with `1px solid #E2E8F0` and `rounded-lg`.
- Dedicated header zones with `border-bottom: 1px solid #F1F5F9` to separate pedagogical competencies from chronological lesson flows.
- Draggable timeline modules highlight with an emerald-toned left border indicator (`border-l-4 border-emerald-500`) when validated.

### Chips & Badges
- **Competency / Grade Tag:** Small pill (`rounded-full`), padding `0.25rem 0.75rem`, label font size `11px`, bold. Neutral slate fill (`#F1F5F9`) with `#334155` text.
- **Practicum Status (Approved / Pending):** Soft-tint background (`#ECFDF5` for validated, `#FFFBEB` for draft), text corresponding to `#065F46` and `#92400E`.

### Form Inputs & Textareas
- Border `1px solid #CBD5E1`, background `#FFFFFF`, text `#0F172A`, placeholder `#94A3B8`.
- Focus state: border `#3B82F6` with an outer soft glow ring `0 0 0 3px rgba(59, 130, 246, 0.15)`.
- Extended text areas for Field Journals (*Diario de Campo*) incorporate auto-expand behavior with integrated prompt cues in italicized `#64748B`.

### Lists & Activity Logs
- Clean dividing lines (`1px solid #F1F5F9`), horizontal interactive padding (`0.75rem 1rem`), hover state transitioning smoothly to `#F8FAFC`.
- Pre-fixed with timestamp or competency index tags.

### Checkboxes & Rubric Radios
- Size 18px x 18px, border `1.5px solid #94A3B8`, rounded 4px for checkboxes, fully circular for radios.
- Checked state fills with `#1E3A8A` exhibiting a crisp white checkmark or inner dot.

### Specialized Pedagogical Components
- **Field Diary Timeline (Bitácora):** Vertical continuous axis with chronological entry points, photo attachment slots, and mentor sign-off signatures.
- **Competency Rubric Matrix:** Compact table component with color-bracketed levels (Initial, Developing, Proficient, Advanced) using progressive tints of `#10B981`.