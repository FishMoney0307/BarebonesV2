import React from 'react'
import Hero from '../Hero.jsx';
import Footer from '../Footer.jsx';
import '../About/About.css';
import '../Home/Home.css';
import CB from './ContactBody.jsx';
import ContactForm from './ContactForm.jsx';

const Contact = () => {
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