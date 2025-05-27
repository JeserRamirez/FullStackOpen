
const Persons = (props) => {
    return (
        <>
            {
                props.persons.map(person => {
                    return (
                        <div key={person.name}>
                            {person.name} {person.number}
                            <button onClick={() => props.delete(person.id)}>
                                delete
                            </button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default Persons