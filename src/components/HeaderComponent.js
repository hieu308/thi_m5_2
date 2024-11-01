import React from "react";
import{Link} from 'react-router-dom';
import { Nav, Navbar, Container } from "react-bootstrap";
function HeaderComponent(){

    return(
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Book</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/list">List Book</Nav.Link>
                    <Nav.Link as={Link} to="/add">Add Book</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    )
}
export default HeaderComponent;