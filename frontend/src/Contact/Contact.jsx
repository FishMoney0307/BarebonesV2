import React from 'react'
import Hero from '../Hero.jsx';
import Footer from '../Footer.jsx';
import '../About/About.css';
import '../Home/Home.css';
import CB from './ContactBody.jsx';
import Record from '../Components/Record.jsx';

const Contact = () => {
  return (
    <div className="background">
      <Hero />
      <div className="Home">
        <CB />
        <Record />
        <Footer />
      </div>
    </div>
  )
}

export default Contact