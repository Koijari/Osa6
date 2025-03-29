
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
    .filter(anecdote =>
      anecdote.content.includes(filter)
    )

  const style = {
    marginBottom: 10
  }
  const style2 = {
    marginRight: 10
  }

  return (
    <div style={style}>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <span style={style2}>
              has {anecdote.votes} votes
            </span>
            <button onClick={() => {dispatch(voteAnecdote(anecdote))}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList