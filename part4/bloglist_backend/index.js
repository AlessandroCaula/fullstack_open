const express = require('express')
const app = express()

// Adding a middleware
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:", request.path)
  console.log("Body", request.body)
  console.log("---")
  next()
}

app.use(express.json());
app.use(requestLogger)

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

app.post('/api/blogs/', (request, response) => {
  // Retrieve the added blog body
  const body = request.body

  if (!body) {
    return response.status(400).json({
      error: "content missing"
    })
  }
  
  const blogId = String(10)
  const blog = {
    id: blogId,
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  blogs = blogs.concat(blog)

  response.json(blog)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}`)