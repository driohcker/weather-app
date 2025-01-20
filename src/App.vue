<template>
  <div 
    class="app-container"
    v-touch:swipe.left="handleSwipeLeft"
    v-touch:swipe.right="handleSwipeRight"
  >
    <router-view v-slot="{ Component }">
      <transition 
        :name="transitionName"
        mode="out-in"
      >
        <component 
          :is="Component" 
          ref="currentPage"
        />
      </transition>
    </router-view>

    <bottom-nav
      :current-tab="currentTab"
      @search="handleSearch"
      @direction-change="handleDirectionChange"
      @refresh="handleRefresh"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { darkModeManager } from '@/js/utils'
import BottomNav from '@/components/BottomNav.vue'
import { searchCity, getNowWeather, getDailyWeather } from '@/js/api'
import { formatWeatherData, saveWeatherData } from '@/js/weather'
import { handleApiError } from '@/js/utils'
import { ElLoading, ElMessage } from 'element-plus'

export default {
  name: 'App',
  components: {
    BottomNav
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const transitionName = ref('slide-left')
    const currentPage = ref(null)

    // 据当前路由计算当前标签
    const currentTab = computed(() => {
      return route.path === '/' ? 'home' : 'profile'
    })

    const handleDirectionChange = (direction) => {
      transitionName.value = `slide-${direction}`
    }

    const handleSwipeLeft = () => {
      if (route.path === '/') {
        transitionName.value = 'slide-left'
        router.push('/my')
      }
    }

    const handleSwipeRight = () => {
      if (route.path === '/my') {
        transitionName.value = 'slide-right'
        router.push('/')
      }
    }

    const handleSearch = async (city) => {
      if (!city.trim()) {
        ElMessage.warning('Please enter a city name')
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

        ElMessage.success('城市天气数据加载成功')
        
        if (route.path === '/my') {
          transitionName.value = 'slide-right'
          router.push('/')
        } else if (route.path === '/') {
          // 如果当前在首页，直接刷新数据
          if (currentPage.value?.refreshWeatherList) {
            currentPage.value.refreshWeatherList()
          }
        }
      } catch (error) {
        const { message } = handleApiError(error)
        ElMessage.error(message)
      } finally {
        loading.close()
      }
    }

    const handleRefresh = () => {
      if (currentPage.value?.refreshAllWeather) {
        currentPage.value.refreshAllWeather()
      }
    }
    
    onMounted(() => {
      darkModeManager.init()
    })

    return {
      currentTab,
      transitionName,
      currentPage,
      handleSwipeLeft,
      handleSwipeRight,
      handleSearch,
      handleDirectionChange,
      handleRefresh
    }
  }
}
</script>

<style>
.app-container {
  height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* 滑动过渡效果 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

/* 确保过渡期间组件不会重叠 */
.slide-left-leave-active,
.slide-right-leave-active {
  position: absolute;
  width: 100%;
  top: 0;
}
</style>
