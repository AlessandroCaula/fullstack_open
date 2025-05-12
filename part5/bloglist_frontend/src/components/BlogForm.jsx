import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  // New blog
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  // Function called on Form submission for the creation of a new blog. 
  const addNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle, 
      author: blogAuthor, 
      url: blogUrl
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      {/* Allowing new user to add new blogs */}
      <h2>Create new blog</h2>
      <form onSubmit={addNewBlog}> 
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