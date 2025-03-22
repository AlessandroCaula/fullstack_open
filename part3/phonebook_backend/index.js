const express = require("express");
const app = express();

app.use(express.json());

let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Route to handle the GET request fo the http://localhost:3001 showing just the text
app.get("/", (request, response) => {
  response.send("<h1>PhoneBook</h1>");
});

// Route to handle the GET request for all the phonebook entries http://localhost:3001/api/phonebook
app.get("/api/persons", (request, response) => {
  response.json(phonebook);
});

// Route to handle the GET request for the info at http://localhost:3001/info
app.get("/info", (request, response) => {
  const text = `Phonebook has info for ${phonebook.length} people`;
  const date = new Date();

  response.send(
    `<div>
      <p>${text}<p>
      <p>${date}<p>
    </div>`
  );
});

// Route to get the information for a single phonebook entry.
app.get("/api/persons/:id", (request, response) => {
  // Retrieve the id of the requested person to display
  const id = request.params.id;
  // Retrieve the person with the specified id in the phonebook
  const person = phonebook.find((p) => p.id === id);

  // Check if the person exists or not. If not, send the error message
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// Functionality to delete a single phonebook entry
app.delete("/api/persons/:id", (request, response) => {
  // Retrieve the id of the person that we want to delete from the phonebook collection.
  const id = request.params.id;
  // Filter out the id from the phonebook collection
  phonebook = phonebook.filter((p) => p.id !== id);

  // Sending the response back to the server
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT);
console.log(`server running at port ${PORT}`);
