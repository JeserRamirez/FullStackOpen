
const Countries = ({countries, handleClick}) => {
    return (
        <>
            <ul>
                {
                    countries.map(country => (
                        <li key={country.cca3}>
                            {country.name.common} 
                            <button onClick={() => handleClick(country.name.common)}>
                                Show
                            </button>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default Countries;