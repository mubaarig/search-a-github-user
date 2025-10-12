import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app header', () => {
  render(<App />);
  const header = screen.getByRole('heading', { name: /Search a GitHub User/i });
  expect(header).toBeInTheDocument();
});