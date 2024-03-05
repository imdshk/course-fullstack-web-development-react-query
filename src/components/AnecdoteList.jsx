import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getAnecdotes, increaseVote } from '../requests'
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newVoteMutation = useMutation({
    mutationFn: increaseVote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    }
  })

  const handleVote = (anecdote) => {
    const contentNotify = `anecdote '${anecdote.content}' voted`
    newVoteMutation.mutate(anecdote)
    notificationDispatch({contentNotify, type: "NOTIFY"})
    setTimeout(() => {
      notificationDispatch({type: null})
    }, 5000)
  }
  
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () => getAnecdotes(),
    retry: false,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service is not available due to problem in the server</div>
  }

  const anecdotes = result.data

  return (
    <>
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
    </>
  )
}

export default AnecdoteList