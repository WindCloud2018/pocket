import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem} from 'reactstrap';


const Navigation = props => {
  return (
    <Nav>
      <NavItem>
        <NavLink to="/"> Summary </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/reports"> Reports </NavLink>
      </NavItem>
    </Nav>
  );

}


export default Navigation;
