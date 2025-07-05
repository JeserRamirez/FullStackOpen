import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdotes } from './services/anecdotes'
import { useNotificationDispatch } from './reducers/NotificationContextReducer'
import { setNotification } from './utils/notification'

const App = () => {
  const queryClient = useQueryClient()

  const updateVotesMutation = useMutation({
    mutationFn: updateAnecdotes,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map(a =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
    }
  })

  const dispatch = useNotificationDispatch()

  const handleVote = (anecdote) => {
    updateVotesMutation.mutate({
        ...anecdote,
        votes: anecdote.votes + 1
    },{
      onSuccess: () => {
        setNotification(dispatch, `you voted '${anecdote.content}'`)
      }
    })
  }

  const {data, isLoading, isError} = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (isLoading) { 
    return <div>loading data...</div>
  }

  if(isError){
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
