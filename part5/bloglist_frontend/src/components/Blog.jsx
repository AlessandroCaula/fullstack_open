const Blog = ({ blog, blogDeletion }) => (
  <div style={{ display: 'flex', gap: '10px' }}>
    {blog.title} {blog.author} 
    <button onClick={blogDeletion}>Delete</button>
  </div>  
)

export default Blog