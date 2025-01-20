import axios from 'axios'

const API_KEY = ''
const BASE_GEO_URL = ''
const BASE_WEATHER_URL = ''

// 创建 axios 实例
const weatherApi = axios.create({
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json'
  }
})

// 城市查询
export const searchCity = async (cityName) => {
  try {
    const response = await weatherApi.get(`${BASE_GEO_URL}/city/lookup`, {
      params: {
        location: cityName,
        key: API_KEY
      }
    })
    
    if (response.data.code === '200' && response.data.location?.length > 0) {
      return response.data.location[0]
    }
    throw new Error('City not found')
  } catch (error) {
    console.error('Error searching city:', error)
    throw error
  }
}

// 获取实时天气
export const getNowWeather = async (locationId) => {
  try {
    const response = await weatherApi.get(`${BASE_WEATHER_URL}/weather/now`, {
      params: {
        location: locationId,
        key: API_KEY
      }
    })
    
    if (response.data.code === '200') {
      return response.data.now
    }
    throw new Error('Failed to get current weather')
  } catch (error) {
    console.error('Error getting current weather:', error)
    throw error
  }
}

// 获取天气预报
export const getDailyWeather = async (locationId) => {
  try {
    const response = await weatherApi.get(`${BASE_WEATHER_URL}/weather/3d`, {
      params: {
        location: locationId,
        key: API_KEY
      }
    })
    
    if (response.data.code === '200') {
      return response.data.daily[0]
    }
    throw new Error('Failed to get weather forecast')
  } catch (error) {
    console.error('Error getting weather forecast:', error)
    throw error
  }
}
