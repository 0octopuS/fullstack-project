
const PersonForm = ({ newName, newPhone, persons, setNewName, setNewPhone, setPersons }) => {

    // 2.6 add name in the phonebook
    const addPerson =
        (event) => {
            event.preventDefault()
            // 2.7 give alert when the name collapse
            if (persons.find((person) => { return person.name === newName })) {
                alert(`${newName} is already added to phonebook`)
                return
            }
            const personObject = {
                name: newName,
                number: newPhone,
            }

            setPersons(persons.concat(personObject))
            setNewName('')
            setNewPhone('')
        }

    const handleNameChange =
        (event) => {
            console.log(event.target.value)
            setNewName(event.target.value)
        }

    // 2.8 add user phone number
    const handlePhoneChange = (event) => {
        console.log(event.target.value)
        setNewPhone(event.target.value)
    }

    return (
        <form onSubmit={addPerson}>
            <div> name: <input value={newName} onChange={handleNameChange} /> </div>
            <div> number: <input value={newPhone} onChange={handlePhoneChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm