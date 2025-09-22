import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Ocean Snake header and score', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /ocean snake/i })).toBeInTheDocument();
  expect(screen.getByText(/score/i)).toBeInTheDocument();
});
