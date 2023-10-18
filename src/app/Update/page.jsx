"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const EditNote = (noteId  ) => {
  const [note, setNote] = useState({ title: '', description: '' });

 

  useEffect(() => {
    // Fetch the note data using noteId and populate the form
    axios.get(`http://localhost:3000/notes/${noteId}`)
      .then((res) => {
        setNote(res.data);
      })
      .catch((error) => console.log(error));
  }, [noteId]);

  const handleUpdate = () => {
    // Make a PUT request to update the note
    axios.put(`http://localhost:3000/notes/${noteId}`, note)
      .then((res) => {
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
      });
  };

  return (
    <div>
      <h2>Edit Note</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={note.title}
            onChange={(e) => setNote({ ...note, title: e.target.value })}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={note.description}
            onChange={(e) => setNote({ ...note, description: e.target.value })}
          />
        </div>
        <button onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
};

export default EditNote;
