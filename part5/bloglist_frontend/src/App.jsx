import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // User login states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // New blog
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  // Use Effect to retrieve all the blogs at first DOM load
  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs(blogs)
    // )

    // Since you cannot directly use an async function inside the useEffect hook. 
    // We should define an async function inside the useEffect and call it.
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  // Use effect to check if a user is already logged in at first DOM load
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    // If it exist, set the user
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      // Saving the logged in user to the local storage
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      // Setting the token for the logged in user.
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      alert('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleAddNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: blogTitle, 
        author: blogAuthor, 
        url: blogUrl
      }
      const newBlogAdded = await blogService.create(newBlog)
      // console.log(newBlogAdded)
      const updatedBlogs = blogs.concat(newBlogAdded)
      // console.log(updatedBlogs)
      setBlogs(updatedBlogs)
    } catch (exception) {
      alert('Blog cannot be created')
    }
    // console.log(blogTitle, blogAuthor, blogUrl)
  }

  // If the user is not logged in, return the login form
  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          {/* Username field */}
          <div>
            username
            <input 
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          {/* Password field */}
          <div>
            Password
            <input 
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  // If the user has logged in, return the blogs posted by the user
  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      
      {/* Allowing new user to add new blogs  */}
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

      {/* Filter and select only the blogs belonging to the login user */}
      {console.log(blogs)}
      {console.log(user)}
      {blogs
        .filter(blog => 
          blog.user && (blog.user.id === user.id || blog.user === user.id))
        .map(blog =>
          <Blog key={blog.id} blog={blog} />
      )}

      {/* Button for logging out */}
      <button onClick={handleLogout}>Log out</button>
    </div>    
  )
}

export default App