// src/api/weather.js
import axios from 'axios';

const API_KEY = 'your_api_key';  // 替换为你申请的API密钥
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',  // 使用摄氏温度
        lang: 'zh_cn',    // 设置中文返回
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};