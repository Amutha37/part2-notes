import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

// axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   console.log(notes);
// });

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  //  fetch data from json server
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);
  console.log("render", notes.length, "notes");

  // add new note
  // id is made base by adding the next sequence of notes. This work if the notes not deleted

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  // handle controlled input element  event.target.value = input value of that element
  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  // show the list
  //  showAll
  //   ? notes
  //   : notes.filter((note) => note.important === true);
  // The comparison operator is in fact redundant, since the value of note.important is either true or false which means that we can simply write:
  // notes.filter(note => note.important)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show{showAll ? "important" : "all"}
      </button>
      <ul>
        {}
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
