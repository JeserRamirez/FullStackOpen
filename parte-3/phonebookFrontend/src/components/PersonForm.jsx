
const PersonForm = (props) => {
    return (
        <form>
            <div>
                name: <input type="text" onChange={props.handleName} value={props.name} />
            </div>
            <div>
                number: <input type="text" onChange={props.handleNumber} value={props.number} />
            </div>
            <div>
                <button type="submit" onClick={props.handleClick}>add</button>
            </div>
        </form>
    )
}

export default PersonForm