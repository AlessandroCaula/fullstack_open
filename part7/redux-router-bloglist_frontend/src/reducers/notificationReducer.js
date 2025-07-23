import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    // Show the notification when adding a new note.
    showNotification(state, action) {
      const notification = action.payload
      return notification
    },
    // Hide notification after timer
    clearNotification() {
      return null
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

// Helper function to show and hide the notification message
export const setNotification = (message, color, seconds = 5) => {
  return async dispatch => {
    // Show notification message
    dispatch(showNotification({ message: message, color: color }))
    setTimeout(() => {
      // Hide notification message after timeout
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer