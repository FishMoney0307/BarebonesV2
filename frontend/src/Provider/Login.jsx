import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, useAuth } from "./authProvider";
import React, { useState, useEffect, useContext } from 'react';
import './Account.css'
//import jwt from 'jsonwebtoken';

const Login = () => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const { setToken } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  //For MongoDB
  const [form, setForm] = useState ({
    username: "",
    password: "",
  });
  const [records, setRecords] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const params = useParams();

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/signup`);
      if (!response.ok) {
        const message = `An error occurred.`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records)
    }
    getRecords();
    validate();
    return;
  });

  async function validate() {
    records.map((record) => {
      if (record.username === form.username && record.password === form.password) {
        setIsValid(true);
      }
    })
    return;
  }

  function updateForm (value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
  }

  const handleLogin = () => {
    navigate("/", { replace: true });
  };

  

  async function login (e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting');
    try {
      await loginUser (u, p);
      setStatus('success');
      debugger;
      await setToken('' + form.username + "abcdef");
      setTimeout(() => {
        handleLogin();
      }, 3 * 1000);
    } catch (err) {
      setStatus('incorrect');
      setError(err);
      setForm({ username: "", password: "" });
    }
  }

  function updateForm (value) {
    return setForm ((prev) => {
      return { ...prev, ...value };
    })
  }

  function loginUser(u, p) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (!isValid) {
          rej (new Error('Incorrect username or password.'));
        } else {
          res();
        }
      })
    })
  }

  return (
    <>
      <div className="backgr">
        <div></div>
        <div class="acctContainer">
          <div>
            <h1>Login</h1> <br />
          </div>
          <div className="formContainer">
            <form onSubmit={login}>
              <label for="username">Username: </label>
              <input type="text" id="username" value={form.username}
                onChange={(e) => updateForm({ username: e.target.value })} /> <br />

              <label for="password">Password: </label>
              <input type="text" id="password" value={form.password}
                onChange={(e) => updateForm({ password: e.target.value })} /> <br /> <br />

              <button className="booton" disabled={form.userame === "" || form.password === "" || status === "submitting"}>
                Submit
              </button>

              {isValid && status === 'success' && <p>Success! Logging in...</p>}

              {error != null && <p>{error.message}</p>}
              {/*token === null && <p>Token blank</p>*/}
            </form>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
};

export default Login;