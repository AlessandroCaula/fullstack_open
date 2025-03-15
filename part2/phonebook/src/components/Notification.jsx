const Notification = ({ message, color }) => {

  const notificationColor = {
    color: color
  }

  return (
    <div className="notification" style={notificationColor}>
      {message}
    </div>
  )
}

export default Notification