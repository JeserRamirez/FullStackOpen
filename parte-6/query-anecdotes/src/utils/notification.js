export const setNotification = (dispatch, message, seconds = 5) => {
  dispatch({ type: 'SET_NOTIFICATION', payload: message })
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, seconds * 1000)
}
