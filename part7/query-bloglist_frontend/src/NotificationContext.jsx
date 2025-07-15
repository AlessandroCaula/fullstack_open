import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_BLOG":
      return {
        message: `A new blog: ${action.payload.title} ${action.payload.author ? `by ${action.payload.author} added` : ''}`,
        color: 'green'
      }
    case "ERROR_NEW_BLOG":
      return {
        message: 'Blog cannot be created',
        color: 'red'
      }
    case "DELETE_BLOG":
      return {
        message: `${action.payload.title} successfully deleted`,
        color: 'green'
      }
    case "ERROR_DELETE_BLOG":
      return {
        message: 'Not able to delete the blog',
        color: 'red'
      }
    case "ERROR_LOGIN":
      return {
        message: 'Wrong username or password',
        color: 'red'
      }
    case "ERROR_LIKES":
      return {
        message: 'Likes cannot be updated',
        color: 'red'
      }
    case "HIDE":
      return {
        message: '',
        color: ''
      }
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const initialNotification = { message: '', color: '' }
  const [notificationInfo, notificationDispatch] = useReducer(notificationReducer, initialNotification)

  return (
    <NotificationContext.Provider value={[notificationInfo, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext