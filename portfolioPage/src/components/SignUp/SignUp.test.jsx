import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import SignUp from './SignUp';

describe("SignUp Component", () => {
  it("renders the sign-up form correctly", () => {
    render(<SignUp />);

    const titleElement = screen.getByText("Sign Up");
    expect(titleElement).toBeInTheDocument();
    expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("allows the user to fill out the form fields", async () => {
    render(<SignUp />);
    const user = userEvent.setup();
    const emailInput = screen.getByLabelText("Email:");
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");

    await user.type(emailInput, "test@example.com");
    await user.type(usernameInput, "testuser");
    await user.type(passwordInput, "securePassword123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(usernameInput).toHaveValue("testuser");
    expect(passwordInput).toHaveValue("securePassword123");
  });

})