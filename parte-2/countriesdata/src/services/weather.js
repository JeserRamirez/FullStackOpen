import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const API = "https://api.openweathermap.org/data/2.5/weather";

const API_ICON = "https://openweathermap.org/img/wn";

const getCountryWeather = (countryName) => {
  const request = axios.get(
    `${API}/?q=${countryName}&appid=${API_KEY}&units=metric`
  );
  return request.then((response) => {
    return response.data;
  });
};

const getWeatherIcon = (iconCode) => {
  return `${API_ICON}/${iconCode}@2x.png`;
};

export default {
  getCountryWeather,
  getWeatherIcon,
};
