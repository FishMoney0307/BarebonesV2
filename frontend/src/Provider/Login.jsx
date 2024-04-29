import { useNavigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import React, { useState } from 'react';
//import jwt from 'jsonwebtoken';

const Login = () => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  //For MongoDB
  const [form, setForm] = useState ({
    username: "",
    password: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();

  const handleLogin = () => {
    setToken('token');
    navigate("/", { replace: true });
  };

  

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

  function updateForm (value) {
    return setForm ((prev) => {
      return { ...prev, ...value };
    })
  }

  return (
    <>
      <div>
        <h1>Login</h1> <br />
      </div>
      <div>
        <form onSubmit={login}>
          <input type="text" id="username" value={form.username} 
            onChange={(e) => updateForm({username: e.target.value})} />
          <label for="username">Username: </label>

          <input type="text" id="password" value={form.password}
            onChange={(e) => updateForm({password: e.target.value})} />
          <label for="password">Password: </label>

          <input type="submit" value="Submit" />

          {error != null && <p>{error.message}</p>}
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