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
import { loadWeatherData, deleteWeatherData } from '@/js/weather'
import { searchCity, getNowWeather, getDailyWeather } from '@/js/api'
import { formatWeatherData } from '@/js/weather'
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

    const refreshAllWeather = async () => {
      const loading = ElLoading.service({
        lock: true,
        text: '正在更新城市天气...',
        background: 'rgba(255, 255, 255, 0.7)'
      })

      try {
        const cities = loadWeatherData()
        const updatedWeather = []

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
            console.error(`更新天气记录失败： ${cityData.city}:`, error)
            updatedWeather.push(cityData)
          }
        }

        localStorage.setItem('weatherList', JSON.stringify(updatedWeather))
        weatherList.value = updatedWeather
        ElMessage.success('天气记录更新成功')
      } catch (error) {
        console.error('更新天气失败:', error)
        ElMessage.error('更新天气失败')
      } finally {
        loading.close()
      }
    }

    onMounted(() => {
      refreshWeatherList()
    })

    const handleDeleteWeather = (city) => {
      weatherList.value = deleteWeatherData(city)
      ElMessage.success('城市天气数据删除成功')
    }

    return {
      weatherList,
      handleDeleteWeather,
      refreshWeatherList,
      refreshAllWeather
    }
  }
}
</script>