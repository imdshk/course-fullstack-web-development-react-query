import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const notificationDispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
    onError: () => notificationDispatch({contentNotify: "too short anecdote, must have length 5 or more", type: "NOTIFY"})
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({
      "content": content,
      "votes": 0
    })
    const contentNotify = `anecdote '${content}' created`
    notificationDispatch({contentNotify, type: "NOTIFY"})
    setTimeout(() => {
      notificationDispatch({contentNotify: null, type: null})
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm