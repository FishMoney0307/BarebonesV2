/* import { Outlet, Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/mongo">Database</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Navbar; */

import { NavLink } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar" >
        
        <div>
          <NavLink className="booton" to="/">
            Home
          </NavLink>
        </div>
        <div>
          <NavLink className="booton" to="/about">
            About
          </NavLink>
        </div>
        <div>
          <NavLink className="booton" to="/contact">
            Contact Me
          </NavLink>
        </div>
      </nav>
    </div>
  );
}