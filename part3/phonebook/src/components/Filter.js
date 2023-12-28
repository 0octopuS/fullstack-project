

const Filter = ({ newFilterName, setNewFilterName }) => {
    const handleFilterNameChange =
        (event) => {
            console.log(event.target.value)
            setNewFilterName(event.target.value)
        }

    return (
        <form>
            <div> filter shown with <input value={newFilterName} onChange={handleFilterNameChange} /> </div>
        </form>)
}

export default Filter