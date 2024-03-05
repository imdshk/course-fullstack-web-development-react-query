import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAnecdotes = () => {
  return axios
    .get(baseUrl)
    .then(res => res.data)
}

const createAnecdote = (newAnecdote) => {
  return axios
    .post(baseUrl, newAnecdote)
    .then(res => res.data)
}

const increaseVote = (anecdote) => {
  return axios
    .put(`${baseUrl}/${anecdote.id}`, {...anecdote, votes: anecdote.votes + 1})
    .then(res => res.data)
}

export { getAnecdotes, createAnecdote, increaseVote }