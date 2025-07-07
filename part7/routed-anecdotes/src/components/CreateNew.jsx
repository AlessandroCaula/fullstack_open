import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
  // Custom hooks
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    // Navigate to the anecdotes view ("/")
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    // console.log('resetting')
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            name='content'
            type={content.type}
            value={content.value} 
            onChange={content.onChange} 
          />
        </div>
        <div>
          author
          <input 
            name='author' 
            type={author.type}
            value={author.value} 
            onChange={author.onChange} 
          />
        </div>
        <div>
          url for more info
          <input 
            name='info'
            type={info.type} 
            value={info.value} 
            onChange={info.onChange} 
          />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew