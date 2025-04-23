import { render, screen } from '@testing-library/react'
import App from './App'
import SignIn from './SignIn'

describe('SignIn', () => {
    it('Renders the SignIn component', () => {
        render(<SignIn />);
        const headerSignInElement = screen.getByText("Sign In:");
        expect(headerSignInElement).toBeInTheDocument();
    })
})