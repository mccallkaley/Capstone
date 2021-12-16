import React, { Component } from 'react';
import {Navbar, Container, Nav, NavDropdown, NavbarBrand, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default class NavBar extends Component {
    render() {
        return (
                <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:"20px"}}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">Icy Aesthetics </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.token ?
                            <>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                                <Nav.Link as={Link} to="/dashboardpage">Dash</Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                
                                {/* admin dropdown area */}
                                {
                                    this.props.isAdmin?
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={Link} to="/createitems">Create Item</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/edititems">Edit Items</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={Link} to="/createcats">Create Category</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/editcats">Edit Category</NavDropdown.Item>
                                    </NavDropdown>
                                    :''
                                }
                                {/* end admin dropdown */}
                            </>
                            :
                            
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            
                            }
                        </Nav>
                        <Col className="d-flex justify-content-xs-start justify-content-lg-center">
                            <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdOegazwBjsH8HALw2-R7O99JCfH3ms13Gyw&usqp=CAU" alt="logo" className="position-relative img-fluid" />
                            </NavbarBrand>
                        </Col>
                        <span className="float-end">
                            <Link to="/cart" style={{color:'white', textDecoration:'none'}}>
                                <ShoppingCartIcon/>({this.props.getCartItemTotal()})  ${this.props.getCartTotalPrice().toFixed(2)}
                            </Link>
                        </span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}