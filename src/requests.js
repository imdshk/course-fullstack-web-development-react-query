import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes"

const getAnecdotes = () => {
  return axios
    .get(baseUrl)
    .then(res => {
      return res.data
    })
}

export { getAnecdotes }