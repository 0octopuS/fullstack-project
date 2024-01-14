import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setTimedNotification } from '../reducers/notificationReducer';
const selectAnecdotes = (state) => state.anecdotes;
const selectFilter = (state) => state.filter;

// 6.8 new Component AnecdoteList
const AnecdoteList = () => {
    const dispatch = useDispatch()
    // const { anecdotes, filter } = useSelector((state) => state)
    const anecdotes = useSelector(selectAnecdotes);
    const filter = useSelector(selectFilter);
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )


    // 6.3 functionality for voting anecdotes
    // 6.13 Extend the application so that it uses the Notification component to display a message for five seconds when the user votes for an anecdote or creates a new anecdote
    const vote = (id) => {
        dispatch(addVote(id));
        dispatch(setTimedNotification(`You vote for “${anecdotes.find((anecdote) =>
            anecdote.id == id).content}”`, 5));
    }

    // 6.5 anecdotes are ordered by the number of votes.
    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes);

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList