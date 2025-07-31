import { useParams } from "react-router-dom"

// User view component
const UserView = ({ allUsers }) => {  
  if (!allUsers) {
    return
  }
  // Check which user has been selected
  const userId = useParams().id
  // Extract the selected user from the list of allUser
  const selectedUser = allUsers.find(user => user.id === userId)
  const selectedUserBlogs = selectedUser.blogs
  return (
    <div>
      <h1>{selectedUser.name}</h1>
      <h3>Added blogs</h3>
      <ul>
        {/* Loop through all the blogs added from the selected user */}
        {selectedUserBlogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserView