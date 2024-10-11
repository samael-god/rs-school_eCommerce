import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '@/shared/ui/button/button';

describe('Button tests.', () => {
  it('should render a button', () => {
    render(<Button text="TestButton" />);
    expect(screen.getByText('TestButton')).toBeInTheDocument();
  });
});
