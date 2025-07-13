import { configureStore } from "@reduxjs/toolkit";

// Reducers
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})

export default store
