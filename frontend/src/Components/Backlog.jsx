import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';

export default function Back() {
    const [form, setForm] = useState({
        title: "",
        priority: "",
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData {
            const id = params.id?.toString() || undefined;
            if(!id) return;
            setIsNew(false);
            const response = await fetch(
                `http://localhost:5050/record/${params.id.toString()}`
            );
            if(!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const record = await response.json();
            if (!record) {
                console.warn(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setForm(record);
        }
        fetchData();
        return;
    }, [params.id, navigate]);



    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }


    async function onSubmit(e) {
        e.preventDefault();
        const game = { ...form };
        try {
            let response;
            if (isNew) { //create a new record
                response = await fetch("http://localhost:5050/record", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(game),
                });
            } else { //update a record
                response = await fetch(`http://localhost:5050/record/${params.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(game),
                });
            }

            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('A problem occured adding or updating a record: ', error);
        } finally {
            setForm({title:"", priority:""});
            navigate("/");
        }
    }
}