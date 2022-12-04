import React, { FC } from 'react';
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

interface INavItemProps {
  to: string,
  children: React.ReactNode
}

const NavItem: FC<INavItemProps> = ({ to, children }) => {
  return (
    <li className="nav-item">
      <Link to={to} className="nav-item__link">{children}</Link>
    </li>
  )
}

export default Header;
