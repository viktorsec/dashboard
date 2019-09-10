// from https://github.com/farahat80/react-open-weather
import axios from 'axios';
import {APIXU_API_KEY} from '../config/keys'

function getWeather(type, location) {
  const endpoint = `//api.apixu.com/v1/${type}.json`;
  const numberOfDays = type === 'forecast'
    ? 5
    : undefined

  const params = {
    key: APIXU_API_KEY,
    q: location,
    days: numberOfDays,
  }

  const promise = axios.get(endpoint, {
    params
  }).then((response) => {
    const data = response.data;
    if (data) {
      return data;
    }
    return {}
  })
  return promise
}

export function getCurrentWeather(location) {
  return getWeather('current', location)
}

export function getForecastWeather(location) {
  return getWeather('forecast', location)
}
