<template>
  <el-card class="weather-card">
    <!-- 城市和删除按钮 -->
    <div class="card-header">
      <h2 class="city-name">{{ weather.city }}</h2>
      <el-button 
        type="danger" 
        circle
        @click="handleDelete"
      >
        <el-icon><Delete /></el-icon>
      </el-button>
    </div>

    <!-- 主要天气信息 -->
    <div class="weather-main">
      <div class="temperature">{{ weather.temp }}°C</div>
      <div class="weather-text">{{ weather.text }}</div>
    </div>

    <!-- 温度范围 -->
    <div class="temp-range">
      <div class="temp-item">
        <el-icon><Top /></el-icon>
        {{ weather.tempMax }}°C
      </div>
      <div class="temp-item">
        <el-icon><Bottom /></el-icon>
        {{ weather.tempMin }}°C
      </div>
    </div>

    <!-- 日出日落时间 -->
    <div class="sun-times">
      <div class="time-item">
        <el-icon><Sunrise /></el-icon>
        {{ weather.sunrise }}
      </div>
      <div class="time-item">
        <el-icon><Sunset /></el-icon>
        {{ weather.sunset }}
      </div>
    </div>

    <!-- 详细信息网格 -->
    <div class="info-grid">
      <div class="info-item">
        <el-icon><View /></el-icon>
        能见度 {{ weather.vis }}km
      </div>
      <div class="info-item">
        <el-icon><Monitor /></el-icon>
        气压 {{ weather.pressure }}hPa
      </div>
      <div class="info-item">
        <el-icon><WindPower /></el-icon>
        {{ weather.windDir }} {{ weather.windScale }}级
      </div>
      <div class="info-item">
        <el-icon><Watch /></el-icon>
        湿度 {{ weather.humidity }}%
      </div>
    </div>

    <!-- 更新时间 -->
    <div class="update-time">
      更新时间：{{ formatTime(weather.updateTime) }}
    </div>
  </el-card>
</template>

<script>
import { Delete, Top, Bottom, Sunrise, Sunset, View, Monitor, WindPower, Watch } from '@element-plus/icons-vue'

export default {
  name: 'WeatherCard',
  components: {
    Delete,
    Top,
    Bottom,
    Sunrise,
    Sunset,
    View,
    Monitor,
    WindPower,
    Watch
  },
  props: {
    weather: {
      type: Object,
      required: true,
      validator: (obj) => {
        return [
          'city', 'temp', 'text', 'tempMax', 'tempMin',
          'sunrise', 'sunset', 'vis', 'pressure',
          'windDir', 'windScale', 'humidity', 'updateTime'
        ].every(key => key in obj)
      }
    }
  },
  emits: ['delete'],
  methods: {
    formatTime(timeString) {
      if (!timeString) return '';
      const date = new Date(timeString);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
    },
    handleDelete() {
      this.$emit('delete', this.weather.city);
    }
  }
}
</script>

<style scoped>
.weather-card {
  margin: 20px auto;
  width: 99%;
  max-width: 400px;
  border-radius: 32px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.weather-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.city-name {
  margin: 0;
  font-size: 24px;
  color: #303133;
}

.weather-main {
  text-align: center;
  margin-bottom: 20px;
}

.temperature {
  font-size: 48px;
  font-weight: bold;
  color: #303133;
}

.weather-text {
  font-size: 18px;
  color: #606266;
  margin-top: 5px;
}

.temp-range, .sun-times {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
}

.temp-item, .time-item {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #606266;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin: 20px 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}

.update-time {
  text-align: right;
  font-size: 12px;
  color: #909399;
  margin-top: 10px;
}

/* 图标样式 */
.el-icon {
  font-size: 18px;
}

/* 深色模式适配 */
:deep(.dark-mode) .weather-card {
  background-color: rgba(33, 33, 33, 0.8);
}

:deep(.dark-mode) .city-name,
:deep(.dark-mode) .temperature {
  color: #ffffff;
}

:deep(.dark-mode) .weather-text,
:deep(.dark-mode) .temp-item,
:deep(.dark-mode) .time-item,
:deep(.dark-mode) .info-item {
  color: #e0e0e0;
}

:deep(.dark-mode) .update-time {
  color: #909399;
}

/* 响应式设计 */
@media screen and (max-width: 480px) {
  .weather-card {
    margin: 15px auto;
  }

  .city-name {
    font-size: 20px;
  }

  .temperature {
    font-size: 40px;
  }

  .weather-text {
    font-size: 16px;
  }

  .info-grid {
    gap: 10px;
  }
}
</style>
