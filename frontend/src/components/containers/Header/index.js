import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

import './header.scss';

class Header extends Component {
    
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <div className="container">
                    <Navbar.Brand>React Shop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                        <Nav>
                            <Link className="nav-link" to="/">Home</Link>
                            <Nav.Link href="#home">Shop</Nav.Link>
                            <Nav.Link href="#home">Contact</Nav.Link>
                            <Nav.Link href="#home"><FontAwesomeIcon icon={faUserCircle} /></Nav.Link>
                            <Link className="nav-link" to="/signin">Sign In</Link>
                            <Link className="nav-link" to="/register">Register</Link>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}

export default Header;