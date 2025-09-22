import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';

// Placeholder for future Supabase integration
// const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
// const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

const ScoreContext = createContext({
  score: 0,
  addScore: (_n) => {},
  resetScore: () => {},
  resetSessionIfNew: () => {},
});

/**
 * PUBLIC_INTERFACE
 * ScoreProvider
 * Manages the user's session score and provides functions to update or reset it.
 * Structured to allow easy enhancement (e.g., persisting to Supabase later).
 */
export function ScoreProvider({ children }) {
  const [score, setScore] = useState(0);
  const sessionStarted = useRef(Date.now());

  const addScore = useCallback((n) => {
    setScore((s) => Math.max(0, s + n));
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
    sessionStarted.current = Date.now();
  }, []);

  const resetSessionIfNew = useCallback(() => {
    // No-op for now; placeholder to reset per session or when user changes.
    // Designed so we could compare a session ID later.
    return;
  }, []);

  const value = useMemo(
    () => ({
      score,
      addScore,
      resetScore,
      resetSessionIfNew,
      sessionStartedAt: sessionStarted.current,
    }),
    [score, addScore, resetScore, resetSessionIfNew]
  );

  return <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useScore
 * Hook to access score values and actions.
 */
export function useScore() {
  return useContext(ScoreContext);
}
