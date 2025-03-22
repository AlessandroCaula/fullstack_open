const express = require("express");
const app = express();

app.use(express.json());

phonebook = [
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
app.get("/api/phonebook", (request, response) => {
  response.json(phonebook);
});

const PORT = 3001;
app.listen(PORT);
console.log(`server running at port ${PORT}`);
