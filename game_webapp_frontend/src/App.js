import React from 'react';
import './styles/theme.css';
import './styles/app.css';
import './styles/figma-canvas.css';
import { ThemeProvider } from './context/ThemeContext';
import { ScoreProvider } from './context/ScoreContext';
import { GameScreenDesign } from './components/GameScreenDesign';

/**
 * PUBLIC_INTERFACE
 * App
 * The main application shell.
 * Renders the Figma-based GameScreenDesign as the single UI entry point.
 */
function App() {
  return (
    <ThemeProvider>
      <ScoreProvider>
        <div className="app-root">
          <div className="app-gradient" />
          <main className="game-wrapper" id="game-wrapper" aria-label="Ocean Snake game">
            <div style={{ width: '100%' }}>
              <GameScreenDesign />
            </div>
          </main>
        </div>
      </ScoreProvider>
    </ThemeProvider>
  );
}

export default App;
