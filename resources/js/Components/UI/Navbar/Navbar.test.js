import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Navbar } from './index';
import { useAuth } from '../../../hooks/useAuth.js';

// Mock the useAuth hook
jest.mock('../../../hooks/useAuth');

describe('Navbar Component', () => {
  const mockToggleSidebar = jest.fn();

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders correctly when user is not authenticated', () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    render(<Navbar onToggleSidebar={mockToggleSidebar} />);

    // Logo should be visible
    expect(screen.getByText('Laravel GitHub')).toBeInTheDocument();

    // Menu toggle should be visible
    expect(screen.getByLabelText('open drawer')).toBeInTheDocument();

    // User menu should not be visible
    expect(
      screen.queryByLabelText('account of current user'),
    ).not.toBeInTheDocument();
  });

  it('renders user menu when authenticated', () => {
    useAuth.mockReturnValue({
      user: { name: 'John Doe', email: 'john@example.com' },
      isAuthenticated: true,
    });

    render(<Navbar onToggleSidebar={mockToggleSidebar} />);

    // User avatar should be visible
    expect(
      screen.getByLabelText('account of current user'),
    ).toBeInTheDocument();

    // Click user menu
    fireEvent.click(screen.getByLabelText('account of current user'));

    // Menu items should be visible
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls onToggleSidebar when menu icon is clicked', () => {
    useAuth.mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    render(<Navbar onToggleSidebar={mockToggleSidebar} />);

    fireEvent.click(screen.getByLabelText('open drawer'));
    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
