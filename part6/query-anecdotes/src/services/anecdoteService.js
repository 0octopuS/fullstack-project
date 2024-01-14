import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateAnecdote = async (id, updatedData) => {
    const anecdoteUrl = `${baseUrl}/${id}`;
    const response = await axios.put(anecdoteUrl, updatedData);
    return response.data;
}

const voteForAnecdote = async (id) => {
    const anecdoteUrl = `${baseUrl}/${id}`;
    const response = await axios.get(anecdoteUrl);
    const updatedAnecdote = {
        ...response.data,
        votes: response.data.votes + 1,
    };

    await axios.put(anecdoteUrl, updatedAnecdote);
    return updatedAnecdote;
};


export default { getAll, createNew, updateAnecdote, voteForAnecdote }