import { NavLink } from "react-router-dom";
import React from 'react';

import './Navbar.css';

export default function Navbar() {
  return (
    <div>
      <div className="navbar" > 
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
          <NavLink className="booton" to="/account">Account</NavLink>
        </div>
      </div>
    </div>
  );
}