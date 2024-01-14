import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer';

// 6.7 new Component AnecdoteForm
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    // 6.4 adding new anecdotes
    // 6.15 Modify the creation of new anecdotes, so that the anecdotes are stored in the backend.
    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setTimedNotification(`You add anecdote “${content}”.`), 5);
    }


    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input type="text" name='anecdote' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm