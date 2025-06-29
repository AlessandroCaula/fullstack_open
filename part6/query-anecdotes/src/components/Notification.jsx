// import { useReducer } from "react"

// const notificationReducer = (state, action) => {
//   switch (action.type) {
//     case 'NEW':
//       return `New anecdote: ${state}`
//     case 'VOTE':
//       return `Voted: ${state}`
//     case 'HIDE':
//       return ''
//     default:
//       return state
//   }
// }

const Notification = ({ notificationText }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  return (
    <div style={style}>
      {notificationText}
    </div>
  )
}

export default Notification
