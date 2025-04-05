const http = require('http')

const app = http.createServer((request, response) => {
    response.writeHead(200, { "content-type": "text/plain" })
    response.end("Hello from Bloglist")
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port http://localhost:${PORT}`)