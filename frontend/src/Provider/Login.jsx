import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./authProvider";
import React, { useState, useEffect } from 'react';
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
    setToken('token');
    navigate("/", { replace: true });
  };

  

  async function login (e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting');
    try {
      await loginUser (u, p);
      setStatus('success');
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
          rej (new Error('Incorrect username or password. 1'));
        } else {
          res();
        }
      })
    })
  }

  return (
    <>
      <div>
        <h1>Login</h1> <br />
      </div>
      <div>
        <form onSubmit={login}>
          <label for="username">Username: </label>
          <input type="text" id="username" value={form.username} 
            onChange={(e) => updateForm({username: e.target.value})} />

          <label for="password">Password: </label>
          <input type="text" id="password" value={form.password}
            onChange={(e) => updateForm({password: e.target.value})} />

          <button disabled={form.userame === "" || form.password === "" || status === "submitting"}>
            Submit
          </button>

          {isValid && status === 'success' && <p>Success! Logging you in...</p>}
          {!isValid && status === 'incorrect' && <p>Incorrect username or password.</p>}

          {error != null && <p>{error.message}</p>}
        </form>
      </div>
    </>
  )
};

export default Login;