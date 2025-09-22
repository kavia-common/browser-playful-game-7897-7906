import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useScore } from '../context/ScoreContext';
import { useTheme } from '../context/ThemeContext';

/**
 * PUBLIC_INTERFACE
 * Game
 * A fast, playful target-tapping game. Click/tap or press Space/Enter when the
 * target is highlighted to earn points before the timer ends.
 * - Session score is tracked in context and displayed in header.
 * - Mobile touch + desktop mouse/keyboard supported.
 */
export function Game() {
  const surfaceRef = useRef(null);
  const { addScore, resetSessionIfNew } = useScore();
  const { theme } = useTheme();

  // Local state
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30); // seconds
  const [running, setRunning] = useState(false);
  const [combo, setCombo] = useState(0);
  const [lastTap, setLastTap] = useState(0);
  const [flash, setFlash] = useState(null); // transient combo badge

  // Reset session start time (structure for future persistence)
  useEffect(() => {
    resetSessionIfNew();
  }, [resetSessionIfNew]);

  // Countdown timer
  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setActive(false);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft]);

  const moveTarget = useCallback(() => {
    const el = surfaceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pad = 40; // avoid edges
    const x = Math.random() * (rect.width - pad * 2) + pad;
    const y = Math.random() * (rect.height - pad * 2) + pad;
    // convert to percentage
    setPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  }, []);

  const startGame = useCallback(() => {
    setRunning(true);
    setActive(true);
    setTimeLeft(30);
    setCombo(0);
    moveTarget();
  }, [moveTarget]);

  const stopGame = useCallback(() => {
    setRunning(false);
    setActive(false);
  }, []);

  const onHit = useCallback(
    (px, py) => {
      if (!running) return;
      // combo logic: if within 750ms, increase combo
      const now = Date.now();
      const within = now - lastTap < 750;
      const nextCombo = within ? combo + 1 : 1;
      setCombo(nextCombo);
      setLastTap(now);

      // base points + combo multiplier
      const gained = 10 + Math.min(40, nextCombo * 2);
      addScore(gained);

      // flash combo badge
      setFlash({ x: px, y: py, combo: nextCombo, gained });
      setTimeout(() => setFlash(null), 600);

      moveTarget();
    },
    [running, combo, lastTap, addScore, moveTarget]
  );

  // Click/tap on target
  const handleTargetPointerDown = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      onHit(rect.left + rect.width / 2, rect.top); // reference badge position
    },
    [onHit]
  );

  // Keyboard support
  useEffect(() => {
    const onKey = (e) => {
      if (!running) return;
      if (e.key === ' ' || e.key === 'Enter') {
        // treat keypress as a hit if target is active
        const el = surfaceRef.current?.querySelector('.target');
        if (el) {
          const r = el.getBoundingClientRect();
          onHit(r.left + r.width / 2, r.top);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [running, onHit]);

  // Ensure target remains within surface on resize
  useEffect(() => {
    const onResize = () => moveTarget();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [moveTarget]);

  const posStyle = useMemo(
    () => ({
      left: `${pos.x}%`,
      top: `${pos.y}%`,
    }),
    [pos]
  );

  return (
    <section
      className="game-surface"
      ref={surfaceRef}
      aria-label="Game area"
      aria-live="polite"
      data-theme={theme}
    >
      {/* HUD */}
      <div className="hud">
        <div className="hud-badge" aria-live="polite">
          ⏱️ Time: {timeLeft}s
        </div>
        {combo > 1 && <div className="hud-badge">🔥 Combo x{combo}</div>}
      </div>

      {/* Target */}
      {active && (
        <button
          className="target"
          style={posStyle}
          onPointerDown={handleTargetPointerDown}
          onClick={(e) => e.preventDefault()}
          aria-label="Tap target"
        />
      )}

      {/* Combo flash */}
      {flash && (
        <div
          className="combo"
          style={{
            left: `${(flash.x - surfaceRef.current.getBoundingClientRect().left) / surfaceRef.current.getBoundingClientRect().width * 100}%`,
            top: `${(flash.y - surfaceRef.current.getBoundingClientRect().top) / surfaceRef.current.getBoundingClientRect().height * 100}%`,
          }}
          aria-hidden="true"
        >
          +{flash.gained} • x{flash.combo}
        </div>
      )}

      {/* Empty state */}
      {!running && (
        <div className="hud" style={{ justifyContent: 'center' }}>
          <div className="hud-badge">Press Start to play</div>
        </div>
      )}

      {/* Hidden controls for screen readers */}
      <span className="visually-hidden">
        Use mouse/touch to tap the moving target. Space or Enter also counts as a hit.
      </span>

      {/* Control hooks exposed via window for footer buttons */}
      <GameControlsBridge start={startGame} stop={stopGame} isRunning={running} />
    </section>
  );
}

function GameControlsBridge({ start, stop, isRunning }) {
  // Bridge exposes functions for FooterControls without prop drilling through App
  // Simple approach since both live in same tree; avoids global store dependency.
  useEffect(() => {
    window.__oceanGame = { start, stop, isRunning: () => isRunning };
    return () => {
      if (window.__oceanGame) delete window.__oceanGame;
    };
  }, [start, stop, isRunning]);
  return null;
}
