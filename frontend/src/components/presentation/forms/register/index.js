import React, { Component } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/user/register', this.state)
            .then(res => {
                if (res.data.status) {
                    this.props.onSubmit(this.state);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1 className="mt-3">Register</h1>
                <Form.Row>
                    <Form.Group as={Col}>
                        {/* <Form.Label>First Name</Form.Label> */}
                        <Form.Control type="text" placeholder="First Name" name="firstName" onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        {/* <Form.Label>Last Name</Form.Label> */}
                        <Form.Control type="text" placeholder="Last Name" name="lastName" onChange={this.handleInputChange} />
                    </Form.Group>
                </Form.Row>

                <Form.Group>
                    {/* <Form.Label>Email</Form.Label> */}
                    <Form.Control placeholder="Email" name="email" onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    {/* <Form.Label>Password</Form.Label> */}
                    <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Register
                </Button>
                <span className="ml-2">or <Link to="/signin">Sign In</Link></span>
            </form>
        );
    }
}

export default RegisterForm;