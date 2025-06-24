import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'Welcome to Anecdotes!',
  reducers: {
    // Put the actions here later
  }
})

export default notificationSlice.reducer