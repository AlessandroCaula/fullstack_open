import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => { // color, message
  
  const [notification] = useContext(NotificationContext)

  // Define the style of the notification
  const notificationStyle = {
    color: notification.color || 'black',
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

  return (
    <div style={notificationStyle} data-testid='errorDiv'>
      {notification.message}
    </div>
  )
}

export default Notification