<!-- src/components/WeatherCard.vue -->
<template>
    <van-card :title="weather.name">
      <div class="weather-info">
        <p>温度: {{ weather.main.temp }}°C</p>
        <p>天气: {{ weather.weather[0].description }}</p>
        <p>湿度: {{ weather.main.humidity }}%</p>
        <p>风速: {{ weather.wind.speed }} m/s</p>
      </div>
    </van-card>
  </template>
  
  <script>
  export default {
    props: {
      weather: Object,
    },
  };
  </script>
  
  <style scoped>
  .weather-info {
    padding: 10px;
    font-size: 16px;
  }
  </style>
  