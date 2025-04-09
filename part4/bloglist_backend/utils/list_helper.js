// Dummy function, that will return 1 for every blog in blogs list
const dummy = (blogs) => {
  return 1
}

// Define a function that will compute the total sum of likes in all of the blog posts
const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)

  return total
}

module.exports = {
  dummy, 
  totalLikes
}