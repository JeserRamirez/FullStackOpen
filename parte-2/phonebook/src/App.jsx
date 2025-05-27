import { useEffect, useState } from "react"
import personService from "./services/persons"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterText, setFilterText] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')
  const [statusCode, setStatusCode] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()

    const trimmedName = newName.trim()
    const nameObject = {
      name: trimmedName,
      number: newNumber
    }

    // if (persons.find(person => person.name === newName)) {
    //   alert(`${newName} is already added to phonebook,`)
    //   return
    // }

    const findPerson = persons.find(person => person.name === trimmedName);
    if (findPerson) {
      // console.log(findPerson)
      if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
        personService
          .update(findPerson.id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== findPerson.id ? person : returnedPerson))

            setErrorMessage(
              `Updated ${returnedPerson.name} phone number to ${returnedPerson.number}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          }). catch(error => {
            setErrorMessage(
              `Information of ${findPerson.name} has already been removed from server`
            )
            setStatusCode(error.status)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(p => p.id !== findPerson.id))
          })
      }
      setNewName('')
      setNumber('')
      return
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNumber('')

        setErrorMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      
  }

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id === id).name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`Information of ${persons.find(p => p.id === id).name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const filteredPersons = filterText === ''
    ? persons
    : persons.filter(person =>
        person.name.toLowerCase().includes(filterText.toLowerCase())
      )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} statusCode={statusCode} />
      <Filter handleChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange} handleClick={addName}  />
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} delete={deletePerson}  />
    </div>
  )
}

export default App
