import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useScore } from '../context/ScoreContext';
import { useTheme } from '../context/ThemeContext';
import { SnakeEngine } from './snake/SnakeEngine';

/**
 * PUBLIC_INTERFACE
 * Game
 * Classic Snake game with keyboard and mobile touch/virtual controls.
 * - Session score is tracked as number of food eaten (snake length - initial length).
 * - Responsive grid centered in the layout with Ocean Professional theme styling.
 */
export function Game() {
  const surfaceRef = useRef(null);
  const { addScore, resetSessionIfNew, resetScore } = useScore();
  const { theme } = useTheme();

  // Grid config responsive to container
  const [grid, setGrid] = useState({ cols: 20, rows: 20, cellPx: 0 });
  const [state, setState] = useState({
    cols: 20,
    rows: 20,
    snake: [],
    food: { x: -1, y: -1 },
    score: 0,
    alive: true,
    running: false,
  });

  const engineRef = useRef(null);

  // Initialize session
  useEffect(() => {
    resetSessionIfNew();
  }, [resetSessionIfNew]);

  // Setup engine when grid changes
  useEffect(() => {
    engineRef.current = new SnakeEngine({
      cols: grid.cols,
      rows: grid.rows,
      onChange: (s) => {
        setState(s);
        // Sync score to ScoreContext
        // We keep ScoreContext as the display-of-truth for header
        // s.score already represents foods eaten.
        addScore(s.score - (state.score ?? 0));
      },
    });
    // Ensure displayed score matches engine
    resetScore();
    setState((prev) => ({ ...prev, score: 0 }));
    return () => {
      engineRef.current?.stop?.();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid.cols, grid.rows]);

  // Window control bridge for FooterControls
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

  // Keyboard controls
  useEffect(() => {
    const onKey = (e) => {
      if (!engineRef.current) return;
      const k = e.key.toLowerCase();
      if (k === 'arrowup' || k === 'w') engineRef.current.setDirection('up');
      else if (k === 'arrowdown' || k === 's') engineRef.current.setDirection('down');
      else if (k === 'arrowleft' || k === 'a') engineRef.current.setDirection('left');
      else if (k === 'arrowright' || k === 'd') engineRef.current.setDirection('right');
      else if (k === ' ' || k === 'enter') {
        // quick start/pause toggle
        if (engineRef.current.isRunning()) engineRef.current.stop();
        else engineRef.current.start();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Virtual controls for mobile
  const handleControl = (dir) => engineRef.current?.setDirection?.(dir);

  // Resize observer to adapt grid and cell size responsively
  useEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;

    const computeGrid = () => {
      const rect = el.getBoundingClientRect();
      // Pick a cell size that fits neatly; target around 24-28px for mobile, 24-32+ for desktop
      const idealCell = Math.max(20, Math.min(32, Math.floor(rect.width / 20)));
      const cols = Math.max(16, Math.min(28, Math.floor(rect.width / idealCell)));
      const rows = cols; // keep square
      const cellPx = Math.floor(rect.width / cols);
      setGrid({ cols, rows, cellPx });
    };

    computeGrid();
    const ro = new ResizeObserver(computeGrid);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Derived styles
  const gridStyle = useMemo(() => {
    const gap = 2; // visual gap between cells
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${grid.cols}, 1fr)`,
      gridTemplateRows: `repeat(${grid.rows}, 1fr)`,
      gap: `${Math.max(1, Math.floor(grid.cellPx * 0.08))}px`,
      width: '100%',
      height: '100%',
      padding: `${Math.max(6, Math.floor(grid.cellPx * 0.2))}px`,
    };
  }, [grid]);

  const renderCells = useMemo(() => {
    const cells = new Array(grid.rows * grid.cols).fill(0);
    const snakeSet = new Set(state.snake.map((s) => `${s.x},${s.y}`));
    const foodKey = `${state.food.x},${state.food.y}`;

    return cells.map((_, idx) => {
      const x = idx % grid.cols;
      const y = Math.floor(idx / grid.cols);
      const key = `${x},${y}`;
      const isSnake = snakeSet.has(key);
      const isHead = isSnake && state.snake[state.snake.length - 1]?.x === x && state.snake[state.snake.length - 1]?.y === y;
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

  return (
    <section
      className="game-surface snake-surface"
      ref={surfaceRef}
      aria-label="Snake game area"
      aria-live="polite"
      data-theme={theme}
    >
      {/* HUD */}
      <div className="hud">
        <div className="hud-badge" aria-live="polite">
          🐍 Length: {state.snake.length}
        </div>
        <div className="hud-badge" aria-live="polite">
          ⭐ Score: {state.score}
        </div>
        {!state.alive && (
          <div className="hud-badge" style={{ background: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.35)', color: '#7f1d1d' }}>
            Game Over
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="snake-grid" style={gridStyle} role="grid" aria-label="Snake grid">
        {renderCells}
      </div>

      {/* Empty/Paused state */}
      {!state.running && state.alive && (
        <div className="hud" style={{ justifyContent: 'center' }}>
          <div className="hud-badge">Press Start or Space to play</div>
        </div>
      )}

      {/* Virtual Controls (mobile) */}
      <div className="snake-controls" aria-label="Virtual controls">
        <div className="pad-row">
          <button className="btn btn-ghost d-btn" onClick={() => handleControl('up')} aria-label="Up">▲</button>
        </div>
        <div className="pad-row">
          <button className="btn btn-ghost d-btn" onClick={() => handleControl('left')} aria-label="Left">◀</button>
          <button
            className={`btn ${state.running ? 'btn-ghost' : 'btn-primary'} d-btn center`}
            onClick={() => (engineRef.current?.isRunning() ? engineRef.current?.stop() : engineRef.current?.start())}
            aria-label={state.running ? 'Pause' : 'Start'}
          >
            {state.running ? '❚❚' : '▶'}
          </button>
          <button className="btn btn-ghost d-btn" onClick={() => handleControl('right')} aria-label="Right">▶</button>
        </div>
        <div className="pad-row">
          <button className="btn btn-ghost d-btn" onClick={() => handleControl('down')} aria-label="Down">▼</button>
        </div>
      </div>
    </section>
  );
}
