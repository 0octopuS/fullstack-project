import personService from '../services/person'


const PersonForm = ({ newName, newPhone, persons, notification, notificationType, setNewName, setNewPhone, setPersons, setNotification, setNotificationType }) => {

    // 2.6 add name in the phonebook
    const addPerson =
        (event) => {
            event.preventDefault()
            // 2.7 give alert when the name collapse
            // 2.15 if the name exist, then ask if user wants to update
            const existingPerson = persons.find((person) => person.name === newName);
            if (existingPerson) {
                const confirmed = window.confirm(`${newName} is already added to the phonebook. Do you want to update the phone number?`);

                if (!confirmed) {
                    return;
                }

                personService
                    .update(existingPerson.id, { ...existingPerson, number: newPhone })
                    .then((updatedPerson) => {
                        setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : updatedPerson)));
                        setNewName('');
                        setNewPhone('');

                        setNotification(`Updated ${newName} successfully.`);
                        setNotificationType('success');
                        setTimeout(() => {
                            setNotification(null);
                            setNotificationType(null);
                        }, 3000)
                    })
                    .catch((error) => {
                        console.error(`Error updating person:${error.response.data.error}`);
                        setNotification(`${newName} has already been removed from server`);
                        setNotificationType('error');
                        setTimeout(() => {
                            setNotification(null);
                            setNotificationType(null);
                        }, 3000);
                    })
            } else {

                const personObject = {
                    name: newName,
                    number: newPhone,
                }

                // 2.12 add person to database
                personService.create(personObject).then(response => {
                    setPersons(persons.concat(response))
                    setNewName('')
                    setNewPhone('')

                    setNotification(`Added ${newName} successfully.`);
                    setNotificationType('success');
                    setTimeout(() => {
                        setNotification(null);
                        setNotificationType(null);
                    }, 3000)
                }).catch((error) => {
                    // 3.19 it displays some form of error message when a validation error occurs.
                    setNotification(`Added ${newName} failed: ${error.response.data.error}`);
                    setNotificationType('error');
                    setTimeout(() => {
                        setNotification(null);
                        setNotificationType(null);
                    }, 3000)
                })
            }
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