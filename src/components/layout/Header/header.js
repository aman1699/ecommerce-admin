import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link, Redirect } from 'react-router-dom';
import Signin from './../../../containers/home/signin/index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SignOut } from './../../../actions/authaction';
const Header = (props) => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const logout = () => {
    console.log('aman')
    dispatch(SignOut());
    
  
    
  }
 const renderLoggedIn = () => {
    return  <Nav>
    {/* <Nav.Link href="#signin">Signin</Nav.Link>*/}
    <li className="nav-item">
        <NavLink to="signin" className="nav-link" onClick={logout}>Signout</NavLink>
    </li>
   </Nav>
  }
  
  const renderNonLoggedIn = () => {
           return  <Nav>
           {/* <Nav.Link href="#signin">Signin</Nav.Link>*/}
           <li className="nav-item">
             <NavLink to="signin" className="nav-link">Signin</NavLink>
           </li>
           <li className="nav-item">
               <NavLink to="signup" className="nav-link">Signup</NavLink>
           </li>
       </Nav>
         
  }  
  
  return ( 
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{zIndex:1}}>
        <Container fluid>
          {/*<Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>*/}
          <Link to="/" className="navbar-brand">Admin Dashboard</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          </Nav>
          {auth.authenticate?renderLoggedIn():renderNonLoggedIn()}
          </Navbar.Collapse>
          </Container>
      </Navbar>
     );
}
 
export default Header;
 
