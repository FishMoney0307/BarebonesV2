import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

const Submit = () => {
  const [test, setTest] = useState(false);

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
  const [isNew, setIsNew] = useState(true);
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
    return;
  }, [records.length]);


  
  async function recordMongoDB (t, p) { //t,p are useless i think remove and test if you have time
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
      setForm({ title: "", priority: "5"});
    }
  }

  async function submit (e) {
    e.preventDefault();
    setError(null);
    setStatus('submitting');
    validate();
    // /\ I might not need this, but I'll keep it for now if I want to style
    if (true) {
      setError('Item already exists.');
      setIsNew(true);
      setTest(false);
      return;
    } else {
      await recordMongoDB(t, p);
      setStatus('success');
      setTest(true);
    }
    /*
    try {
      if (!isNew) {
        setError("Item already exists.");
        setIsNew(true);
        setTest(false);
        return;
      } else {
        await recordMongoDB (t, p);
        setStatus('success');
        setTest(true);
      }
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
    */
  }

  function validate() {
    records.map((record) => {
      if (record.title === form.title) {
        setIsNew(false);
      }
    })
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

                <p>{records.length}</p>
                {isNew && <p>New!</p>}
                {!isNew && <p>Not new!</p>}
                {test && <p>SOMEHOW</p>}
            </form>
        </div>
    </div>
  )
};

export default Submit