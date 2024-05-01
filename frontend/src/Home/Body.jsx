import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Body.css';
import '../Navbar.css'
import Submit from './Submit.jsx';
import Description from './Description.jsx';
import DBList from './DBList.jsx';
import CRUD from '../CRUD/CRUD.jsx';
import Login from '../Provider/Login.jsx';
import RecordList from '../Components/RecordList.jsx';
import { AuthContext } from '../Provider/authProvider.jsx';

const Body = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  function login() {
    navigate("/login", { replace: true });
  }

  return (
    <body>
      <div className="bigContainer">
        <div>
          <div className="smallContainer">
            <div><Description /></div>
            <div><Submit /></div>
          </div>
        </div>
        <div>
          <div className="smallContainer" style={{marginTop: "50px", marginBottom: "50px"}}>
            {!token && 
            <div><p>You are not yet authenticated. Please login to access the database.</p><br />
              <button className="booton" onClick={login}>Login</button></div>}
          </div>
          <div className="smallContainer" style={{marginTop: "50px", marginBottom: "50px"}}>
            {token != null && <RecordList />}
          </div>
        </div>
      </div>
    </body>
  )
}

export default Body