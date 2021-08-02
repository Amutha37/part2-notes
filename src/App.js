import React, { useState, useEffect } from 'react'
import Note from './components/Note';
 import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(false)


  useEffect(() => {

    const eventHandler = response => {  
      setNotes(response.data)
    }
  
    const promise = axios.get('http://localhost:3001/notes')
    promise.then(eventHandler)
  }, [])

  

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
    
      setNotes(notes.concat(response.data))
    setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
// show list of important and all 
  const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)

// toggle button
  const toggleImportanceOf = (id => {
    //  defines the unique url for each note resource based on its id.
    
    //  find method  find the note to modify,then assign to note.
     // Create new object exact copy of old accept the important property. 
 
// new note is then sent with a PUT request to the backend where it will replace the old object. put(url, changedNote)
    // callback function sets the state and render component notes with new array , except for the old note with is replaced with teh note exact item.
   
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
   
  axios.put(url, changedNote).then(response => {
    setNotes(notes.map(note => note.id !== id ? note : response.data))
  })
  })
      
      
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>   
      <ul>
        {notesToShow.map(note => 
            <Note key={note.id} note={note}   toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>  
    </div>
  )
}

export default App