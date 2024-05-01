import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './authProvider';
import '../Navbar.css';
import './Account.css';

const Account = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  function redirectLogin() {
    navigate("/login", { replace: true });
  }

  function redirectLogout() {
    navigate("/logout", { replace: true });
  }

  function redirectSignup() {
    navigate("/signup", { replace: true });
  }

  return (
    <div className="backgr">
        <div></div>
        <div>
      <div class="acctContainer">
        <button onClick={redirectLogin} disabled={token} className="booton">Login</button> <br />
        <button onClick={redirectLogout} disabled={!token} className="booton">Logout</button> <br />
        <button onClick={redirectSignup} className="booton">Create New User</button> <br />
      </div>
      <div></div>
      </div>
    </div>
  )
}

export default Account;