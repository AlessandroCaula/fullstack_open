import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
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
      
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left" sx={{ fontWeight: 'bold' }}>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers.map(user => (
               <TableRow key={user.id}>
                <TableCell>
                  <Link style={{ width: '150px' }} to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>
                  <div style={{ width: '150px' }}>{user.blogs.length}</div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersView