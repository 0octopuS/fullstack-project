import { useDispatch } from 'react-redux'
// import filterReducer from '../reducers/filterReducer'
import { setFilter } from '../reducers/filterReducer'
// import anecdoteReducer from '../reducers/anecdoteReducer'

// 6.9 filtering for the anecdotes that are displayed to the user.
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        // input-field value is in variable event.target.value
        const content = event.target.value
        dispatch(setFilter(content))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter <input name='filter' onChange={handleChange} />
        </div>
    )
}

export default Filter