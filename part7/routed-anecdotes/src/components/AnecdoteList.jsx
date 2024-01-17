/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// 7.2 Implement a view for showing a single anecdote
const AnecdoteList = ({ anecdotes }) => {
  console.log(anecdotes);
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            <Link to={`/anecdotes/${anecdote.id}`}> {anecdote.content} </Link>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
