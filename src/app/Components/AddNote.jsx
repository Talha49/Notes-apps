"use client"
import axios from 'axios';
import Link from 'next/link';
import { FcCalendar, FcClock } from 'react-icons/fc';
import { GrAdd } from 'react-icons/gr';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import 'react-toastify/dist/ReactToastify.min.css';





const AddNote = () => {
  
  const [notes, setNotes] = useState([]);
  const [tDate, setTDate] = useState('');
  const [clientTime, setClientTime] = useState('');
  
  




 
  
 

  const getServerTime = () => {
    const now = new Date();
    setTDate(now.toLocaleDateString());
    setClientTime(now.toLocaleTimeString());

    const day = now.getDay();
    // Update the day on the server
    setDay(day);
  };

  const [day, setDay] = useState('');

  useEffect(() => {
    getServerTime();

    // Fetch notes from the server
    axios
      .get('http://localhost:3000/notes')
      .then((res) => {
        setNotes(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const DaytoString = () => {
    if (day === 0) return 'Sunday';
    else if (day === 1) return 'Monday';
    else if (day === 2) return 'Tuesday';
    else if (day === 3) return 'Wednesday';
    else if (day === 4) return 'Thursday';
    else if (day === 5) return 'Friday';
    return 'Saturday';
  };

  const getdata = async () => {
    // Fetch notes from the server
    const res = await axios.get('http://localhost:3000/notes');
    setNotes(res.data);
  };
  const sortOptions = [
    {
      label: "Newest First",
    },
    {
      label: "Oldest First",
    },
  ];

  const handleDelete = (id) => {
    const conf = window.confirm('Do you really want to delete this task?');
    if (conf) {
      axios
        .delete(`http://localhost:3000/notes/${id}`)
        .then((res) => {
          toast.success('Task Deleted', {
            position: 'bottom-right',
            theme: 'light',
          });
          getdata();
        })
        .catch((error) => {
          toast.error('Something went wrong!', {
            position: 'bottom-right',
            theme: 'light',
          });
        });
    }
  };
  
 



 


  return (
    <div>
       
      <div className="bg-gradient-to-r from-white to-gray-100 shadow-lg p-6 rounded-md h-[30vh] flex items-center justify-between">
        <div className="text-lg font-bold text-blue-700">
          <p>
            Today is <b className="text-red-500 font-semibold">{DaytoString()}</b>
          </p>
          <h2>
            Your Tasks For today is{' '}
            <b className="text-green-700">{notes.length}</b>
          </h2>
        </div>
        <div className="ml-4">
          <div className="flex items-center gap-2">
            <FcCalendar className="text-xl" /> <p>{tDate}</p>
          </div>
          <div className="flex items-center gap-2">
            <FcClock className="text-xl" />
            <p>{clientTime}</p>
          </div>
        </div>
      </div>
      <div className="relative px-4 py-4">
      <TextField
            variant="standard"
            select
            label="Sort"
            defaultValue="Newest First"
            size="small"
            color="secondary"
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.label}
                onClick={() => {
                  notes.reverse();
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
      </div>
      <div className="bg-gray-100 shadow-2xl">
        <div className="py-4 shadow-md relative flex items-center  px-4">
          <Link
            href="/Create"
            className="bg-gradient-to-r from-emerald-700 to-emerald-400  absolute  right-8 top-3 flex items-center text-xl py-3 px-3 rounded-full shadow-xl hover:shadow-black/25"
          >
            <GrAdd />
          </Link>
        </div>
      </div>
      <div className="flex py-8 flex-col h-full justify-center bg-gradient-to-r from-emerald-700 to-emerald-900 items-center gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 py-8 gap-8">
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <div key={note.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                {/* Button Icons */}
                <div className="mt-4 flex justify-end gap-2">
                  <Link href={`/Update/${id}`}  className="text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={(e) => handleDelete(note.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 20H17M16 4l1 1M15 5l-1 1M5 20a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5z"
                    />
                  </svg>
                </button>
                <button   href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleMarkAsDone(note);
                }}  className="text-green-500 hover:text-green-700">
              Mark as Done
            </button>


              </div>
              <div className='text-xl font-semibold'>{note.title}</div>
              <div className="text-gray-600 max-h-32 overflow-y-auto">{note.description}</div>
              </div>
            ))
          ).reverse() : (
            <div className="text-center">
              <h2 className="text-xl font-semibold">No Notes Available</h2>
            </div>
          )}
        </div>
        
        
        <ToastContainer theme="light" position="top-left" />
      </div> 
    </div>
  );
};

export default AddNote;