import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

const Submit = () => {
  const [test, setTest] = useState(false);
  const [loops, setLoops] = useState(0);

  //not used, but might need for validation idk
  const [t, setT] = useState('');
  const [p, setP] = useState('');
  const [error, setError] = useState(null);
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState('typing');

  //MongoDB things
  const [form, setForm] = useState({
    title: "",
    priority: "5",
  });
  const [isNew, setIsNew] = useState(false);

  // will need this for validation later
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    setIsNew(true);
    validate();
    return;
  });
  /*  shoutouts to this stack overflow forum for revealing how useEffects works to me
      special shoutouts to the "accepted answer" being an incredibly unhelpful dork
      and the actual answer being the 0 upvote response by the op
      For some reason await was NOT working in the onsubmit function
      No idea why, but it always called the mongodb function first
      https://stackoverflow.com/questions/66926702/react-functions-not-happening-in-order
  */

  async function validate() {
    records.map((record) => {
      if (record.title === form.title) {
        setIsNew(false);
        return false;
      }
    })
    return true;
  }

  function updateForm (value) {
    return setForm ((prev) => {
      return { ...prev, ...value };
    })
  }

  async function makeRecord () {
    //setForm({t, p});
    const game = { ...form };
    try {
      if (isNew) {
        let response;
        response = await fetch ("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(game),
        });
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
      setError("didn't work, L"); //PLEASe remember to remove this before final submission
    } finally {
      setForm({ title: "", priority: "5"});
    }
  }

  async function submit (e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting');
    // /\ I might not need this, but I'll keep it for now if I want to style
    try {
      await makeRecord();
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err)
    }
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

                <label for="slider">Priority: {form.priority}</label>
                <input type='range' id="slider" min="0" max="10" step="1" value={form.priority} 
                  onChange={(e) => updateForm({ priority: e.target.value})} /><br />

                <button disabled={form.title === "" || !isNew || status === "submitting"}>
                  Submit
                </button>
                {/*status === 'success' &&
                  <p>Your values are: {t} and {p}</p>*/}

                {error != null && <p>{error.message}</p>}
                {isNew && <p>New!</p>}
                {!isNew && <p>Game already exists.</p>}
                {test && <p>SOMEHOW</p>}
                <p>Loops: {loops}</p>

                {records.map((record) => {
                  return (
                    <p>{record.title}</p>
                  )
                })}
            </form>
        </div>
    </div>
  )
};

export default Submit