import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import { Container } from 'react-bootstrap'
import './login.css' // Create this CSS file

export default function Login() {
    return (
        <section className="login-section">
            <Container className="d-flex justify-content-center align-items-center">
                <div className="signin-wrapper">
                    <SignIn />
                </div>
            </Container>
        </section>
    )
}
