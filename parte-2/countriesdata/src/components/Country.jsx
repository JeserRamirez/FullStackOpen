import { useEffect, useState } from "react";
import weatherService from '../services/weather'

const Country = ({country}) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        weatherService
            .getCountryWeather(country.name.common)
            .then(countryWeather => {
                console.log(countryWeather)
                setWeather(countryWeather)
            })
    }, [country])

    return (
        <div>
            <div>
                <h1>{country.name.common}</h1>
                <p>Capital {country.capital}</p>
                <p>Area {country.area}</p>
            </div>
            <div>
                <h2>Languages</h2>
                <ul>
                    {
                        Object.entries(country.languages).map(([code, name]) => (
                            <li key={code}>{name}</li>
                        ))
                    }
                </ul>
                <img src={country.flags.png} alt={`${country.name.common} flag`} />
            </div>
            <div>
                <h2>Weather in {country.name.common}</h2>
                {weather.main ? (
                    <>
                    <p>Temperature {weather.main.temp} Celsius</p>
                    <img
                        src={weatherService.getWeatherIcon(weather.weather[0].icon)}
                        alt={weather.weather[0].description}
                    />
                    <p>Wind {weather.wind.speed} m/s</p>
                    </>
                ) : (
                    <p>Loading weather data...</p>
                )}
            </div>
        </div>
    )
}

export default Country;