# Ocean Tap — React Browser Game

A modern, responsive browser game built with React. Tap the moving target as fast as you can within the timer and build combos for higher scores. Designed with the Ocean Professional theme: blue and amber accents, subtle gradients, rounded corners, and smooth transitions.

## Features

- Centralized layout: header (title + score), game area, bottom controls
- Smooth, engaging gameplay (mouse, touch, keyboard friendly)
- Session-based score tracking (no auth required)
- Responsive for mobile and desktop
- Clean, modern design using pure CSS (no heavy UI framework)
- Future-ready structure for Supabase integration

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
- `src/styles/app.css` — layout and components

## Project Structure

- `src/App.js` — app shell
- `src/components/Game.jsx` — game logic and UI
- `src/components/Header.jsx` — title + score
- `src/components/FooterControls.jsx` — start/pause/reset
- `src/context/ScoreContext.jsx` — session score state
- `src/context/ThemeContext.jsx` — theme provider

## Supabase (optional, not required yet)

Environment variables:
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_KEY`

These are not used in the basic version but the contexts are structured to allow easy integration later.

## Accessibility

- Keyboard play with Space/Enter
- ARIA labels for key regions and dynamic score updates
