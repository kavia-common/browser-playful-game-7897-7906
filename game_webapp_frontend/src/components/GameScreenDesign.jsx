import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SnakeEngine } from './snake/SnakeEngine';
import { useScore } from '../context/ScoreContext';
import { useTheme } from '../context/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * GameScreenDesign
 * Interactive Snake game rendered within the Figma-styled canvas.
 * - Maps HUD, grid, snake, food, and controls onto the original layout regions.
 * - Uses SnakeEngine for pure logic; this component handles rendering and input.
 */
export function GameScreenDesign() {
  const canvasRef = useRef(null);
  const gridRegionRef = useRef(null);
  const { addScore, resetSessionIfNew, resetScore } = useScore();
  const { theme } = useTheme();

  // Grid configuration based on the inner "game-grid" region bounds
  const [grid, setGrid] = useState({ cols: 18, rows: 18, cellPx: 16, padding: 8 });
  const [state, setState] = useState({
    cols: 18,
    rows: 18,
    snake: [],
    food: { x: -1, y: -1 },
    score: 0,
    alive: true,
    running: false,
  });
  const engineRef = useRef(null);

  // Initialize session semantics
  useEffect(() => {
    resetSessionIfNew();
  }, [resetSessionIfNew]);

  // Create engine when cols/rows change (responsive)
  useEffect(() => {
    engineRef.current = new SnakeEngine({
      cols: grid.cols,
      rows: grid.rows,
      onChange: (s) => {
        // update local state and sync score delta to ScoreContext
        setState(s);
        addScore(s.score - (state.score ?? 0));
      },
    });
    resetScore();
    setState((prev) => ({ ...prev, score: 0 }));
    return () => {
      engineRef.current?.stop?.();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid.cols, grid.rows]);

  // Attach window bridge so FooterControls can control this variant as well
  const startGame = useCallback(() => engineRef.current?.start?.(), []);
  const stopGame = useCallback(() => engineRef.current?.stop?.(), []);
  useEffect(() => {
    window.__oceanGame = {
      start: startGame,
      stop: stopGame,
      isRunning: () => engineRef.current?.isRunning?.() || false,
    };
    return () => {
      if (window.__oceanGame) delete window.__oceanGame;
    };
  }, [startGame, stopGame]);

  // Keyboard controls (Arrow/WASD + Space/Enter)
  useEffect(() => {
    const onKey = (e) => {
      if (!engineRef.current) return;
      const k = e.key.toLowerCase();
      if (k === 'arrowup' || k === 'w') engineRef.current.setDirection('up');
      else if (k === 'arrowdown' || k === 's') engineRef.current.setDirection('down');
      else if (k === 'arrowleft' || k === 'a') engineRef.current.setDirection('left');
      else if (k === 'arrowright' || k === 'd') engineRef.current.setDirection('right');
      else if (k === ' ' || k === 'enter') {
        if (engineRef.current.isRunning()) engineRef.current.stop();
        else engineRef.current.start();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Compute grid size from the absolute-positioned region inside the Figma canvas
  useEffect(() => {
    const el = gridRegionRef.current;
    if (!el) return;

    const computeGrid = () => {
      const rect = el.getBoundingClientRect();
      // Leave inner padding like the placeholder area
      const padding = 8;
      const usableW = rect.width - padding * 2;
      const usableH = rect.height - padding * 2;

      // Aim for square-ish grid. Pick cols based on width and an ideal ~18px cell.
      const idealCell = 18;
      const cols = Math.max(14, Math.min(28, Math.floor(usableW / idealCell)));
      const rows = Math.max(14, Math.min(28, Math.floor(usableH / idealCell)));
      const cellPx = Math.floor(Math.min(usableW / cols, usableH / rows));
      setGrid({ cols, rows, cellPx, padding });
    };

    computeGrid();
    const ro = new ResizeObserver(computeGrid);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Render helpers
  const gridStyle = useMemo(() => {
    const gap = Math.max(1, Math.floor(grid.cellPx * 0.08));
    return {
      position: 'absolute',
      left: 16,
      top: 16,
      right: 16,
      bottom: 120,
      borderRadius: 'var(--radius-8)',
      border: '1px solid rgba(17,24,39,0.06)',
      background: 'linear-gradient(180deg, rgba(37,99,235,0.04), rgba(255,255,255,0.04))',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
      gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
      gap: `${gap}px`,
      padding: `${grid.padding}px`,
    };
  }, [grid]);

  const renderCells = useMemo(() => {
    const total = grid.rows * grid.cols;
    const cells = new Array(total).fill(0);
    const snakeSet = new Set(state.snake.map((s) => `${s.x},${s.y}`));
    const foodKey = `${state.food.x},${state.food.y}`;
    const head = state.snake[state.snake.length - 1];

    return cells.map((_, idx) => {
      const x = idx % grid.cols;
      const y = Math.floor(idx / grid.cols);
      const key = `${x},${y}`;
      const isSnake = snakeSet.has(key);
      const isHead = isSnake && head?.x === x && head?.y === y;
      const isFood = key === foodKey;
      return (
        <div
          key={key}
          className={`snake-cell${isSnake ? ' snake' : ''}${isHead ? ' head' : ''}${isFood ? ' food' : ''}`}
          aria-hidden="true"
        />
      );
    });
  }, [grid.cols, grid.rows, state.snake, state.food]);

  // Virtual control handlers
  const handleControl = (dir) => engineRef.current?.setDirection?.(dir);
  const toggleStartPause = () => (engineRef.current?.isRunning() ? engineRef.current?.stop() : engineRef.current?.start());

  // Restart on click of HUD score (fits nicely into design without adding extra buttons in the figma)
  const softRestart = useCallback(() => {
    engineRef.current?.stop?.();
    resetScore();
    // Reset engine fully to restore initial state and avoid residual speed increases
    engineRef.current?.reset?.();
    setTimeout(() => engineRef.current?.start?.(), 100);
  }, [resetScore]);

  // Derived HUD time: live indicator replacing static "60s"
  const liveTimeText = state.running ? '∞' : '0';

  return (
    <div className="figma-page" ref={canvasRef} data-theme={theme}>
      <div
        className="figma-canvas"
        role="application"
        aria-label="Ocean Snake — Figma-integrated interactive canvas"
      >
        {/* HUD mapped near original position with live values */}
        <section
          className="hud hud-design"
          aria-label="Game HUD"
          style={{ left: 26.5, top: 195, width: 230, height: 32 }}
        >
          <div
            className="frame-11"
            style={{ left: 0, top: 0, width: 120, height: 16 }}
          >
            <div className="text text-typo9" style={{ left: 0, top: 0, width: 82, height: 16 }}>TIME LEFT:</div>
            <div className="text text-typo10" style={{ left: 82, top: 0, width: 24, height: 16 }}>
              {liveTimeText}
            </div>
            <div className="text text-typo10" style={{ left: 108, top: 0, width: 12, height: 16 }}>s</div>
          </div>
          {/* Time bar visual cue now reflects running state and slight pulse when playing */}
          <div
            className="rect-477"
            style={{
              left: -82,
              top: -7,
              width: 300,
              height: 2,
              opacity: state.running ? 1 : 0.45,
              transition: 'opacity var(--transition-fast)',
            }}
            aria-hidden="true"
          />
          {/* Live Score number near HUD */}
          <div
            className="frame-9"
            style={{ left: 164, top: -192, width: 60, height: 32 }}
            onClick={softRestart}
            role="button"
            aria-label="Restart game"
            title="Click to quick-restart"
            tabIndex={0}
          >
            <div className="text text-typo14" style={{ left: 0, top: 0, width: 60, height: 32, color: 'var(--color-fd4e3d)' }}>
              {state.score}
            </div>
          </div>
        </section>

        {/* Game container with background */}
        <section
          className="game-frame"
          style={{ left: -88, top: -345, width: 312, height: 528 }}
          aria-label="Game area container"
          data-theme={theme}
        >
          <img className="game-bg" src="/assets/figma_image_66_224.png" alt="" />

          {/* Interactive GRID region replacing the placeholder */}
          <div
            className="game-grid snake-grid"
            role="grid"
            aria-label="Snake grid"
            style={gridStyle}
            ref={gridRegionRef}
          >
            {renderCells}
          </div>

          {/* Paused message overlay centered within the grid area */}
          {!state.running && state.alive && (
            <div
              className="hud"
              style={{ top: 24, left: 16, right: 16, justifyContent: 'center' }}
            >
              <div className="hud-badge">Press ▶ or Space to play</div>
            </div>
          )}

          {/* Game over badge */}
          {!state.alive && (
            <div
              className="hud"
              style={{ top: 24, left: 16, right: 16, justifyContent: 'center' }}
            >
              <div
                className="hud-badge"
                style={{ background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.35)', color: '#7f1d1d' }}
              >
                Game Over — Click score to restart
              </div>
            </div>
          )}

          {/* Controls overlay: left/right and center start/pause tied to engine */}
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
            <div
              className="left-frame"
              style={{ left: -84, top: 0, width: 143, height: 85 }}
              onClick={() => handleControl('left')}
              role="button"
              aria-label="Move left"
              tabIndex={0}
            >
              <div className="left-bg rect-476" />
              <svg className="poly poly-left" viewBox="0 0 32 32" width="32" height="32" style={{ left: 54, top: 19 }}>
                <polygon points="32,0 0,16 32,32" fill="var(--color-444444)" stroke="var(--color-000000)" strokeWidth="1" />
              </svg>
            </div>

            {/* Center control: Start/Pause */}
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
                cursor: 'pointer',
              }}
              onClick={toggleStartPause}
              role="button"
              aria-label={state.running ? 'Pause' : 'Start'}
              tabIndex={0}
            >
              <div className="text text-typo10" aria-hidden="true">{state.running ? 'Pause' : 'Start'}</div>
            </div>

            {/* Right control */}
            <div
              className="right-frame"
              style={{ right: -84, top: 0, width: 143, height: 85, position: 'absolute' }}
              onClick={() => handleControl('right')}
              role="button"
              aria-label="Move right"
              tabIndex={0}
            >
              <div className="right-bg rect-476" />
              <svg className="poly poly-right" viewBox="0 0 32 32" width="32" height="32" style={{ left: 54, top: 19 }}>
                <polygon points="0,0 32,16 0,32" fill="var(--color-444444)" stroke="var(--color-000000)" strokeWidth="1" />
              </svg>
            </div>
          </div>
        </section>

        {/* Decorative elements preserved and left non-interactive */}
        <div className="component-1" style={{ left: 160, top: -380, width: 16, height: 16 }}>
          <div className="gem" />
        </div>

        <img
          className="image-2"
          src="/assets/figma_image_27_231.png"
          alt=""
          style={{ left: -87, top: -390, width: 88, height: 30 }}
        />

        {/* Non-essential visual-only elements remain hidden (per design css they have opacity:0) */}
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
