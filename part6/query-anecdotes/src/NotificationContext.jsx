/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_ANECDOTE":
      return `Anecdote '${action.payload}' added`
    case "VOTE_ANECDOTE":
      return `Anecdote '${action.payload}' voted`
    case "ERROR":
      return 'Too short anecdote, must have length 5 or more'
    case "HIDE":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificationText, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={[notificationText, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext