import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Country from './components/Country'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  
  useEffect(() => {
    countryService.getAllCountries().then(data => setCountries(data))
  }, [])

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredCountries(filtered)
  }, [searchTerm, countries])

  const handleCountries = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleShowCountry = (countryName) => {
    setSearchTerm(countryName)
  }

  return (
    <>
        <div>
          find countries
          <input type="text" onChange={handleCountries} />
        </div>

        {filteredCountries.length === 0 && searchTerm || searchTerm === ''
        ? <p>No countries to show</p>
        : filteredCountries.length > 10
          ? <p>Too many matches, specify another filter</p>
          : filteredCountries.length > 1
            ? <Countries countries={filteredCountries} handleClick={handleShowCountry} />
            : filteredCountries.length === 1
              ? <Country country={filteredCountries[0]} />
              : null
      }
    </>
  )
}

export default App
