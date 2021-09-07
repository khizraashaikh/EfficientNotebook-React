import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialNotes = [];

  const [notes, setNotes] = useState(initialNotes);

  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
          headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMzY3ZThiZjAwOTVhNzVhM2U3ZGI5In0sImlhdCI6MTYzMDgyMjQwNn0.6QGASCMRECZrTI6ErQ225Sg-0rirEAFnxZ9K26q700g'
      }
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);

  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
          headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMzY3ZThiZjAwOTVhNzVhM2U3ZGI5In0sImlhdCI6MTYzMDgyMjQwNn0.6QGASCMRECZrTI6ErQ225Sg-0rirEAFnxZ9K26q700g'
      },
      body: JSON.stringify({title, description, tag})
    });

    console.log("Adding a new note");
    const note = {
      "_id": "6s134b765e4f2d0495c4271e483649",
      "user": "613367e8bf0095a75a3e7db93",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-05T12:28:20.445Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
          headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMzY3ZThiZjAwOTVhNzVhM2U3ZGI5In0sImlhdCI6MTYzMDgyMjQwNn0.6QGASCMRECZrTI6ErQ225Sg-0rirEAFnxZ9K26q700g'
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();

    // Logic to edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API Call

    console.log("Deleting the note with id " + id);
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }


  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;