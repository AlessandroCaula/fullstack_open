import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    // Login user
    loginUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      return null
    }
  }
})

export const { loginUser, logoutUser } = userSlice.actions

export const setUser = user => {
  return dispatch => {
    dispatch(loginUser(user))
  }
}

export default userSlice.reducer