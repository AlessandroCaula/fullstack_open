const express = require("express");
const app = express();

app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// Route to handle the GET request for the main "Hello World"
app.get("/", (request, response) => {
  response.send("<h1>Hello World!!!!!!</h1>");
});

// Route to handle the GET request for all the notes.
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

// Route to handle the GET request and retrieve a specific note by ID
app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// Route to DELETE a note by ID
app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// Handling the POST request and creation of a new note to the server
app.post("/api/notes", (request, response) => {
  // Finding the maxId of the present notes
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id))) // Number() => Function to convert to integer
    : 0

  // Accessing the data from the body property of the request object
  const note = request.body;
  // Adding the Id to the new note
  note.id = String(maxId + 1)

  console.log(note); // { content: 'Postman is good in testing backend', important: true }

  // Adding the new note to the notes
  notes = notes.concat(note)

  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
