import personService from '../services/person'
import React from 'react'
const Persons = ({ newFilterName, setPersons, persons, notification, notificationType, setNotification, setNotificationType }) => {
  // 2.13 get data from database
  React.useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, [setPersons]);

  // 2.14  delete entries from the phonebook
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this person`)) {
      personService
        .deletePerson(id)
        .then(() => {
          // Update state after successful deletion
          setPersons(persons.filter((person) => person.id !== id));

          setNotification('Person deleted successfully.');
          setNotificationType('success');
          setTimeout(() => {
            setNotification(null);
            setNotificationType(null);
          }, 3000);
        })
        .catch((error) => {
          setNotification('Delete person failed');
          setNotificationType('error');
          setTimeout(() => {
            setNotification(null);
            setNotificationType(null);
          }, 3000);
        });
    }
  };

  if (newFilterName === '') {
    const result = persons.map((person, i) => (
      <div key={i}>
        <p>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      </div>
    ));
    return result;
  }
  // 2.9 a search field to filter name, case insensitive

  const result = persons
    .filter((person) => person.name.toLowerCase().includes(newFilterName))
    .map((person, i) => (
      <div key={i}>
        <p>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      </div>
    ));

  return result;
}

export default Persons