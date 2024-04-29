import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./authProvider";
import React, { useState } from 'react';

const Signup = () => {
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const { setToken } = useAuth();
  const navigate = useNavigate();

  //MongoDB
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();

  async function fetchData() {
    const id = params.id?.toString() || undefined;
    if (!id) return;
    setIsNew(false);
    const response = await fetch(
      `http://localhost:5050/record/${params.id.toString()}`
    );
    if (!response.ok) {
      const message = `An error has occurred: ${response.statusText}`;
      console.error(message);
      return;
    }
    const record = await response.json();
    if (!record) {
      console.warn(`Record with id ${id} not found`);
      return;
    }
  }

  async function recordMongoDB () {
    const info = { ...form };
    try {
      let response;
      response = await fetch ("http://localhost:5050/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
    } catch (error) {
      console.error('A problem occurred adding a record: ', error);
    } finally {
      setForm({ username: "", password: "" });
    }
  }

  async function signup (e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting');
    try {
      await recordMongoDB();
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
    navigate("/", { replace: true });
  }

  function updateForm (value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
  }

  return (
    <>
      <div>
        <h1>Sign Up</h1> <br />
      </div>
      <div>
      <form onSubmit={signup}>
          <label for="username">Username: </label>
          <input type="text" id="username" value={form.username} 
            onChange={(e) => updateForm({username: e.target.value})} />

          <label for="password">Password: </label>
          <input type="text" id="password" value={form.password}
            onChange={(e) => updateForm({password: e.target.value})} />

          <input type="submit" value="Submit" />

          {error != null && <p>{error.message}</p>}
        </form>
      </div>
    </>
  )
};

export default Signup;