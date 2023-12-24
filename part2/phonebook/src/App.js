import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App =
  () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFilterName, setNewFilterName] = useState('')


    // 2.10 refactor to components
    return (
      <div>
        <h2>Phonebook</h2>
        <Filter newFilterName={newFilterName} setNewFilterName={setNewFilterName} />

        <h3>Add a new</h3>
        <PersonForm
          newName={newName} newPhone={newPhone} persons={persons} setNewName={setNewName} setNewPhone={setNewPhone} setPersons={setPersons}
        />

        <h3>Numbers</h3>
        <Persons newFilterName={newFilterName} persons={persons} />
      </div>
    )


  }

export default App