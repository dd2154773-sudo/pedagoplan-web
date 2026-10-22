---
name: Cosmic Candy AI
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d1f27'
  surface-container-high: '#272a32'
  surface-container-highest: '#32353d'
  on-surface: '#e1e2ec'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2d3038'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#ffb0cd'
  on-secondary: '#640039'
  secondary-container: '#aa0266'
  on-secondary-container: '#ffbad3'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#009eb9'
  on-tertiary-container: '#002f38'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353d'
typography:
  display:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 21px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 9px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 0.75rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system blends deep space futurism with high-gloss confectionary kineticism. Tailored for mobile AI power-users, prompt engineers, and creative builders navigating high-throughput LLM pipelines (Groq and Google Gemini), the aesthetic pairs astronomical precision with tactile, candy-coated energy.

The interface evokes an orbital flight console filtered through a prism: hyper-fast, low-latency, and sleek, yet visually indulgent. Micro-interactions feel weightless yet responsive—mimicking low-gravity physics when surfaces reveal or switch between inference engines. 

The styling fuses **Glassmorphism** with **Futuristic Minimal Dark Mode**:
- Translucent obsidian glass overlays layered against infinite cosmic depths.
- Kinetic perimeter gradients (electric violet to candy magenta) highlighting real-time streaming states.
- High-precision telemetry badges rendering hardware throughput, engine status, and token velocities with crystalline legibility.

## Colors

The palette grounds the interface in absolute cosmic darks while allowing dynamic, vibrant neon highlights to steer visual attention and indicate engine velocity:

- **Canvas & Surface Tiering**:
  - `Canvas Midnight`: `#0A0D14` serves as the root viewport background.
  - `Surface Space`: `#121824` provides structural separation for docked toolbars and sheet containers.
  - `Surface Glass High`: `rgba(18, 24, 36, 0.70)` with frosted backdrop filtration for conversational cards and floating inputs.
  - `Surface Border Soft`: `rgba(255, 255, 255, 0.08)` for razor-thin division without visual clutter.

- **Kinetic Energy Accents**:
  - `Electric Violet` (`#8B5CF6`): Primary control states, model selector nodes, and active gravity wells.
  - `Candy Magenta` (`#EC4899`): Dynamic response prompts, user query bubbles, high-priority tokens, and Groq ultra-speed acceleration indicators.
  - `Orbital Cyan` (`#06B6D4`): Gemini Pro/Flash analytical contexts, reasoning chains, and live streaming pulses.
  - `Quantum Emerald` (`#10B981`): Optimal API latency indicators (<30ms), nominal token throughput, and success states.
  - `Solar Amber` (`#F59E0B`): Throttling flags, API quota warnings, and fallback route indications.

## Typography

The typographic hierarchy establishes clear structural zoning between natural conversational syntax and technical hardware telemetry:

- **Headlines & Display (`Space Grotesk`)**: Anchors system headers, model switcher modal labels, and primary prompt headlines with an engineered, futuristic personality.
- **Body & Long-form Narrative (`Plus Jakarta Sans`)**: Delivers friendly, open, and fatigue-free legibility across extensive generative AI responses, multi-turn dialogue, and input fields.
- **Data, Stats & Engine Metrics (`JetBrains Mono`)**: Governs TPS (tokens per second) counters, API latency ms, parameters indicators (e.g., `8B-INST`, `1.5-FLASH`), token cost calculators, and system prompts.

## Layout & Spacing

This mobile-centric layout relies on an ultra-flexible 4-column dynamic grid designed for thumb-driven one-handed interaction:

- **Margin & Safe Zones**: Canvas padding remains strictly `1rem` (16px) horizontally to maximize horizontal real estate on mobile devices while respecting rounded edge boundaries. Bottom margin accommodates a floating prompt bar with dynamic safe-area insets.
- **Rhythm**: An explicit 4px baseline grid rules vertical cadence:
  - Tight groupings (metric chip icons to labels): `space-xs` (4px).
  - Component interior gutters (message meta, avatar spacing): `space-sm` (8px).
  - Dialogue block gaps and adjacent action items: `space-md` (12px).
  - Container separation (assistant block to user turn): `space-lg` (20px).
  - Structural viewport margins (top app bar to chat stream): `space-xl` (32px).

