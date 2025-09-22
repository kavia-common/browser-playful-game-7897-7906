import React, { useState } from 'react';
import './styles/theme.css';
import './styles/app.css';
import './styles/figma-canvas.css';
import { Game } from './components/Game';
import { Header } from './components/Header';
import { FooterControls } from './components/FooterControls';
import { ThemeProvider } from './context/ThemeContext';
import { ScoreProvider } from './context/ScoreContext';
import { GameScreenDesign } from './components/GameScreenDesign';

/**
 * PUBLIC_INTERFACE
 * App
 * The main application shell. Provides Theme and Score contexts,
 * and composes the header, game area, and footer controls following
 * the "Ocean Professional" theme and layout.
 */
function App() {
  const [showDesign, setShowDesign] = useState(false);

  return (
    <ThemeProvider>
      <ScoreProvider>
        <div className="app-root">
          <div className="app-gradient" />
          <div className="app-container" role="application" aria-label="Ocean Tap game">
            <Header />
            <main className="game-wrapper" id="game-wrapper">
              {showDesign ? (
                <div style={{ width: '100%' }}>
                  <GameScreenDesign />
                </div>
              ) : (
                <Game />
              )}
            </main>
            <footer className="footer" aria-label="View toggles">
              <div className="help" aria-hidden="true">
                Design preview toggle (for developers)
              </div>
              <div className="controls">
                <button
                  className={`btn ${showDesign ? 'btn-ghost' : 'btn-primary'}`}
                  onClick={() => setShowDesign(false)}
                  aria-pressed={!showDesign}
                >
                  Play Game
                </button>
                <button
                  className={`btn ${showDesign ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setShowDesign(true)}
                  aria-pressed={showDesign}
                >
                  Show Design
                </button>
              </div>
              <div />
            </footer>
            <FooterControls />
          </div>
        </div>
      </ScoreProvider>
    </ThemeProvider>
  );
}

export default App;
