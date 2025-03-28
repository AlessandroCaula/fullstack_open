require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Contacts = require("./models/phonebook");

const app = express();

let phonebook = [];

app.use(express.json());
app.use(express.static("dist"));

// Define a custom token for logging the request body
morgan.token("body", (req) => {
  return JSON.stringify(req.body); // Convert the request body to a JSON string
});

// Morgan middleware
app.use(morgan(":method :url :status :response-time ms - :body"));

// Route to handle the GET request fo the http://localhost:3001 showing just the text
app.get("/", (request, response) => {
  response.send("<h1>PhoneBook</h1>");
});

// Route to handle the GET request for all the phonebook from MongoDB
app.get("/api/persons", (request, response) => {
  Contacts.find({}).then((contact) => {
    response.json(contact);
  });
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

// Route to get the information for a single phonebook entry from mongoDB.
app.get("/api/persons/:id", (request, response) => {
  // Retrieve the id of the requested person to display
  const id = request.params.id;

  Contacts.findById(id)
    .then((contact) => {
      if (contact) {
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(404).end();
    });
});

// Implementing the POST request allowing to add new entries
app.post("/api/persons/", (request, response) => {
  // Accessing the data from the body property of the request object
  const body = request.body;

  // Return an error if the body name of number of the new person to add/post does not exist
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  // Check if the name already exists
  if (phonebook.some((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  // Otherwise create a new object for the person to add to the phonebook
  const person = new Contacts({
    name: body.name,
    number: body.number,
  });

  // Adding the new person to the phonebook
  person.save().then((savedContact) => {
    response.json(savedContact);
  });
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - http://localhost:${PORT}`);
});
