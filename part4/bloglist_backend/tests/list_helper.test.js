const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')
// Retrieve the list of blogs
const listOfBlogs = require('../utils/list_blogs')
const blogs = require('../utils/list_blogs')

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

  test('when the list has multiple blogs', () => {
    const result = listHelper.totalLikes(listOfBlogs)
    // console.log(result)
    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {
  test('the favorite blog is correctly computed', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    // console.log(result)
    assert.deepStrictEqual(result, listOfBlogs[2])
  })
})

describe('author with most blogs', () => {
  test('the author with the most blogs is correct', () => {
    const result = listHelper.mostBlogs(listOfBlogs)
    // console.log(result)
    assert.deepStrictEqual(result, {author: 'Robert C. Martin', blogs: 3})
  })
})