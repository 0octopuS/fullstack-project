import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/request'
import { useReducer } from 'react'
import notificationReducer from './reducers/notificationReducer'


const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, 0)
  // 6.20 Implement retrieving anecdotes from the server using React Query.

  const queryClient = useQueryClient()
  const voteMutation = useMutation({
    mutationFn: updateAnecdote, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data
  console.log(anecdotes)


  // 6.22 Implement voting for anecdotes using again the React Query.
  const handleVote = (anecdote) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION', payload: `You vote for “${anecdotes.find((ane) =>
        anecdote.id == ane.id).content}”`
    });
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 5000);

    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }


  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification notification={notification} />
      <AnecdoteForm notificationDispatch={notificationDispatch} />

      {
        anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App
