const mongoose = require('mongoose')

if (process.argv.length < 2) {
  console.log('Not password')
  process.exit(1)
}

// The password is the third parameter passed in the terminal
const password = process.argv[2]

const url = `mongodb+srv://alecaula:${password}@cluster0.ksork.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

// strictQuery is a setting in mongoose that determines how query filters are handled when they include fields that are not defined in the schema.
// When you set strictQuery to false, Mongoose allows query filters to include fields that are not defined in the schema. This can be useful in certain scenarios where you want to perform queries with dynamic or non-schema fields.
mongoose.set('strictQuery', false)

mongoose.connect(url)

// Define schema
const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

// If to the program are passed 5 elements. Store the new contact to the phonebook.
if (process.argv.length === 5) {
  // Retrieve the name and the number of the contact to add to the phonebook
  const contactName = process.argv[3]
  const contactNumber = process.argv[4]

  // Creating a new contact object following the contactSchema
  const contact = new Contact({
    name: contactName,
    number: contactNumber,
  })

  // Add the new contact to the Database
  contact.save().then((result) => {
    console.log(`${result.name} has been added to the phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  // If the password is the only parameter given to the program, meaning that it is invoked like this: node mongo.js yourpassword. The program will display all of the entries in the phonebook
  console.log('Phonebook:')
  // First retrieve all the contacts and then print them
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
} else {
  console.log('Invalid parameters')
  mongoose.connection.close()
  process.exit(1)
}
