const { test, after, beforeEach, describe } = require('node:test')
const Note = require('../models/note')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

describe('when there are some notes saved initially', () => {
  // The database is cleared out at the beginning, and after that, we save the two notes stored in the initialNotes array to the database.
  // By doing this, we ensure that the database is in the same state before every test is run.
  beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
  })

  // Testing that the returned notes are in JSON
  test('notes are returned as json', async () => {
    console.log('entered test')
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // Testing that all the notes are returned
  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    // execution gets gere only after the HTTP request is complete
    // the result of HTTP request is saved in variable response
    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  // Testing tha the first note is about HTML
  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert(contents.includes('Browser can execute only JavaScript'))
  })

  // Describe section - Testing on GET specific notes
  describe('viewing a specific note', () => {
    
    // Testing if it's possible to fetch an existing note
    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()

      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    // Testing that a non existing note gives the 404 error
    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    // Testing that fetching a note with a wrong id gives a 400 error
    test('fails with statuscode 400 id is invalid', async () => {
      const invalid = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalid}`)
        .expect(400)
    })
  })

  // Describe section - Testing on POST
  describe('addition of a new note', () => {

    // Testing that a valid note can be added
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
      }

      await api 
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  // Describe section - Testing on DELETION
  describe('deletion of a note', () => {

    // Testing that with a correct id the note is removed correctly
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)
      
      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)

      const contents = notesAtEnd.map(r => r.content)
      assert(!contents.includes(noteToDelete.content))
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})