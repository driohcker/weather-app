<template>
  <div class="container">
    <el-main>
      <user-card
        :avatar="userInfo.avatar"
        :name="userInfo.name"
        :description="userInfo.description"
      />

      <feature-list
        @clear-data="handleClearData"
      />
    </el-main>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserCard from '@/components/UserCard.vue'
import FeatureList from '@/components/FeatureList.vue'
import { searchCity, getNowWeather, getDailyWeather } from '@/js/api'
import { formatWeatherData, saveWeatherData, clearWeatherData } from '@/js/weather'
import { handleApiError } from '@/js/utils'
import { ElLoading, ElMessage } from 'element-plus'

export default {
  name: 'MyPage',
  components: {
    UserCard,
    FeatureList
  },
  setup() {
    const router = useRouter()
    const userInfo = ref({
      avatar: '',
      name: '',
      description: ''
    })

    const handleSearch = async (city) => {
      if (!city.trim()) {
        ElMessage.warning('请输入城市名')
        return
      }

      const loading = ElLoading.service({
        lock: true,
        text: '正在加载城市天气数据...',
        background: 'rgba(255, 255, 255, 0.7)'
      })

      try {
        const cityData = await searchCity(city)
        const [nowData, dailyData] = await Promise.all([
          getNowWeather(cityData.id),
          getDailyWeather(cityData.id)
        ])

        const weatherData = formatWeatherData(city, nowData, dailyData)
        saveWeatherData(weatherData)

        ElMessage.success('天气数据加载成功')
        router.push('/')
      } catch (error) {
        const { message } = handleApiError(error)
        ElMessage.error(message)
      } finally {
        loading.close()
      }
    }

    const handleClearData = () => {
      clearWeatherData()
      ElMessage.success('本地数据清理完毕')
    }

    return {
      userInfo,
      handleSearch,
      handleClearData
    }
  }
}
</script>