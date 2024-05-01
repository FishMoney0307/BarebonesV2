import React from 'react'
import '../Home/Body.css';
import './Contact.css'

const ContactBody = () => {
  return (
    <div className="bigContainer">
        <div>
            <h1>Developer</h1>
            <p className="contactText">I am a developer at rowan University, I have worked with Java, Javascript, CSS, HTML,
              CSS, C, C++, Python, and now React, Express, and MongoDB.
            </p> <br />
        </div>
        <div>
            <h1>Contact Information</h1>
            <p className="contactText">Email: ethan2002@optonline.net</p>
            <a className="contactText" href="https://github.com/FishMoney0307">Github</a> <br />
            <a className="contactText" href="https://www.linkedin.com/in/ethan-karczewski-8b0a83252/">LinkedIn</a>
        </div>
    </div>
  )
}

export default ContactBody