import React from 'react';
import './Body.css';
import Submit from './Submit.jsx';
import Description from './Description.jsx';
import DBList from './DBList.jsx';
import CRUD from '../CRUD/CRUD.jsx';
import RecordList from '../Components/RecordList.jsx';

const Body = () => {
  return (
    <body>
      <div className="bigContainer">
        <div>
          <div className="smallContainer">
            <div><Description /></div>
            <div><Submit /></div>
          </div>
        </div>
        <div>
          <div className="smallContainer" style={{marginTop: "50px", marginBottom: "50px"}}>
            
          </div>
          <div className="smallContainer" style={{marginTop: "50px", marginBottom: "50px"}}>
            <CRUD />
          </div>
          <div className="smallContainer" style={{marginTop: "50px", marginBottom: "50px"}}>
            <RecordList />
          </div>
        </div>
      </div>
    </body>
  )
}

export default Body