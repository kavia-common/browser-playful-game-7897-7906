import React, { useCallback, useEffect, useState } from 'react';
import { useScore } from '../context/ScoreContext';

/**
 * PUBLIC_INTERFACE
 * FooterControls
 * Bottom control bar containing Start/Pause and Reset actions
 * and quick usage hints.
 */
export function FooterControls() {
  const { resetScore } = useScore();
  const [running, setRunning] = useState(false);

  const syncRunning = useCallback(() => {
    const r = window.__oceanGame?.isRunning?.() || false;
    setRunning(r);
  }, []);

  useEffect(() => {
    const id = setInterval(syncRunning, 150);
    return () => clearInterval(id);
  }, [syncRunning]);

  const onStartPause = () => {
    if (running) {
      window.__oceanGame?.stop?.();
    } else {
      window.__oceanGame?.start?.();
    }
    syncRunning();
  };

  const onReset = () => {
    window.__oceanGame?.stop?.();
    resetScore();
    setTimeout(() => window.__oceanGame?.start?.(), 100);
  };

  return (
    <footer className="footer" aria-label="Game controls">
      <div className="help" aria-hidden="true">
        Tip: Use <span className="kbd">Space</span> / <span className="kbd">Enter</span>
      </div>
      <div className="controls">
        <button className="btn btn-primary" onClick={onStartPause}>
          {running ? 'Pause' : 'Start'}
        </button>
        <button className="btn btn-ghost" onClick={onReset}>
          Reset
        </button>
      </div>
      <div />
    </footer>
  );
}
