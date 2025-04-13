const { test, after, beforeEach } = require('node:test')
const Note = require('../models/note')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

// Initial notes that will be stored in the testNoteApp. Used for testing purposes
const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  }
]

const api = supertest(app)

// The database is cleared out at the beginning, and after that, we save the two notes stored in the initialNotes array to the database.
// By doing this, we ensure that the database is in the same state before every test is run.
beforeEach(async () => {
  await Note.deleteMany({})
  let noteObject = new Note(initialNotes[0])
  await noteObject.save()
  noteObject = new Note(initialNotes[1])
  await noteObject.save()
})

// Testing that the returned notes are in JSON
test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// Testing that there are two notes
test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  // execution gets gere only after the HTTP request is complete
  // the result of HTTP request is saved in variable response
  assert.strictEqual(response.body.length, 2)
})

// Testing tha the first note is about HTML
test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert(contents.includes('HTML is easy'))
})

after(async () => {
  await mongoose.connection.close()
})