import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './index';

describe('Button Component', () => {
  it('renders children correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>,
    );

    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    const { getByText } = render(<Button loading>Click me</Button>);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('disables button when loading or disabled prop is true', () => {
    const { getByRole, rerender } = render(<Button loading>Click me</Button>);
    expect(getByRole('button')).toBeDisabled();

    rerender(<Button disabled>Click me</Button>);
    expect(getByRole('button')).toBeDisabled();
  });
});
