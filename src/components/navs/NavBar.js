import React from 'react';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';
import companyLogo from '../../images/logo.png';
import './NavBar.css'
import { NavLink } from 'react-router-dom'
class NavBar extends React.Component {
    constructor(){
        super();
        this.signOut = this.signOut.bind(this);
        this.login = this.login.bind(this);
    }
    signOut(){
        console.log("signOut")
        sessionStorage.setItem('user', null);
        window.location.href = localStorage.getItem('defaultpage')
      }
    login(){
        console.log("signIn")
        window.location.href = localStorage.getItem('defaultpage')
    }
    render() {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href={localStorage.getItem('defaultpage')}>
                    <img src={companyLogo} width="50" height="38" alt=""/>
                </Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink  to="/parking_attendance" className="nav-items" activeClassName={"nav-link-selected"}>Посещаемость паркингов</NavLink>
                    <NavLink  to="/transactions" className="nav-items" activeClassName={"nav-link-selected"}>Транзакции</NavLink>
                    <NavLink  to="/operations_center" className="nav-items" activeClassName={"nav-link-selected"}>Оперативный центр</NavLink> 
                    <NavLink  to="/users" className="nav-items" activeClassName={"nav-link-selected"}>Пользователи</NavLink>
                    <NavLink  to="/chat" className="nav-items" activeClassName={"nav-link-selected"}>Чат</NavLink>
                </Nav>
                { (JSON.parse(sessionStorage.getItem('user')) !== null) && <Button variant='yellow' className="button-sign" onClick={this.signOut}>Sign Out</Button>}
                {!(JSON.parse(sessionStorage.getItem('user')) !== null) ? (
                <Form className="d-flex">
                    <Button variant='yellow' onClick={this.login}>Login</Button>
                </Form>
                ) : (
                    <h2 className="mt-4 text-center"> </h2>
                )}
                </Container>
            </Navbar>
        </>
    );
    }
}

export default NavBar

