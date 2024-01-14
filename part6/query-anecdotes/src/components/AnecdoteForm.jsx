import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../services/request'
import notificationReducer from '../reducers/notificationReducer'
import { useReducer } from 'react'
const AnecdoteForm = ({ notificationDispatch }) => {

  // 6.21 adding new anecdotes to the server using React Query
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }, onError: (e) => {
      // 6.24 implement error handling for at least 5 characters
      notificationDispatch({
        type: 'SET_NOTIFICATION', payload: `Adding fail: “${e.response.data.error}”`
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  })

  // const [notification, notificationDispatch] = useReducer(notificationReducer, 0)
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({
      type: 'SET_NOTIFICATION', payload: `You add new anecdote “${content}”`
    });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);

  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
