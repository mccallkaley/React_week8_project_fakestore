import React, { Component } from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {Link} from 'react-router-dom'

   //var user = JSON.parse(localStorage.getItem('user')); or('username')
export default class NavBar extends Component {
    render() {
        
        return (
                <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:"20px"}}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">FakeShop</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {this.props.token ?
                            <>
                                
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                                <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                                  
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
                        <span className="float-end" style={{color:'white'}}>Welcome, {this.props.user}</span>
                        
                        <span className="float-end" style={{color:'white'}}>total: ${this.props.getCartTotalPrice().toFixed(2)}, items:{this.props.getCartItemTotal()}</span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                // <input onChange={(event)=>this.props.setUser(event.target.value)}></input>


        )
    }
}
