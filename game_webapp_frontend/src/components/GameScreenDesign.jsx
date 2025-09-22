import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GameScreenDesign
 * Figma-aligned static layout refactored into named regions that map to an interactive Snake game:
 * - hud: time/score area (top)
 * - game-grid: placeholder for snake grid tiles
 * - food-layer: overlay for food
 * - controls-overlay: virtual d-pad/left-right buttons
 *
 * This preserves the original Figma positions/styles but introduces semantic wrappers
 * for progressive enhancement. No gameplay logic is wired here yet.
 */
export function GameScreenDesign() {
  return (
    <div className="figma-page">
      <div
        className="figma-canvas"
        role="img"
        aria-label="Game screen design canvas 360x780"
      >
        {/* HUD: time left / live score container (mapped from frame-11 and nearby numeric) */}
        <section
          className="hud hud-design"
          aria-label="Game HUD"
          style={{ left: 26.5, top: 195, width: 150, height: 32 }}
        >
          <div
            className="frame-11"
            style={{ left: 0, top: 0, width: 83, height: 16 }}
            aria-hidden="true"
          >
            <div className="text text-typo9" style={{ left: 0, top: 0, width: 62, height: 16 }}>TIME LEFT:</div>
            <div className="text text-typo10" style={{ left: 62, top: 0, width: 15, height: 16 }}>60</div>
            <div className="text text-typo10" style={{ left: 77, top: 0, width: 6, height: 16 }}>s</div>
          </div>
          {/* Rect 477 as thin time bar */}
          <div
            className="rect-477"
            style={{ left: -82, top: -7, width: 300, height: 2 }}
            aria-hidden="true"
          />
          {/* Score number from figma (frame-9) — placed near HUD for semantic grouping */}
          <div className="frame-9" style={{ left: 164, top: -192, width: 16, height: 32 }}>
            <div className="text text-typo14" style={{ left: 0, top: 0, width: 16, height: 32, color: 'var(--color-fd4e3d)' }}>0</div>
          </div>
        </section>

        {/* Game container: holds background and inner layout regions */}
        <section
          className="game-frame"
          style={{ left: -88, top: -345, width: 312, height: 528 }}
          aria-label="Game area container"
        >
          <img className="game-bg" src="/assets/figma_image_66_224.png" alt="" />

          {/* GRID REGION */}
          {/* PUBLIC_INTERFACE
              This is the primary grid region where interactive tiles will be rendered.
              Keep the absolute size from Figma; inner content will be grid-based later. */}
          <div
            className="game-grid"
            role="grid"
            aria-label="Snake grid (design placeholder)"
            style={{
              position: 'absolute',
              left: 16,
              top: 16,
              right: 16,
              bottom: 120, // leave space for controls at the bottom per Figma composition
              borderRadius: 'var(--radius-8)',
              border: '1px solid rgba(17,24,39,0.06)',
              background: 'linear-gradient(180deg, rgba(37,99,235,0.04), rgba(255,255,255,0.04))',
              overflow: 'hidden',
            }}
          >
            {/* Placeholder tiles to visualize mapping; not interactive */}
            <div
              className="grid-placeholder"
              style={{
                position: 'absolute',
                inset: 8,
                borderRadius: 10,
                background:
                  'repeating-linear-gradient(0deg, rgba(37,99,235,0.06) 0 18px, transparent 18px 20px), repeating-linear-gradient(90deg, rgba(37,99,235,0.06) 0 18px, transparent 18px 20px)',
                opacity: 0.4,
              }}
              aria-hidden="true"
            />
          </div>

          {/* FOOD OVERLAY REGION */}
          {/* PUBLIC_INTERFACE
              Food layer to place the food entity on top of the grid. */}
          <div
            className="food-layer"
            aria-label="Food overlay (design placeholder)"
            style={{
              position: 'absolute',
              left: 16,
              top: 16,
              right: 16,
              bottom: 120,
              pointerEvents: 'none',
            }}
          >
            {/* Use the existing jewel visual as a "food" marker */}
            <div className="fruit-1" style={{ left: -112, top: -129, width: 192, height: 336 }}>
              <div className="jewel" style={{ left: 56, top: 0, width: 24, height: 24 }}>
                <div className="jewel-layer outer" aria-hidden="true" />
                <div className="jewel-layer core" aria-hidden="true" />
                <div className="jewel-highlight a" aria-hidden="true" />
                <div className="jewel-highlight b" aria-hidden="true" />
              </div>
              <div className="jewel-label" style={{ left: 57, top: 4, width: 22, height: 16 }} aria-hidden="true">
                <span className="text text-typo11">10</span>
                <span className="text text-typo12">x</span>
              </div>
            </div>
          </div>

          {/* SNAKE OVERLAY REGION */}
          {/* PUBLIC_INTERFACE
              Snake layer that will render snake segments/head on top of the grid. */}
          <div
            className="snake-layer"
            aria-label="Snake overlay (design placeholder)"
            style={{
              position: 'absolute',
              left: 16,
              top: 16,
              right: 16,
              bottom: 120,
              pointerEvents: 'none',
            }}
          >
            {/* Two sample blocks derived from sq-1/sq-2 to visualize snake body mapping */}
            <div className="sq-2" style={{ left: -112, top: 159, width: 192, height: 48 }}>
              <div className="pixel" style={{ left: 56, top: 0, width: 24, height: 24 }}>
                <div className="pixel-rect rect-style-43" />
              </div>
            </div>
            <div className="sq-1" style={{ left: -112, top: 135, width: 192, height: 72 }}>
              <div className="pixel" style={{ left: 56, top: 0, width: 24, height: 24 }}>
                <div className="pixel-rect rect-style-44" />
              </div>
            </div>
          </div>

          {/* DEBUG INFO (kept from Figma) */}
          <div className="frame-14" style={{ left: -75, top: -334, width: 85, height: 176 }} aria-hidden="true">
            <div className="row"><span className="text text-typo13">Frame:</span><span className="text text-typo13">&nbsp;1</span></div>
            <div className="row"><span className="text text-typo13">Direction:</span><span className="text text-typo13">&nbsp;1</span></div>
            <div className="row"><span className="text text-typo13">time_left:</span><span className="text text-typo13">&nbsp;60</span></div>
            <div className="row"><span className="text text-typo13">bar_width</span><span className="text text-typo13">&nbsp;300</span></div>
            <div className="row"><span className="text text-typo13">jewel:</span><span className="text text-typo13">&nbsp;10</span></div>
            <div className="row"><span className="text text-typo13">sq 1 X:</span><span className="text text-typo13">&nbsp;168</span></div>
            <div className="row"><span className="text text-typo13">sq 1 Y:</span><span className="text text-typo13">&nbsp;48</span></div>
            <div className="row"><span className="text text-typo13">fruit_X:</span><span className="text text-typo13">&nbsp;168</span></div>
            <div className="row"><span className="text text-typo13">fruit_Y:</span><span className="text text-typo13">&nbsp;312</span></div>
            <div className="row"><span className="text text-typo13">next_X:</span><span className="text text-typo13">&nbsp;1</span></div>
            <div className="row"><span className="text text-typo13">next_Y:</span><span className="text text-typo13">&nbsp;1</span></div>
          </div>

          {/* CONTROLS OVERLAY */}
          {/* PUBLIC_INTERFACE
              Control overlay (virtual controls) using the Figma left/right panels and a center start/pause placeholder. */}
          <div
            className="controls-overlay"
            aria-label="Controls overlay"
            style={{
              position: 'absolute',
              left: 16,
              right: 16,
              bottom: 16,
              height: 92,
            }}
          >
            {/* Left control */}
            <div className="left-frame" style={{ left: -84, top: 0, width: 143, height: 85 }}>
              <div className="left-bg rect-476" />
              <svg className="poly poly-left" viewBox="0 0 32 32" width="32" height="32" style={{ left: 54, top: 19 }}>
                <polygon points="32,0 0,16 32,32" fill="var(--color-444444)" stroke="var(--color-000000)" strokeWidth="1" />
              </svg>
            </div>

            {/* Center control (new semantic placeholder, not in original Figma but aligned with layout intent) */}
            <div
              className="center-frame rect-476"
              style={{
                position: 'absolute',
                left: 50,
                right: 50,
                top: 0,
                height: 85,
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(36,36,36,0.6)',
                border: '1px solid var(--color-303030)',
                borderRadius: 'var(--radius-16)',
              }}
            >
              <div className="text text-typo10" aria-hidden="true">Start/Pause</div>
            </div>

            {/* Right control */}
            <div className="right-frame" style={{ right: -84, top: 0, width: 143, height: 85, position: 'absolute' }}>
              <div className="right-bg rect-476" />
              <svg className="poly poly-right" viewBox="0 0 32 32" width="32" height="32" style={{ left: 54, top: 19 }}>
                <polygon points="0,0 32,16 0,32" fill="var(--color-444444)" stroke="var(--color-000000)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </section>

        {/* Decorative elements preserved for design parity */}
        <div className="component-1" style={{ left: 160, top: -380, width: 16, height: 16 }}>
          <div className="gem" />
        </div>

        <img
          className="image-2"
          src="/assets/figma_image_27_231.png"
          alt=""
          style={{ left: -87, top: -390, width: 88, height: 30 }}
        />

        <div className="frame-rate" style={{ left: -112, top: -422, width: 51, height: 51 }} aria-hidden="true">
          <div className="frame-star" style={{ left: 8, top: 8, width: 35, height: 35 }}>
            <svg viewBox="0 0 35 35" width="35" height="35" aria-hidden="true">
              <polygon
                points="17.5,0 21.6,11.9 35,13.4 25,21.6 28,35 17.5,28.8 7,35 10,21.6 0,13.4 13.4,11.9"
                fill="var(--color-fc7a69)"
              />
            </svg>
          </div>
        </div>

        <div className="timer" style={{ left: -112, top: -422, width: 40, height: 40 }} aria-hidden="true">
          <div className="timer-star" style={{ left: 8, top: 8, width: 24, height: 24 }}>
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <polygon
                points="12,0 14.9,8.2 24,9.3 17.1,14.9 19.2,24 12,19.7 4.8,24 6.9,14.9 0,9.3 9.1,8.2"
                fill="var(--color-fc7a69)"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
