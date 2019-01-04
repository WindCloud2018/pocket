import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import './Navigation.css';


const Navigation = props => {
  return (
    <Nav className="nav">
      <NavItem className="nav-link">
        <NavLink to="/"> Summary </NavLink>
      </NavItem>
      <NavItem className="nav-link">
        <NavLink to="/reports"> Reports </NavLink>
      </NavItem>
    </Nav>
  );
}


export default Navigation;
