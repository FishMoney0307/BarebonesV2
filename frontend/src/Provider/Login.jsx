import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import React, { useState } from 'react';

const Login = () => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    setToken("this is a test token");
    navigate("/", { replace: true });
  };
  /*
  setTimeout(() => {
    handleLogin();
  }, 3 * 1000); */

  /*
  async function login(ev) {
    ev.preventDefault();
    handleLogin();
  } */

  async function login (e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting');
    try {
      await loginUser (u, p);
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
    setTimeout(() => {
      handleLogin();
    }, 3 * 1000);
  }

  function textChangeU(ev) {
    setU(ev.target.value);
  }

  function textChangeP(ev) {
    setP(ev.target.value);
  }

  return (
    <>
      <div>
        <h1>Login</h1> <br />
      </div>
      <div>
        <form onSubmit={login}>
          <label for="username">Username: </label>
          <input type="text" id="username" value={u} onChange={textChangeU} /><br />

          <label for="password">Password: </label>
          <input type="text" id="password" value={p} onChange={textChangeP} /><br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  )
};

function loginUser(u, p) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let shouldError = (u === '' || p === '');
      if (shouldError) {
        rej (new Error('Please fill out all fields'));
      } else {
        res();
      }
    })
  })
}

export default Login;