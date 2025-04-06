const mongoose = require('mongoose')

// Retrieving the string typed in the terminal. And check if there are less than 3 elements. This means that no password has been typed.
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

// Retrieve the third string typed in the terminal, which is the password for accessing to mongoDB
const password = process.argv[2]

const url = `mongodb+srv://alecaula:${password}@cluster0.ksork.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then((result) => {  // ({important: true})
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})

