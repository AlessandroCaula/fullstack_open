import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { useParams } from "react-router-dom"
import CircleIcon from '@mui/icons-material/Circle'

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
      <List dense={true}>
        {/* Loop through all the blogs added from the selected user */}
        {selectedUserBlogs.map(blog => (
          <ListItem key={blog.id} >
            <ListItemIcon>
              <CircleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText 
              primary={blog.title}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default UserView