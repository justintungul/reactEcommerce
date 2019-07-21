import React from 'react';

import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SigninForm = () => (
    <Form>
        <h1 className="mt-3">Sign In</h1>
        <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Sign In
        </Button>
        <span className="ml-2">or <Link to="/register">Register</Link></span>
    </Form>
)

export default SigninForm;