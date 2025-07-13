import { useState } from "react"

const Blog = ({ blog, blogDeletion, blogLikesUpdate }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false)

  const blogStyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '2px',
    marginBottom: '5px',
    border: 'solid',
    borderWidth: 1,
  }

  const blogButtonViewHide = {
    background: '#83dcffca',
    border: 'solid 1px',
    borderRadius: '2px'
  }

  const handleVisibility = () => {
    setIsDetailVisible(!isDetailVisible)
  }

  const showBlogDetails = () => (
    <>
      {console.log(blog)}
      <div>{blog.url}</div>
      <div data-testid="blog-likes">
        likes {blog.likes}
        <button onClick={blogLikesUpdate}>Like</button>
      </div>
      <div>{blog.user.name}</div>
      <button style={{color: 'red'}} onClick={blogDeletion}>Delete</button>
    </>
  )

  return (
    <div style={blogStyle} className="blog">
      <div style={{ display: 'flex', gap: '5px' }} className="blog-author-title">
        {blog.title} {blog.author}
        <button style={blogButtonViewHide} onClick={handleVisibility} className="blog-button">
          {/* Show hide button when details are visible and vice-versa */}
          {isDetailVisible ? 'Hide' : 'View details'}
        </button>
      </div>
      <div className="blog-url-likes">
        {/* Show blog details */}
        {isDetailVisible && showBlogDetails()}
      </div>
    </div>
  )
}

export default Blog