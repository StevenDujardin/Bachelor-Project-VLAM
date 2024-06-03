// Login.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../pages/login";

describe("Login component", () => {
  it("renders email and password fields correctly", () => {
    render(<Login />);

    // Check if email input field is rendered
    const emailInput = screen.getByPlaceholderText("Username");
    expect(emailInput).toBeInTheDocument();

    // Check if password input field is rendered
    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeInTheDocument();
  });

  it("toggles password visibility when eye icon is clicked", () => {
    render(<Login />);

    // Get the eye icon element
    const eyeIcon = screen.getByTestId("eye-icon");

    // Get the password input field
    const passwordInput = screen.getByPlaceholderText("Password");

    // Initially, password should be hidden
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click the eye icon to toggle password visibility
    fireEvent.click(eyeIcon);

    // Password should now be visible
    expect(passwordInput).toHaveAttribute("type", "text");

    // Click the eye icon again to toggle password visibility
    fireEvent.click(eyeIcon);

    // Password should now be hidden again
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
