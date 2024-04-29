import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

const Submit = () => {
  //not used, but might need for validation idk
  const [t, setT] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  //MongoDB things
  const [form, setForm] = useState({
    title: "",
    priority: "5",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate(); //might not need this

  // will need this for validation later
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
    //setForm({t, p});
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
      setError("didn't work, L"); //PLEASe remember to remove this before final submission
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
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }

  function updateForm (value) {
    return setForm ((prev) => {
      return { ...prev, ...value };
    })
  }

  return (
    <div className='flex'>
        <div>
            <h1>Game Entry</h1> <br />
        </div>
        <div>
            <form onSubmit={submit}>
                <input type="text" id="title" value={form.title}
                   onChange={(e) => updateForm({title: e.target.value})} /><br />

                <label for="slider">Priority: </label>
                <input type='range' id="slider" min="0" max="10" step="1" value={form.priority} onChange={(e) => updateForm({ priority: e.target.value})} /><br />

                <input type="submit" value="Submit" />

                {/*status === 'success' &&
                  <p>Your values are: {t} and {p}</p>*/}

                {error != null && <p>{error.message}</p>}
            </form>
        </div>
    </div>
  )
};

export default Submit