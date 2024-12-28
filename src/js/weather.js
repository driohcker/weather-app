// 天气数据处理
export const formatWeatherData = (city, now, daily) => {
  return {
    city,
    temp: now.temp,
    text: now.text,
    feelsLike: now.feelsLike,
    humidity: now.humidity,
    windDir: now.windDir,
    windScale: now.windScale,
    windSpeed: now.windSpeed,
    pressure: now.pressure,
    vis: now.vis,
    tempMax: daily.tempMax,
    tempMin: daily.tempMin,
    sunrise: daily.sunrise,
    sunset: daily.sunset,
    updateTime: new Date().toISOString()
  }
}

// 本地存储操作
export const saveWeatherData = (weatherData) => {
  let weatherList = JSON.parse(localStorage.getItem('weatherList') || '[]')
  const existingIndex = weatherList.findIndex(item => item.city === weatherData.city)
  
  if (existingIndex !== -1) {
    weatherList.splice(existingIndex, 1)
  }
  
  weatherList.unshift(weatherData)
  localStorage.setItem('weatherList', JSON.stringify(weatherList))
  return weatherList
}

export const loadWeatherData = () => {
  return JSON.parse(localStorage.getItem('weatherList') || '[]')
}

export const clearWeatherData = () => {
  localStorage.removeItem('weatherList')
}

export const deleteWeatherData = (city) => {
  let weatherList = loadWeatherData()
  weatherList = weatherList.filter(item => item.city !== city)
  localStorage.setItem('weatherList', JSON.stringify(weatherList))
  return weatherList
}
