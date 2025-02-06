import { SignUp } from '@clerk/clerk-react'
import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import './login.css' // Create this CSS file


export default function Register() {
  return (
    <section className="login-section">
            <Container className="d-flex justify-content-center align-items-center">
                <div className="signin-wrapper">
                    <SignUp />
                </div>
            </Container>
        </section>
  )
}

