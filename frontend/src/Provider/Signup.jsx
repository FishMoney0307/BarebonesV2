import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./authProvider";
import React, { useState, useEffect } from 'react';
import './Account.css';

const Signup = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  //MongoDB
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/signup/`);
      if (!response.ok) {
        const message = `An error occurred.`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records)
    }
    getRecords();
    setIsNew(true);
    validate();
    return;
  });

  async function validate() {
    records.map((record) => {
      if (record.username === form.username) {
        setIsNew(false);
      }
    })
    return;
  }

  function updateForm (value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    })
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

  return (
    <div className="backgr">
      <div></div>
      <div className="acctContainer">
        <div>
          <h1>Sign Up</h1> <br />
        </div>
        <div className="formContainer">
          <form onSubmit={signup}>
            <label for="username">Username: </label>
            <input type="text" id="username" value={form.username}
              onChange={(e) => updateForm({ username: e.target.value })} /> <br />

            <label for="password">Password: </label>
            <input type="password" id="password" value={form.password}
              onChange={(e) => updateForm({ password: e.target.value })} /> <br /> <br />

            <button className="booton" disabled={form.userame === "" || form.password === "" || !isNew || status === "submitting"}>
              Submit
            </button>

            {!isNew && <p>Username is already in use.</p>}
            {error != null && <p>{error.message}</p>}
          </form>
        </div>
      </div>
      <div></div>
    </div>
  )
};

export default Signup;