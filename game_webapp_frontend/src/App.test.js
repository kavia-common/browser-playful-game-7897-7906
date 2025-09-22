import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Figma-based game canvas', () => {
  render(<App />);
  // The GameScreenDesign uses a role="application" on the figma-canvas container with an aria-label.
  expect(
    screen.getByRole('application', { name: /Ocean Snake — Figma-integrated interactive canvas/i })
  ).toBeInTheDocument();
});
