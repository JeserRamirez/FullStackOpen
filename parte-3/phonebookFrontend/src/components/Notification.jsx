
const Notification = ({ message, statusCode }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={Number(statusCode) === 404 ? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification