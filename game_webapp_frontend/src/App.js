import React from 'react';
import './styles/theme.css';
import './styles/app.css';
import { Game } from './components/Game';
import { Header } from './components/Header';
import { FooterControls } from './components/FooterControls';
import { ThemeProvider } from './context/ThemeContext';
import { ScoreProvider } from './context/ScoreContext';

/**
 * PUBLIC_INTERFACE
 * App
 * The main application shell. Provides Theme and Score contexts,
 * and composes the header, game area, and footer controls following
 * the "Ocean Professional" theme and layout.
 */
function App() {
  return (
    <ThemeProvider>
      <ScoreProvider>
        <div className="app-root">
          <div className="app-gradient" />
          <div className="app-container" role="application" aria-label="Ocean Tap game">
            <Header />
            <main className="game-wrapper" id="game-wrapper">
              <Game />
            </main>
            <FooterControls />
          </div>
        </div>
      </ScoreProvider>
    </ThemeProvider>
  );
}

export default App;
