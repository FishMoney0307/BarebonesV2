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
        <div>
          <NavLink className="booton" to="/jwthome">
            Login
          </NavLink>
        </div>
        <div>
          <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/create">
          Create Employee
        </NavLink>
        </div>
      </nav>
    </div>
  );
}