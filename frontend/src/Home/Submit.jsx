import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

const Submit = () => {
  const [t, setT] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  //MongoDB things
  const [form, setForm] = useState({
    title: "",
    priority: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate(); //might not need this

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
  
  async function recordMongoDB (t, p) {
    setForm(t, p);
    const game = { ...form };
    try {
      let response;
      response = await fetch ("http://localhost:5050/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
      setError("didn't work, L");
    } finally {
      setForm({ title: "", priority: ""});
    }
  }

  async function submit (e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting'); 
    // /\ I might not need this, but I'll keep it for now if I want to style
    try {
      await recordMongoDB (t, p);
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function titleChange (ev) {
    setT(ev.target.value);
  }
  function sliderChange (ev) {
    setP(ev.target.value);
  }



  return (
    <div className='flex'>
        <div>
            <h1>Game Entry</h1> <br />
        </div>
        <div>
            <form onSubmit={submit}>
                <input type="text" id="title" value={t} onChange={titleChange} /><br />

                <label for="slider">Priority: </label>
                <input type='range' id="slider" min="0" max="10" step="1" value={p} onChange={sliderChange} /><br />

                <input type="submit" value="Submit" />

                {error != null && <p>{error.message}</p>}
            </form>
        </div>
    </div>
  )
};



export default Submit