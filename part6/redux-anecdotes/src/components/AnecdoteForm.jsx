import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

// 6.7 new Component AnecdoteForm
const AnecdoteForm = () => {
    const dispatch = useDispatch()


    // 6.4 adding new anecdotes
    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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