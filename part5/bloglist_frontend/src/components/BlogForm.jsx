import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = ({ handleNotificationShow, blogs, setBlogs }) => {
  // New blog
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleAddNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: blogTitle, 
        author: blogAuthor, 
        url: blogUrl
      }
      const newBlogAdded = await blogService.create(newBlog)
      const updatedBlogs = blogs.concat(newBlogAdded)
      setBlogs(updatedBlogs)
      // set Notification message and color
      const message = `A new blog: ${blogTitle} by ${blogAuthor} added`
      handleNotificationShow(message, 'green')
      // Reset the states
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch (exception) {
      // alert('Blog cannot be created')
      const message = 'Blog cannot be created'
      handleNotificationShow(message, 'red')
    }
  }

  return (
    <div>
      {/* Allowing new user to add new blogs */}
      <h2>Create new</h2>
      <form onSubmit={handleAddNewBlog}> 
        {/* Blog title */}
        <div>
          Title:
          <input 
            type='text'
            value={blogTitle}
            name='BlogTitle'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        {/* Blog author */}
        <div>
          Author: 
          <input 
            type='text'
            value={blogAuthor}
            name='BlogAuthor'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        {/* Blog url */}
        <div>
          Url:
          <input 
            type='text'
            value={blogUrl}
            name='BlogUrl'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm