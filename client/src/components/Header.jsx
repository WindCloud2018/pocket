import React from 'react';
import './Header.css';
import Navigation from './Navigation';

const Header = () => {
  return (
    <div className="header">
      <h1>Pocket</h1>
      <Navigation />
    </div>
  );
}

export default Header;
