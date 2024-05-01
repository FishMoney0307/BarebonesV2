import React from 'react';
import './Credits.css';
import './About.css'

const Credits = () => {
  return (
    <>
    <div className="container">
      <div></div>
        <div >
          <h1>FRONTEND</h1>
          <p>This is everything used in the front end of the application.
            Styling, appearance, display, basically everything you're looking at right now!</p><br />
        </div>
        <div></div>
        <div >
          <h1>React</h1>
          <p>The major focus of this project, react was used for a responsive, stylish
            Webpage. This page was made with the intent of learning and becoming used to React</p><br />
        </div>
        <div></div>
        <div >
          <h1>Javascript</h1>
          <p>Major portions of the website's functionality is coded in javascript. From the login
            to handling the form submissions, most of this websites handles stuff with JS</p><br />
        </div>
        <div></div>
        <div></div>
        <div >
          <h1>CSS</h1>
          <p>All of the visuals and styling are done in CSS. Background colors, images, items
            organization, typical CSS stuff.</p><br />
        </div>
        <div></div>
        <div >
          <h1>MongoDB</h1>
          <p>The choice for data organization used for this project. Used to both add new recordsa
            and display the current records on the home page.</p><br />
        </div>
        <div></div>
        <div >
          <h1>JsonWebToken</h1>
          <p>Used to handle all of the user login functionality on the frontend. Transferring,
            creating tokens, passing them to and from localStorage</p><br />
        </div>
        <div></div>
      </div>

      <div className="aboutLine"></div>

      <div className="container">
      <div></div>
        <div >
          <h1>BACKEND</h1>
          <p>This is everything involved behind the scenes on the webpage. Handling logins,
            calling for the database, stuff like that.</p><br />
        </div>
        <div></div>
        <div >
          <h1>Express</h1>
          <p>Webserver used for the project. Hosts the browser, and connects to the MongoDB
            database when it is necessary. The easiest to use of this project.</p><br />
        </div>
        <div></div>
        <div >
          <h1>Javascript</h1>
          <p>Like the frontend, major portions of the backend were coded in javascript. All of
            the server files and routes were coded and handled with Javascript.</p><br />
        </div>
        <div></div>
        <div></div>
        <div >
          <h1>Node</h1>
          <p>Used to install packages for the program, and most importantly of all, run the
            backend and front end using commands.</p><br />
        </div>
        <div></div>
        <div >
        <h1>MongoDB</h1>
          <p>The database of choice used for the project, most of the files in the backend
            are used for handling different requests for each collection.</p><br />
        </div>
        <div></div>
        <div >
          
        </div>
        <div></div>
      </div>
      </>
  )
}

export default Credits