const Notification = ({ message, statusCode }) => {
  if (!message) return null

  const isError = statusCode >= 400
  const isSuccess = statusCode >= 200 || statusCode < 300

  const className = isError ? 'error' : isSuccess ? 'success' : ''

  return <div className={className}>{message}</div>
}

export default Notification