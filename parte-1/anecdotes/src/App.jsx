import { useState } from "react"

const Header = (props) => {

  return (
    <h1>{props.text}</h1>
  )

}

const Button = (props) => {

  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const copy = anecdotes.map(() => 0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(copy)

  const handleNextAnecdote = () => {
  
    const max = Math.floor(anecdotes.length - 1);
    const random = Math.floor(Math.random() * (max - 0 + 1)) + 0;

    setSelected(random);
  
  }

  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const maxVotes = Math.max(...votes)
  // console.log('most votes', maxVotes)
  const mostVoted = votes.indexOf(maxVotes)
  // console.log(mostVoted)

  return (
    <>

      <Header text="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button handleClick={handleVotes} text="vote" />
      <Button handleClick={handleNextAnecdote} text="next anecdote" />

      <Header text="Anecdote with most votes" />
      <p>{anecdotes[mostVoted]}</p>
      <p>has {maxVotes} votes</p>

    </>
  )
}

export default App
