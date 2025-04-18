import { fireEvent, render, screen } from '@testing-library/react'
import SignIn from './SignIn'
import { expect, describe, it, beforeEach, afterEach } from 'vitest'
import React from 'react'
import { buttonAction } from './SignIn'
import userEvent from '@testing-library/user-event'

describe('SignIn', () => {
    it('Renders the SignIn component', () => {
        render(<SignIn />);
        const headerSignInElement = screen.getByText("Sign In:");
        const emailLabelElement = screen.getByText("Email:");
        const passLabelElement = screen.getByText("Password:");
        const submitButtonElement = screen.getByText("Submit");
        const questionElement = screen.getByText("Don't Have an Account?");
        expect(headerSignInElement).toBeInTheDocument();
        expect(emailLabelElement).toBeInTheDocument();
        expect(passLabelElement).toBeInTheDocument();
        expect(submitButtonElement).toBeInTheDocument();
        expect(questionElement).toBeInTheDocument();
    })
})

describe('alert', () => {
    it('Input fields are cleared', async () => {
        render(<SignIn />);
        const passwordInput = screen.getByLabelText(/password/i)
        const emailInput = screen.getByLabelText(/email/i)
        const submitButton = screen.getByRole('button', { name: /submit/i });

        await userEvent.type(emailInput, 'ncroulet@gmail.com');

        await userEvent.click(submitButton);

        expect(passwordInput).toHaveValue('');


    })
})