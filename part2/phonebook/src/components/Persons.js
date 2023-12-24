const Persons = ({
  newFilterName,
  persons,
}) => {
    if (newFilterName === '') {
      const result = persons.map((person, i) => {
        return <p key={i}> {person.name} {person.number} </p>
      })
      return result
    }
    // 2.9 a search field to filter name, case insensitive
    const result = persons.map((person, i) => {
      // const nameLower
      if (person.name.toLowerCase().includes(newFilterName)) {
        return <p key={i}> {person.name} {person.number} </p>
      }
      return ''
    })
    // setNewFilterName('')
    return result
  }

  export default Persons