import { Button, TextField } from "@mui/material"
import CheckIcon from '@mui/icons-material/Check'
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
          <TextField 
            label="Blog Title" 
            size="small"
            type="text"
            margin="dense"
            value={blogTitle}
            name='BlogTitle'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        {/* Blog author */}
        <div>
          <TextField 
            label='Blog Author'
            type="text"
            value={blogAuthor}
            name="BlogAuthor"
            margin="dense"
            size="small"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        {/* Blog url */}
        <div>
          <TextField 
            label='Url'
            type="text"
            value={blogUrl}
            name="BlogUrl"
            margin="dense"
            size="small"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        {/* <button type='submit'>Create</button> */}
        <Button 
          style={{ marginBottom: '5px' }}
          type="submit" 
          variant="contained" 
          color="success" 
          size="small"
          margin="dense"
          startIcon={<CheckIcon />}
        >
          Create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm