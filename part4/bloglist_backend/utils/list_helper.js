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

// Function that returns the author who has the largest amount of blogs
const mostBlogs = (blogs) => {
  // Collection for storing the count of blogs for each author
  const authorBlogCount = {}
  blogs.forEach((blog) => {
      // if (Object.keys(authorBlogCount).includes(blog.author)) {
      //   authorBlogCount[blog.author] += 1
      // } else {
      //   authorBlogCount[blog.author] = 1
      // }
      authorBlogCount[blog.author] = (authorBlogCount[blog.author] || 0) + 1;
  })

  // Final collection that will contain the name and the count of the author with the most blogs
  const authorWithMoreBlogs = {
    author: "",
    blogs: 0
  }
  Object.keys(authorBlogCount).forEach((author) => {
    if (authorBlogCount[author] > authorWithMoreBlogs.blogs) {
      authorWithMoreBlogs.author = author
      authorWithMoreBlogs.blogs = authorBlogCount[author]
    }
  })

  return authorWithMoreBlogs
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs
}