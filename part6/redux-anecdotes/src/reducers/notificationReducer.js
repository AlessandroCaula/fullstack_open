import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    // Showing the notification when adding a new note.
    showNotification(state, action) {
      const notificationText = action.payload
      return notificationText
    },
    // Hiding the notification after timer.
    hideNotification() {
      return ''
    }
  }
})

// Helper function to show and hide the notification message.
export const setNotification = (message, seconds = 5) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

export const { showNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer