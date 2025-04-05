const express = require('express')
const app = express()

let blogs = [
  {
    id: "1",
    title: "Blog 1",
    author: "Author 1",
    url: "url 1",
    likes: 4,
  },
  {
    id: "2",
    title: "Blog 2",
    author: "Author 2",
    url: "url 2",
    likes: 10,
  },
  {
    id: "3",
    title: "Blog 3",
    author: "Author 3",
    url: "url 3",
    likes: 23,
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Blog List</h1>')
})

app.get('/api/blogs', (request, response) => {
  response.json(blogs)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}`)