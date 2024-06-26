import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';
import '../Home/DBList.css'
import { Button } from "react-bootstrap";

/* https://www.mongodb.com/resources/languages/mern-stack-tutorial
    followed from the official mongodb tutorial */

// Once I move the update function to this, I am probably going 
// to move a copy of this to ../Home

const Record = (props) => (
  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.name}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.position}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      {props.record.level}
    </td>
    <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
      <div className="flex gap-2">
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          color="red"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  //Function to Update record
  //Increases priority by 1
  async function incrementRecord(id) {
    let res = await fetch(`http://localhost:5050/record/${id}`);
    let rec = await res.json();
    let pri = rec.priority;
    if (pri != '10') {
      pri = parseInt(pri, 10) + 1;
      pri = '' + pri;
    }
    rec.priority=pri;
    let response = await fetch(`http://localhost:5050/record/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rec),
    });
    const newRecords = records.splice(id, 1, rec);
    setRecords(newRecords);
  }

  async function decrementRecord(id) {
    let res = await fetch(`http://localhost:5050/record/${id}`);
    let rec = await res.json();
    let pri = rec.priority;
    if (pri != '0') {
      pri = parseInt(pri, 10) - 1;
      pri = '' + pri;
    }
    rec.priority=pri;
    let response = await fetch(`http://localhost:5050/record/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rec),
    });
    const newRecords = records.splice(id, 1, rec);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  // EDIT:
  // Sorta defunct since I preferred to pit the button in the return()
  // due to using the grid layout
  // gonna leave it here just in case it nukes the page if i delete it
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  
  // Heavily edited this, basically from my assignment7
  return (
    <>
      <div className = "table-container">
        <div className="table-row heading">
          <div className="row-item">Title</div>
          <div className="row-item">Priority</div>
          <div className="row-item">Action</div>
        </div>
        <div>
          {records.map((record) => {
            return (
              <div className="table-row">
                <div className="row-item">{record.title}</div>
                <div className="row-item">{record.priority}</div>
                <div className="row-item">
                  <Button onClick={(e) => incrementRecord(record._id)}
                    variant="info">+</Button>
                </div>
                <div className="row-item">
                  <Button onClick={(e) => decrementRecord(record._id)}
                    variant="info">-</Button>
                </div>
                <div className="row-item">
                  <Button onClick={(e) => deleteRecord(record._id)}
                    variant="danger">Delete</Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}