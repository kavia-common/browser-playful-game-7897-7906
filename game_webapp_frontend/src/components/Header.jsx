import React from 'react';
import { useScore } from '../context/ScoreContext';

/**
 * PUBLIC_INTERFACE
 * Header
 * Displays the app title and the current session score.
 */
export function Header() {
  const { score } = useScore();

  return (
    <header className="header">
      <div className="brand" aria-label="Ocean Snake brand">
        <div className="brand-badge" aria-hidden>O</div>
        <h1 className="title">Ocean Snake</h1>
      </div>
      <div className="score-chip" aria-live="polite" aria-atomic="true" title="Current score">
        ⭐ Score
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{score}</span>
      </div>
    </header>
  );
}
