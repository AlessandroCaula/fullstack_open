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

// Define a function that will retrieve the favorite blog, based on the number of likes
const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((fav, blog) => {
    return fav.likes > blog.likes ? fav : blog
  }, blogs[0])

  return favorite
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog
}