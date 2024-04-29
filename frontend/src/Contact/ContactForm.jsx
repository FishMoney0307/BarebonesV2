import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  //mongodb
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const params = useParams();

  async function recordMongoDB () {
    const mail = { ...form };
    try {
        let response;
        response = await fetch ("http://localhost:5050/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mail),
        });
    } catch (error) {
        console.error('A problem occurred adding or updating a record: ', error);
    } finally {
        setForm({ name: "", email: "", subject: "", message: "" });
    }
  }

  async function submit (e) {
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
  }

  function updateForm (value) {
    return setForm ((prev) => {
        return { ...prev, ...value };
    })
  }

  return (
    <>
    <div className='flex'>
        <div>
            <h1>Contact Me!</h1> <br />
        </div>
        <div>
            <form onSubmit={submit}>
                <label for="name">Name: </label>
                <input type="text" id="name" value={form.name}
                    onChange={(e) => updateForm({name: e.target.value})} />
                
                <label for="email">Email: </label>
                <input type="email" id="email" value={form.email}
                    onChange={(e) => updateForm({email: e.target.value})} />
                
                <label for="subject">Subject: </label>
                <input type="text" id="subject" value={form.subject}
                    onChange={(e) => updateForm({subject: e.target.value})} />
                
                <label for="message">Message: </label>
                <textarea id="message" value={form.message}
                    onChange={(e) => updateForm({message: e.target.value})} />

                {status === 'success' && <p>Thank you for your response, {form.name}</p>}

                <button disabled={form.name === "" || status === 'submitting'}>Submit</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default ContactForm;