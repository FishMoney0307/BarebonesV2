import { NavLink } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar" > 
        <div>
          <NavLink className="booton" to="/">Home</NavLink>
        </div>
        <div>
          <NavLink className="booton" to="/about">About</NavLink>
        </div>
        <div>
          <NavLink className="booton" to="/contact">Contact Me</NavLink>
        </div>
        <div>
          <NavLink className="booton" to="/login">Login</NavLink>
        </div>
        <div>
          <NavLink className="booton" to="/signup">Create New User</NavLink>
        </div>
      </nav>
    </div>
  );
}