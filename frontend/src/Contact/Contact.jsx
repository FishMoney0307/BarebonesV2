import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Hero from '../Hero.jsx';
import Footer from '../Footer.jsx';
import '../About/About.css';
import '../Home/Home.css';
import CB from './ContactBody.jsx';
import ContactForm from './ContactForm.jsx';
import { AuthContext } from '../Provider/authProvider.jsx';
import Login from '../Provider/Login.jsx';

const Contact = () => {
  const { token } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {

    if (token === null) {
      redirect();
    }
    return;
  }, []);

  function redirect() {
    navigate("/login", { replace: true });
  }
  
  return (
    <div className="background">
      <Hero />
      <div className="Home">
        <CB />
        <ContactForm />
        <Footer />
      </div>
    </div>
  )
}

export default Contact