## Elevation & Depth

Visual hierarchy uses frosted glassmorphic stacking against luminous backdrops rather than traditional drop shadows:

- **Base Field (Elevation 0)**: Flat `Canvas Midnight` (`#0A0D14`) with subtle ambient atmospheric glows (diffused radial bursts of violet and cyan blur `120px` at 12% opacity) pinned to active model states.
- **Surfaces & Response Bubbles (Elevation 1)**: `Surface Space` (`#121824`) overlaid with `backdrop-filter: blur(16px)` and bounded by a 1px perimeter border rendered in `rgba(255, 255, 255, 0.06)`.
- **Floating Controls & Engine Nav (Elevation 2)**: Glass capsules suspended via `rgba(18, 24, 36, 0.85)` with a 1px border gradient transitioning from `rgba(139, 92, 246, 0.4)` to `rgba(236, 72, 153, 0.2)`. Ambient glow: `0px 8px 32px rgba(139, 92, 246, 0.15)`.
- **Overlays, Drawers & Switchers (Elevation 3)**: Full backdrop dimming with deep space veil (`rgba(10, 13, 20, 0.8)`) and high-specular glass panels bordered by vibrant neon highlights.

## Shapes

The shape architecture relies on aerodynamic, pill-shaped geometry (`roundedness: 3`) to evoke frictionless orbital capsules and confectionary smoothness:

- **Pills & Floating Action Nodes**: Navigation selectors, speed badges, engine toggles, and message action triggers all use full pill radiuses (`9999px` / `3rem`).
- **Cards & Chat Panels**: Enclosed chat groups, code snippet blocks, and engine telemetry cards utilize `rounded-lg` (2rem / 32px) on outer corners, tightening to `0.5rem` (8px) on conversational origin anchors to communicate directional flow.
- **Form Inputs**: The floating message entry capsule utilizes an organic extended pill contour, compressing smoothly during audio recording or streaming cancellation modes.

## Components

### 1. Engine Switcher & Status Capsule (Top Bar)
- Suspended frosted pill containing dual-engine radio states: Gemini (Cyan badge) vs. Groq (Candy Magenta badge).
- Live API ping indicator: 6px pulsing dot (Green for `<50ms`, Amber for fallback routes).
- Token-per-second (TPS) speedometer chip embedded directly into the capsule in `label-sm` monospaced type (e.g., `⚡ 284 T/S`).

### 2. Message Surfaces
- **User Query**: Asymmetric rounded card oriented right. Gradient stroke fill: `linear-gradient(135deg, #8B5CF6, #EC4899)`. Text color is crisp white (`#FFFFFF`).
- **Assistant Response**: Semi-transparent midnight obsidian card (`rgba(18, 24, 36, 0.65)`) with a gentle cyan-tinted border (`rgba(6, 182, 212, 0.15)`). Bottom meta row displays generation latency, context window token usage, and quick copy/retry pills.

### 3. Floating Prompt Bar
- Omnipresent bottom capsule floating 16px above the device home indicator.
- Glassmorphic container with 1px border `rgba(255, 255, 255, 0.1)`.
- Left icon: Multi-modal attachment trigger (Gemini file/image parse).
- Dynamic action button (Right): Transforms from a candy magenta upward arrow (Send) into a pulsing square cancel token while the engine streams output.

### 4. Telemetry Speed Badges & Metrics
- Miniature pill chips using `label-md`. 
- Background: `rgba(255, 255, 255, 0.04)`.
- Foreground: Highlighted metric text with leading micro-icons (e.g., `Llama 3.3 70B • 312 t/s`).

### 5. Code & Data Blocks
- Monochromatic deep-space inset (`#070A0F`) with rounded-lg edges.
- Header row housing language flag in `JetBrains Mono` label-sm alongside a single-tap "Copy" pill with tactile violet click feedback.