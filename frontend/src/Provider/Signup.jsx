import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import React, { useState } from 'react';

const Login = () => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [m, setM] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const { setToken } = useAuth();
  const navigate = useNavigate();


  async function signup (e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting');
    try {
      await signUpUser (u, p, m);
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
    navigate("/", { replace: true });
  }

  function textChangeU(ev) {
    setU(ev.target.value);
  }
  function textChangeP(ev) {
    setP(ev.target.value);
  }
  function textChangeM(ev) {
    setM(ev.target.value);
  }

  return (
    <>
      <div>
        <h1>Sign Up</h1> <br />
      </div>
      <div>
        <form onSubmit={signup}>
          <label for="username">Username: </label>
          <input type="text" id="username" value={u} onChange={textChangeU} /><br />

          <label for="password">Password: </label>
          <input type="text" id="password" value={p} onChange={textChangeP} /><br />

          <label for="mail">Username: </label>
          <input type="email" id="mail" value={m} onChange={textChangeM} /><br />

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  )
};

function signUpUser(u, p) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let shouldError = (u === '' || p === '' || m === '');
      if (shouldError) {
        rej (new Error('Please fill out all fields'));
      } else {
        // add to mongoDB
        res();
      }
    })
  })
}

export default Login;