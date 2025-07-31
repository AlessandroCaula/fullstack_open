import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

const BlogView = ({ handleBlogLikesUpdate }) => {
  // Retrieve the blogs from the redux store
  const blogs = useSelector(allRedux => allRedux.blogs)
  // Retrieve the logged user from the redux store
  const loggedUser = useSelector(allRedux => allRedux.loggedUser)
  // Filter the blogs to displayed based on the logged user
  const userBlogs = blogs.filter(
    blog => blog.user && (blog.user.id === loggedUser.id || blog.user === loggedUser.id)
  )
  // Extract the selected blog
  const blogId = useParams().id
  const selectedBlog = userBlogs.find(blog => blog.id === blogId)

  if (!selectedBlog) {
    return
  }
  return (
    <>
      <h2>{selectedBlog.title}</h2>
      <a>{selectedBlog.url}</a>
      <div>
        likes {selectedBlog.likes}
        <button onClick={() => handleBlogLikesUpdate(selectedBlog.id)}>Like</button>
      </div>
      <p>added by {selectedBlog.user.name ?? 'Someone'}</p>
    </>
  )
}

export default BlogView