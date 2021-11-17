import React, { Component } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default class NavBar extends Component {
    render() {
        return (
                <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:"20px"}}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">FakeShop</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/page2">Page2</Nav.Link>
                            <Nav.Link as={Link} to="/page3">Page3</Nav.Link>
                            <Nav.Link as={Link} to="/example">Example</Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}
