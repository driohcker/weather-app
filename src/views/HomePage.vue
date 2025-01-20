<template>
  <div class="container">
    <el-main>
      <weather-card
        v-for="(weather, index) in weatherList"
        :key="index"
        :weather="weather"
        @delete="handleDeleteWeather"
      />
    </el-main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import WeatherCard from '@/components/WeatherCard.vue'
import { searchCity, getNowWeather, getDailyWeather } from '@/js/api'
import { formatWeatherData, loadWeatherData, saveWeatherData, deleteWeatherData } from '@/js/weather'
import { handleApiError } from '@/js/utils'
import { ElLoading, ElMessage } from 'element-plus'

export default {
  name: 'HomePage',
  components: {
    WeatherCard
  },
  setup() {
    const weatherList = ref([])

    const refreshWeatherList = () => {
      weatherList.value = loadWeatherData()
    }

    onMounted(() => {
      refreshWeatherList()
    })

    const handleSearch = async (city) => {
      if (!city.trim()) {
        ElMessage.warning('Please enter a city name')
        return
      }

      const loading = ElLoading.service({
        lock: true,
        text: 'Loading weather data...',
        background: 'rgba(255, 255, 255, 0.7)'
      })

      try {
        // 获取城市信息
        const cityData = await searchCity(city)
        
        // 获取天气数据
        const [nowData, dailyData] = await Promise.all([
          getNowWeather(cityData.id),
          getDailyWeather(cityData.id)
        ])

        // 格式化并保存数据
        const weatherData = formatWeatherData(city, nowData, dailyData)
        weatherList.value = saveWeatherData(weatherData)

        ElMessage.success('Weather data updated successfully')
      } catch (error) {
        const { message } = handleApiError(error)
        ElMessage.error(message)
      } finally {
        loading.close()
      }
    }

    // 添加刷新所有天气数据的方法
    const refreshAllWeather = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Updating weather data...',
        background: 'rgba(255, 255, 255, 0.7)'
      })

      try {
        const cities = loadWeatherData()
        const updatedWeather = []

        // 依次更新每个城市的天气
        for (const cityData of cities) {
          try {
            const cityInfo = await searchCity(cityData.city)
            const [nowData, dailyData] = await Promise.all([
              getNowWeather(cityInfo.id),
              getDailyWeather(cityInfo.id)
            ])

            const weatherData = formatWeatherData(cityData.city, nowData, dailyData)
            updatedWeather.push(weatherData)
          } catch (error) {
            console.error(`Failed to update weather for ${cityData.city}:`, error)
            updatedWeather.push(cityData) // 保留原数据
          }
        }

        // 保存更新后的数据
        localStorage.setItem('weatherList', JSON.stringify(updatedWeather))
        weatherList.value = updatedWeather
        ElMessage.success('Weather data updated successfully')
      } catch (error) {
        console.error('Failed to refresh weather:', error)
        ElMessage.error('Failed to update weather data')
      } finally {
        loading.close()
      }
    }

    const handleDeleteWeather = (city) => {
      weatherList.value = deleteWeatherData(city)
    }

    return {
      weatherList,
      handleSearch,
      handleDeleteWeather,
      refreshWeatherList,
      refreshAllWeather
    }
  }
}
</script>