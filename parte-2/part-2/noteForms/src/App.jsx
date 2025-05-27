import { useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newVote, setNewVote] = useState(
    'a new note...'
  )
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newVote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewVote('')
  }
  
  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewVote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} notes={note} />
        )}
      </ul>
      <form>
        <input type="text" 
          value={newVote}
          onChange={handleNoteChange}
        />
        <button type='submit' onClick={addNote}>save</button>
      </form>
    </div>
  )
}

export default App 
