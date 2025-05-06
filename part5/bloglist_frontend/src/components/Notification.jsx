const Notification = ({ message, color }) => {
  // If there is no message, don't render anything
  if (!message) {
    return null
  }
  
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

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification