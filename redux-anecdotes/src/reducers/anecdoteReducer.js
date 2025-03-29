
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../../services/anecdotes'
import { setTimedNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  votes: 0,
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload) 
    },
    setAnecdotes(state, action) {
      return action.payload 
    },
    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      )
    }
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const response = await anecdoteService.updateAnecdote(updatedAnecdote.id, updatedAnecdote)
    dispatch(updateAnecdote(response))
    dispatch(setTimedNotification(`you voted "${anecdote.content}"`, 5))
  }
}

export const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer


/*
export const getId = () => (100000 * Math.random()).toFixed(0)
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'Premature optimization is the root of all evil.'
]
const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0
})
const initialState = anecdotesAtStart.map(asObject)
*/