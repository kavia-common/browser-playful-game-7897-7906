# Ocean Snake — React Browser Game

A modern, responsive Snake game built with React. Steer the snake to eat food, grow longer, and avoid walls and yourself. Styled with the Ocean Professional theme: blue and amber accents, subtle gradients, rounded corners, and smooth transitions.

## Features

- Centralized layout: header (title + live score), game grid, bottom controls
- Classic Snake gameplay (keyboard and mobile-friendly with a virtual D-pad)
- Live score equals number of food eaten
- Responsive grid that scales to device size
- Clean, modern design using pure CSS (no heavy UI framework)
- Modular engine (pure logic) separated from React view
- Future-ready structure for Supabase integration (e.g., leaderboards)

## Controls

- Keyboard: Arrow Keys or WASD to move, Space/Enter to start/pause
- Mobile: On-screen D-pad (appears on small screens)
- Footer: Start/Pause and Reset buttons

## Scripts

- `npm start` — development server at http://localhost:3000
- `npm test` — run tests
- `npm run build` — production build

## Theme

Colors (in CSS variables):
- primary: `#2563EB`
- secondary: `#F59E0B`
- error: `#EF4444`
- background: `#f9fafb`
- surface: `#ffffff`
- text: `#111827`

See:
- `src/styles/theme.css` — variables and base resets
- `src/styles/app.css` — layout and components (including Snake styles)

## Project Structure

- `src/App.js` — app shell
- `src/components/Game.jsx` — Snake UI and controls
- `src/components/snake/SnakeEngine.js` — pure gameplay logic (no rendering)
- `src/components/Header.jsx` — title + score
- `src/components/FooterControls.jsx` — start/pause/reset
- `src/context/ScoreContext.jsx` — session score state
- `src/context/ThemeContext.jsx` — theme provider

## Supabase (optional, not required yet)

Environment variables (reserved for future use):
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_KEY`

Not used in this version; the structure allows easy integration later (e.g., leaderboards).

## Accessibility

- Keyboard play with Arrow Keys/WASD
- Clear ARIA labels for key regions and dynamic score updates
