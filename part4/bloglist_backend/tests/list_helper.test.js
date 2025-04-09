const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
    
  assert.strictEqual(result, 1)
})

// Testing the totalLikes function
describe('total likes', () => {

  // List with one blog only
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]
  test('when list has only one blog, equals to the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  // Retrieve the list of blogs
  const listOfBlogs = require('../utils/list_blogs')
  test('when the list has multiple blogs', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    assert.strictEqual(result, 36)
  })
})