import { configureStore } from "@reduxjs/toolkit";
// Reducers
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedUser: userReducer
  }
})

export default store
