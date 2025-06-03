
const Notification = ({ message, statusCode }) => {
    if (message === null) {
        return null
    }
    
    const isError = [400, 404].includes(Number(statusCode));

    return (
        <div className={`${isError ? 'error' : 'success'}`}>
            {message}
        </div>
    )
}

export default Notification