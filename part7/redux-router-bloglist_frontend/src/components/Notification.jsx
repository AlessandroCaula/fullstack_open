import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {  // { color }
  // Retrieving the notification message from the redux
  const notification = useSelector(allRedux => allRedux.notification)

  // If  the notification is null, return
  if (!notification) {
    return
  }

  // Deconstruct the notification
  const { message, color } = notification
  
  // Define the style of the notification
  const notificationStyle = {
    color: color || 'black',
    fontSize: '18px',
    height: '30px',
    background: 'lightgrey',
    border: '2px solid',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    marginBottom: '5px'
  }
  const severity = color === 'green' ? 'success' : 'error'

  return (
    // If the message as something, then show the notification.
    message && 
      // <div style={notificationStyle} data-testid='errorDiv'>
      //   { message}
      // </div>

      <Alert severity={severity}>
        {message}
      </Alert>
  )
}

export default Notification