
const Filter = (props) => {
    return (
        <form>
            <div>
                filter shown with: <input type="text" onChange={props.handleChange} />
            </div>
        </form>
    )
}

export default Filter