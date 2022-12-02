import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul className="nav-list">
          <NavItem to="/">
            Search
          </NavItem>
          <NavItem to="/my-favorites">
            My favorites
          </NavItem>
        </ul>
      </nav>
    </header>
  )
}

const NavItem = ({ to, children }: {to: string, children?: React.ReactNode}) => {
  return (
    <li className="nav-item">
      <Link to={to} className="nav-item__link">{children}</Link>
    </li>
  )
}

export default Header;
