import { useState, useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Anecdote from "./components/Anecdote";
import AnecdoteList from "./components/AnecdoteList";
import Menu from "./components/Menu";
import About from "./components/About";
import Footer from "./components/Footer";
import CreateNew from "./components/CreateNew";
import Notification from "./components/Notification";
import notificationReducer from "./reducers/notificationReducer";

const App = () => {
  const navigate = useNavigate();
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  // 7.10 Refactor the application to use Redux to manage the notification data.
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    '',
  );

  // 7.3 automatically to showing the view for all anecdotes and the user
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `a new anecdote ${anecdote.content} created!`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  // 7.1 Add React Router to the application
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification} />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdotes={anecdotes} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
