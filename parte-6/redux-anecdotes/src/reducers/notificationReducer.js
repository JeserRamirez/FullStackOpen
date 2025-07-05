import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: 'notification',
  initialState: 'Welcome to Anecdotes!',
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    },
  },
})

export const { setMessage, clearNotification } = notificationReducer.actions

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(setMessage(content))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * seconds)
  }
}

export default notificationReducer.reducer
