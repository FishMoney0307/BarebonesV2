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
  const params = useParams();
  const navigate = useNavigate(); //might not need this

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

  async function submit (e) {
    e.preventDefault();
    handler();
  }

  async function handler () {
    
    setError(null);
    setStatus('submitting');
    // /\ I might not need this, but I'll keep it for now if I want to style
    await makeRecord();
    setStatus('success');
  }

  async function validate() {
    records.map((record) => {
      if (record.title === form.title) {
        setIsNew(false);
        return false;
      }
    })
    return true;
  }

  function updateChange (value) {
    updateForm(value);
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
        setLoops(loops + 1);
        
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

  return (
    <div className='flex'>
        <div>
            <h1>Game Entry</h1> <br />
        </div>
        <div>
            <form onSubmit={submit}>
                <input type="text" id="title" value={form.title} onChange={(e) => updateChange({title: e.target.value})} /><br />

                <label for="slider">Priority: </label>
                <input type='range' id="slider" min="0" max="10" step="1" value={form.priority} 
                  onChange={(e) => updateChange({ priority: e.target.value})} /><br />

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