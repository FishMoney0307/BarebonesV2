import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import React from 'react';

const Logout = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 3 * 1000);

  return(
    <div className="backgr">
      <div></div>
      <h1 className="acctContainer">
        Logging you out.
      </h1>
      <div></div>
    </div>
  )
};

export default Logout;