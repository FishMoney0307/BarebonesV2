import React from 'react'
import './DBList.css';

const DBList = () => {
  return (
    <>
      <div className="table-container">
        <div className="table-row heading">
            <div className="row-item">Title</div>
            <div className="row-item">Priority</div>
            <div className="row-item">Action</div>
        </div>
        <div className="table-row">
            <div className="row-item">Final Fantasy</div>
            <div className="row-item">8</div>
            <div className="row-item">CRUD later</div>
        </div>
        <div className="table-row">
            <div className="row-item">Xenoblade</div>
            <div className="row-item">10</div>
            <div className="row-item">CRUD later</div>
        </div>
        <div className="table-row">
            <div className="row-item">Helldivers</div>
            <div className="row-item">9</div>
            <div className="row-item">CRUD later</div>
        </div>
    </div>
    </>
  )
}

export default DBList