# Figma UI Audit — Ocean Snake Game Screen

This document lists all discovered mismatches between the current React implementation (GameScreenDesign.jsx + CSS) and the reference Figma game screen (assets/game-screen-1-4).

Scope:
- Files reviewed: GameScreenDesign.jsx, styles/figma-canvas.css, styles/app.css, styles/theme.css
- References: assets/common.css, assets/game-screen-1-4.css, assets/game-screen-1-4.html

Issues (Actionable):

1) Canvas scaling/origin
- Current: transform-origin top center, dynamic scaling with page padding.
- Figma intent: top-left anchored canvas (360x780), scale down only.
- Fix: Use transform-origin: top left and avoid extra page padding that shifts the origin.

2) Game frame positioning
- Current: centered via translate(-50%, -50%) inside canvas.
- Figma: left:-88px; top:-345px; size 312x528 relative to canvas.
- Fix: Use absolute positions within the canvas per Figma coordinates.

3) HUD “TIME LEFT” widths/offsets
- Current: text blocks are wider than Figma, causing spacing mismatch.
- Figma: 62px (label), 15px (number), 6px (“s”).
- Fix: Adjust widths/left offsets to match Figma; verify kerning visually.

4) Font family mismatch
- Current: System UI font is used.
- Figma: TT Fors (per assets/common.css).
- Fix: Load and apply TT Fors (or a close fallback) to .figma-canvas .text.

5) Time bar (rect-477) behavior
- Current: opacity changes with running state.
- Figma: static green bar (height 2px).
- Fix: Remove dynamic opacity; keep static visual.

6) Score (frame-9) position and size
- Current: placed relative to game-frame and wider than Figma.
- Figma: precise left/top relative to canvas; tight width.
- Fix: Reposition at canvas scope; tighten width.

7) Left/right controls absolute coordinates
- Current: Positioned via flex + translateX inside an overlay.
- Figma: left:-84px; right:77px; top:228px; size 143x85.
- Fix: Absolute positioning at canvas scope; remove flex distribution side-effects.

8) Center control style consistency
- Current: semi-transparent background differing from rect-476.
- Figma: rect-476 (solid 242424 with 303030 border).
- Fix: Match rect-476 for center control.

9) Triangle icons crispness
- Current: Colors match; scaling may blur.
- Fix: Ensure SVG pixel snapping at left:54, top:19 inside 143x85; verify at common scales.

10) Decorative assets (image-2, component-1)
- Current: Positioned at top-left inside canvas (no negative offsets).
- Figma: Uses negative coordinates relative to canvas.
- Fix: Use Figma absolute coordinates at canvas scope.

11) Hidden elements (frame-rate, timer)
- Current: Visible container positions differ from Figma negative offsets.
- Fix: Apply same coordinates (opacity:0 remains).

12) Game grid insets vs Figma
- Current: left/top/right/bottom: 16,16,16,116 to leave room for controls.
- Figma: Grid placeholder likely differs; controls are outside grid region.
- Fix: Align grid area to the original placeholder without extra bottom reserve.

13) Grid visual weight
- Current: Cells have gradient/shadow; may look heavier than Figma.
- Fix: Flatten styling closer to Figma (lighter gradient or solid).

14) Non-Figma overlays (paused/game over)
- Current: HUD badges appear inside canvas; not in Figma.
- Fix: Hide by default or move outside canvas to avoid visual interference during screenshots.

15) Focus outlines
- Current: Blue focus ring on frames; not in Figma.
- Fix: Keep for a11y; ensure not active by default to avoid mismatches.

16) Center control label
- Current: “Start/Pause” text (12px).
- Figma: May be icon-only/empty.
- Fix: Use iconography or remove text if Figma specifies.

17) Static asset paths
- Current: Images referenced at /assets/..., but not located in public/assets.
- Fix: Copy assets/figmaimages/*.png to public/assets/ and confirm URLs.

18) Page padding and scaling
- Current: figma-page padding and overflow auto add margins not seen in Figma.
- Fix: Remove desktop padding; retain minimal mobile-safe padding as needed.

19) Scaling logic parity
- Current: Computes scale vars; good, but center-origin differs.
- Fix: Use top-left anchoring; replicate approach from assets/game-screen-1-4.css media rules.

20) Z-index ordering
- Current: hud, frame-9, frame-11 share z-index with grid overlay.
- Fix: Confirm stacking matches Figma when elements overlap.

21) HUD numeric spacing with unit
- Current: Wider text boxes -> extra whitespace.
- Fix: Tighten widths and left offsets for number and “s”.

22) Border radius consistency
- Ensure rect-476: 16px; game-frame: 8px; verify others consistent.

23) Snake cell radius
- Current: 6px; confirm with design; adjust if needed.

24) Mobile touch hit areas
- Current: Scaled elements may reduce below 44x44px.
- Fix: Provide min-hit area overlays if scale < 1.

25) Center control colors
- Current: rgba(36,36,36,0.6) background.
- Fix: Use var(--color-242424) and border var(--color-303030) per rect-476.

26) Typography line-height/baseline
- Current: Using system fonts causes baseline mismatch.
- Fix: Apply font, then verify vertical alignment of “s” unit.

Dependencies/Assets:
- Ensure TT Fors or substitute web font is added (licensing permitting).
- Copy Figma images to public/assets for CRA.

Non-functional:
- Gameplay logic must remain unchanged.

