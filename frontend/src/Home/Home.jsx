import React from 'react'
import './Home.css';
import Footer from '../Footer.jsx';
import Hero from '../Hero.jsx';
import Body from './Body.jsx';

const Home = () => {
  return (
    <div className="background">
      <Hero/>
      <div className="Home">
        <Body />
        <Footer />
      </div>
    </div>
  )
}

export default Home