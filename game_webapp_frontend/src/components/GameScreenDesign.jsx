import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GameScreenDesign
 * Static React translation of the provided Figma-based HTML canvas (game-screen-1-4.html).
 * This component renders the visual composition for reference or future integration.
 * It uses absolute-positioned elements to match the original layout and references
 * shared CSS variables for colors and shadows.
 *
 * Note:
 * - This is a purely presentational component (no gameplay logic).
 * - All inline left/top/size styles are preserved to match design fidelity.
 * - Images referenced from public/assets path as required by tooling instructions.
 */
export function GameScreenDesign() {
  return (
    <div className="figma-page">
      <div
        className="figma-canvas"
        role="img"
        aria-label="Game screen design canvas 360x780"
      >
        {/* Frame 11: TIME LEFT: 60 s */}
        <div className="frame-11" style={{ left: 26.5, top: 195, width: 83, height: 16 }}>
          <div className="text text-typo9" style={{ left: 0, top: 0, width: 62, height: 16 }}>TIME LEFT:</div>
          <div className="text text-typo10" style={{ left: 62, top: 0, width: 15, height: 16 }}>60</div>
          <div className="text text-typo10" style={{ left: 77, top: 0, width: 6, height: 16 }}>s</div>
        </div>

        {/* Rectangle 477: time bar */}
        <div className="rect-477" style={{ left: -82, top: 188, width: 300, height: 2 }} />

        {/* Left control */}
        <div className="left-frame" style={{ left: -84, top: 228, width: 143, height: 85 }}>
          <div className="left-bg rect-476" />
          <svg className="poly poly-left" viewBox="0 0 32 32" width="32" height="32" style={{ left: 54, top: 19 }}>
            <polygon points="32,0 0,16 32,32" fill="var(--color-444444)" stroke="var(--color-000000)" strokeWidth="1" />
          </svg>
        </div>

        {/* Right control */}
        <div className="right-frame" style={{ left: 77, top: 228, width: 143, height: 85 }}>
          <div className="right-bg rect-476" />
          <svg className="poly poly-right" viewBox="0 0 32 32" width="32" height="32" style={{ left: 54, top: 19 }}>
            <polygon points="0,0 32,16 0,32" fill="var(--color-444444)" stroke="var(--color-000000)" strokeWidth="1" />
          </svg>
        </div>

        {/* Randomiser (star) */}
        <div className="randomiser" style={{ left: -112, top: -422, width: 38, height: 38 }}>
          <div className="star-3" style={{ left: 8, top: 8, width: 22, height: 22 }}>
            <svg viewBox="0 0 22 22" width="22" height="22" aria-hidden="true">
              <polygon
                points="11,0 13.6,7.5 21.5,8.5 15.5,13.6 17.3,21.5 11,17.5 4.7,21.5 6.5,13.6 0.5,8.5 8.4,7.5"
                fill="var(--color-fc7a69)"
              />
            </svg>
          </div>
        </div>

        {/* Game container */}
        <div className="game-frame" style={{ left: -88, top: -345, width: 312, height: 528 }}>
          <img className="game-bg" src="/assets/figma_image_66_224.png" alt="" />

          {/* fruit 1 (Jewels) */}
          <div className="fruit-1" style={{ left: -112, top: -129, width: 192, height: 336 }}>
            {/* Jewel */}
            <div className="jewel" style={{ left: 56, top: 0, width: 24, height: 24 }}>
              <div className="jewel-layer outer" aria-hidden="true" />
              <div className="jewel-layer core" aria-hidden="true" />
              <div className="jewel-highlight a" aria-hidden="true" />
              <div className="jewel-highlight b" aria-hidden="true" />
            </div>

            {/* Frame 10: "10 x" label */}
            <div className="jewel-label" style={{ left: 57, top: 4, width: 22, height: 16 }}>
              <span className="text text-typo11">10</span>
              <span className="text text-typo12">x</span>
            </div>
          </div>

          {/* sq 2 */}
          <div className="sq-2" style={{ left: -112, top: 159, width: 192, height: 48 }}>
            <div className="pixel" style={{ left: 56, top: 0, width: 24, height: 24 }}>
              <div className="pixel-rect rect-style-43" />
            </div>
          </div>

          {/* sq 1 */}
          <div className="sq-1" style={{ left: -112, top: 135, width: 192, height: 72 }}>
            <div className="pixel" style={{ left: 56, top: 0, width: 24, height: 24 }}>
              <div className="pixel-rect rect-style-44" />
            </div>
          </div>

          {/* Frame 14 (debug info) */}
          <div className="frame-14" style={{ left: -75, top: -334, width: 85, height: 176 }}>
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
        </div>

        {/* Component 1 (small glossy gem) */}
        <div className="component-1" style={{ left: 160, top: -380, width: 16, height: 16 }}>
          <div className="gem" />
        </div>

        {/* Frame 9: red number 0 */}
        <div className="frame-9" style={{ left: 191, top: -387, width: 16, height: 32 }}>
          <div className="text text-typo14" style={{ left: 0, top: 0, width: 16, height: 32, color: 'var(--color-fd4e3d)' }}>0</div>
        </div>

        {/* image 2 (logo-like) */}
        <img
          className="image-2"
          src="/assets/figma_image_27_231.png"
          alt=""
          style={{ left: -87, top: -390, width: 88, height: 30 }}
        />

        {/* Frame_rate (tick star) */}
        <div className="frame-rate" style={{ left: -112, top: -422, width: 51, height: 51 }}>
          <div className="frame-star" style={{ left: 8, top: 8, width: 35, height: 35 }}>
            <svg viewBox="0 0 35 35" width="35" height="35" aria-hidden="true">
              <polygon
                points="17.5,0 21.6,11.9 35,13.4 25,21.6 28,35 17.5,28.8 7,35 10,21.6 0,13.4 13.4,11.9"
                fill="var(--color-fc7a69)"
              />
            </svg>
          </div>
        </div>

        {/* Timer (star 4) */}
        <div className="timer" style={{ left: -112, top: -422, width: 40, height: 40 }}>
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
