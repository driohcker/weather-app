// 天气数据处理
export const formatWeatherData = (city, now, daily) => {
  // 确保所有必要的数据都存在
  if (!city || !now || !daily) {
    throw new Error('Missing required weather data')
  }

  return {
    city,
    temp: now.temp || 0,
    text: now.text || '',
    feelsLike: now.feelsLike || 0,
    humidity: now.humidity || 0,
    windDir: now.windDir || '',
    windScale: now.windScale || 0,
    windSpeed: now.windSpeed || 0,
    pressure: now.pressure || 0,
    vis: now.vis || 0,
    tempMax: daily.tempMax || 0,
    tempMin: daily.tempMin || 0,
    sunrise: daily.sunrise || '',
    sunset: daily.sunset || '',
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
  try {
    const data = localStorage.getItem('weatherList')
    if (!data) return []
    
    const parsedData = JSON.parse(data)
    return Array.isArray(parsedData) ? parsedData : []
  } catch (error) {
    console.error('Error loading weather data:', error)
    return []
  }
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
