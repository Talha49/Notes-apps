"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify.



const page = () => { // Change 'page' to 'Page' (component names should be capitalized)
  const [input, setInput] = useState({ title: '', description: '' });



  const handleChange = (e) => {
    e.preventDefault();
    if (input.title && input.description) {
      axios
        .post('http://localhost:3000/notes', input)
        .then((res) => {
          
          toast.success(res.statusText, {
            position: 'bottom-right',
            theme: 'light',
          });
          setInput({ title: '', description: '' });
          window.location.href = '/';
        })
        .catch((error) => {
          console.log(error);
          toast.error('Something went wrong!', {
            position: 'bottom-right',
            theme: 'light',
          });
        });
    } else {
      toast.error('Please fill out the fields first!', {
        position: 'bottom-right',
        theme: 'light',
      });
    }
  };

  const handleData = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <section className="bg-gradient-to-r from-emerald-500 to-emerald-900 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Form Example</h1>
        <form onSubmit={handleChange}> 
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-600">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
              placeholder="Enter Title"
              value={input.title}
              onChange={handleData} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="w-full p-2 border rounded-md focus:ring focus:ring-purple-300"
              rows="4"
              placeholder="Enter Description"
              value={input.description}
              onChange={handleData}
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-emerald-500 to-emerald-900 text-white hover-bg-purple-700 py-2 px-4 rounded-md transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer theme="light" position="top-left" />
    </section>
  );
};

export default page;