import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'
// 6.6 creation of action-objects to action creator-functions in anecdoteReducer.js
// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }
// const initialState = anecdotesAtStart.map(asObject)

// 6.11 anecdote use createSlice

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVote(state, action) {
      const id = action.payload
      const updateState = state.map(anecdote => {
        if (anecdote.id === id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
      return updateState
    },
    createAnecdote(state, action) {
      const content = action.payload
      return state.concat(content)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})
// 
// export const addVote1 = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id: id
//     }
//   }
// }

// export const createAnecdote1 = (content) => {
//   return {
//     type: 'NEW_ANE',
//     payload: {
//       content: content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }



// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   if (action.type === 'VOTE') {
//     const updateState = state.map(anecdote => {
//       if (anecdote.id === action.payload.id) {
//         return {
//           ...anecdote,
//           votes: anecdote.votes + 1
//         }
//       }
//       return anecdote
//     })
//     return updateState;
//   }
//   if (action.type === 'NEW_ANE') {
//     return state.concat(action.payload)
//   }

//   return state
// }

// export default anecdoteReducer

export const initializeNotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// 6.17  modify the creation of a new anecdote to happen using asynchronous action creators
export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdotes = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdotes))
  }
}

// 6.18 Voting save changes to the backend. 
export const addVote = (id) => {
  return async (dispatch) => {
    try {
      const updatedAnecdote = await anecdoteService.voteForAnecdote(id)
      dispatch(updateVote(updatedAnecdote.id))
      // console.log(state)
      // 
    } catch (error) {
      console.error('Error voting for anecdote:', error.message);
    }
  };
};



export const { appendAnecdote, setAnecdotes, updateVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer