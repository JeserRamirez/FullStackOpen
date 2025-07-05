import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import { voteAction } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}
Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === null || state.filter === '') {
      return [...state.anecdotes].sort((a, b) => b.votes - a.votes)
    }
    return [...state.anecdotes].filter(anecdote => 
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ).sort((a, b) => b.votes - a.votes)
  })

  return (
    <>
      {
        anecdotes.map(anecdote =>
          <Anecdote 
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={
              () => {
                dispatch(voteAction(anecdote.id))

                dispatch(setNotification(`You voted: "${anecdote.content}"`, 1))
              }
            }
          />
        )
      }
    </>
  )
}

export default AnecdoteList