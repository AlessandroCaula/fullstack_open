import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(anecdote => anecdote.notification)
  // console.log(notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    // Render the notification only if notification is not an empty string ''.
    notification && 
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification