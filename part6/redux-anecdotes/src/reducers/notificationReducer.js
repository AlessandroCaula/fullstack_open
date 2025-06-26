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
    clearNotification() {
      return ''
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

// Helper function to show and hide the notification message.
export const setNotification = (message, seconds = 5) => {
  return async dispatch => {
    dispatch(showNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer