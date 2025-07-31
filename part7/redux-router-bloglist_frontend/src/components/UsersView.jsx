import { Link } from "react-router-dom"

// Users component view
const UsersView = ({ allUsers }) => {
  // If all the users are not yet fetched return 
  if (!allUsers) {
    return
  }

  return (
    <div>
      <h1>Users</h1>
      <div style={{ display: 'flex', fontWeight: 'bold' }}>
        <div style={{ width: '150px' }}></div>
        <div style={{ width: '150px' }}>blogs created</div>
      </div>
      {/* Mapping through all the Users and display them */}
      {allUsers.map(user => (
        <div key={user.id} style={{ display: 'flex' }}>
          {/* <div style={{ width: '150px' }}>{user.name}</div> */}
          <Link style={{ width: '150px' }} to={`/users/${user.id}`}>{user.name}</Link>
          <div style={{ width: '150px' }}>{user.blogs.length}</div>
        </div>
      ))}
    </div>
  )
}

export default UsersView