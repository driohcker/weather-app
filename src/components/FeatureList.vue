<template>
  <el-card class="feature-card">
    <el-menu>
      <!-- 深色模式开关 -->
      <el-menu-item @click="handleDarkMode">
        <el-icon><Moon /></el-icon>
        <span>深色模式</span>
        <template #title>
          <el-switch
            v-model="isDarkMode"
            @change="handleDarkMode"
          />
        </template>
      </el-menu-item>

      <!-- 清除缓存 -->
      <el-menu-item @click="handleClearData">
        <el-icon><Delete /></el-icon>
        <span>清除缓存</span>
      </el-menu-item>

      <!-- 关于信息 -->
      <el-menu-item @click="handleAbout">
        <el-icon><InfoFilled /></el-icon>
        <span>关于</span>
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script>
import { ref } from 'vue'
import { Moon, Delete, InfoFilled } from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

export default {
  name: 'FeatureList',
  components: {
    Moon,
    Delete,
    InfoFilled
  },
  emits: ['clear-data'],
  setup(props, { emit }) {
    const isDarkMode = ref(localStorage.getItem('darkMode') === 'true')

    const handleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
      }
      localStorage.setItem('darkMode', isDarkMode.value)
    }

    const handleClearData = async () => {
      try {
        await ElMessageBox.confirm(
          '确定要清除所有天气数据吗？此操作不可恢复。',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        emit('clear-data')
      } catch {
        // 用户取消操作
      }
    }

    const handleAbout = () => {
  ElMessageBox.alert(
    '天气应用 v0.6.1<br>' +
    '这是一个简单的天气查询应用，支持多城市天气查询和记录。<br>' +
    '作者：lost summer<br>',
    '关于',
    {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true, // 允许使用 HTML 字符串
    }
  ).catch(() => {});
};

    return {
      isDarkMode,
      handleDarkMode,
      handleClearData,
      handleAbout
    }
  }
}
</script>

<style scoped>
.feature-card {
  margin: 20px auto;
  width: 99%;
  max-width: 400px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.feature-card :deep(.el-menu) {
  border: none;
  background: transparent;
}

.feature-card :deep(.el-menu-item) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.feature-card :deep(.el-menu-item .el-icon) {
  margin-right: 12px;
  font-size: 18px;
}

/* 深色模式适配 */
:deep(.dark-mode) .feature-card {
  background-color: rgba(33, 33, 33, 0.8);
}

:deep(.dark-mode) .el-menu {
  background-color: transparent;
  border-color: rgba(255, 255, 255, 0.1);
}

:deep(.dark-mode) .el-menu-item {
  color: #ffffff;
}

:deep(.dark-mode) .el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media screen and (max-width: 480px) {
  .feature-card {
    margin: 15px auto;
  }
}
</style>
