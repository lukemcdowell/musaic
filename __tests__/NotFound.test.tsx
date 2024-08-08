import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../src/app/not-found';

describe('NotFound', () => {
  it('should render the "404" message', () => {
    render(<NotFound />);
    const message404 = screen.getByText('404');
    expect(message404).toBeInTheDocument();
    const messagePageNotFound = screen.getByText('Page Not Found');
    expect(messagePageNotFound).toBeInTheDocument();
  });

  it('should render a button to return to the home page', () => {
    render(<NotFound />);
    const linkElement = screen.getByRole('link', {
      name: /return to home/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
