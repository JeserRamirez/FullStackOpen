import axios from "axios";

const API_URL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAllCountries = () => {
  const request = axios.get(`${API_URL}/all`);
  return request.then((response) => {
    return response.data;
  });
};

const getCountryByName = (name) => {
  const request = axios.get(`${API_URL}/name/${name}`);
  return request.then((response) => {
    return response.data;
  });
};

export default {
  getAllCountries,
  getCountryByName,
};
