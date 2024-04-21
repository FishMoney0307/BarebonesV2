import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import React from 'react';

const Signup = () => {
  
    return (
    <>
    <div>
      <h1>Sign Up</h1> <br />
    </div>
    <div>
      <form id="signup" onsubmit="signup()" target="update">
        <label for="username">Username: </label>
        <input type="text" id="username" /><br />

        <label for="password">Password: </label>
        <input type="text" id="password" /><br />

        <input type="submit" value="Submit" />
      </form>
    </div>
    </>
  )};

export default Signup;