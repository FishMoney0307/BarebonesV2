import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ContactForm = () => {
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

  //mongodb
  const [form, setForm] = useState({
    title: "",
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
        setForm({ title: "", email: "", subject: "", message: "" });
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
    <div>ContactForm</div>
  )
}

export default ContactForm;