import { useState } from "react"

const Blog = ({ blog, blogDeletion, blogLikesUpdate }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false)

  const blogStyle = {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '2px',
    marginBottom: '4px',
    border: 'solid',
    borderWidth: 1,
  }

  const handleVisibility = () => {
    setIsDetailVisible(!isDetailVisible)
  }

  const showBlogDetails = () => (
    <>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={blogLikesUpdate}>Like</button>
      </div>
    </>
  )

  return (
    <div style={blogStyle}>
      <div style={{ display: 'flex', gap: '5px', paddingTop: '5px' }}>
        {blog.title} {blog.author}
        <button onClick={handleVisibility}>
          {/* Show hide button when details are visible and vice-versa */}
          {isDetailVisible ? 'Hide' : 'View details'}
        </button>
        <button onClick={blogDeletion}>Delete</button>
      </div>
      <div>
        {/* Show blog details */}
        {isDetailVisible && showBlogDetails()}
      </div>
    </div>
  )
}

export default Blog