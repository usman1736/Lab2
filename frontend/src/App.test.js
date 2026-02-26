import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form and app title', () => {
  render(<App />);
  expect(screen.getByText(/chuck norris facts app/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});
