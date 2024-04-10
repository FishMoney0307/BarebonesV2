import React from 'react'
import './About.css';
import '../Home/Home.css';
import Hero from '../Hero.jsx';
import Credits from './Credits.jsx';
import Footer from '../Footer.jsx';

const About = () => {
  return (
    <div className="background">
      <Hero />
      <div className="Home">
        <Credits />
        <Footer />
      </div>
    </div>

  )
}

export default About