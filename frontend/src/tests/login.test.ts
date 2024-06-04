import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../pages/login';

describe('Login', () => {
  it('renders email and password fields', () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('toggles password visibility when eye icon is clicked', () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const eyeIcon = screen.getByTestId('eye-icon');

    expect(passwordInput.type).toBe('password');

    fireEvent.click(eyeIcon);

    expect(passwordInput.type).toBe('text');
  });

  it('displays easter egg message when form is double-clicked', () => {
    render(<Login />);

    const easterEggMessage = 'by Pip and Tokke :)';
    const form = screen.getByRole('form');

    fireEvent.doubleClick(form);

    expect(screen.getByText(easterEggMessage)).toBeInTheDocument();
  });

  // Add more tests as needed
});
