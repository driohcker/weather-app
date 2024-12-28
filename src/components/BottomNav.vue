<template>
  <div class="bottom-nav-container">
    <div class="bottom-nav">
      <div 
        class="nav-item"
        :class="{ active: currentTab === 'home' }"
        @click="handleNavClick('home')"
      >
        <el-icon><House /></el-icon>
        <span>主页</span>
      </div>
      
      <search-bar
        @search="$emit('search', $event)"
      />

      <div 
        class="nav-item"
        :class="{ active: currentTab === 'profile' }"
        @click="handleNavClick('profile')"
      >
        <el-icon><User /></el-icon>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script>
import { House, User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import SearchBar from './SearchBar.vue'

export default {
  name: 'BottomNav',
  components: {
    House,
    User,
    SearchBar
  },
  props: {
    currentTab: {
      type: String,
      required: true,
      validator: (value) => ['home', 'profile'].includes(value)
    }
  },
  emits: ['search', 'direction-change', 'refresh'],
  setup(props, { emit }) {
    const router = useRouter()

    const handleNavClick = (tab) => {
      if (tab === 'home') {
        if (router.currentRoute.value.path === '/my') {
          emit('direction-change', 'right')
          router.push('/')
        } else if (router.currentRoute.value.path === '/') {
          emit('refresh')
        }
      } else if (tab === 'profile' && router.currentRoute.value.path === '/') {
        emit('direction-change', 'left')
        router.push('/my')
      }
    }

    return {
      handleNavClick
    }
  }
}
</script>

<style scoped>
.bottom-nav-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  z-index: 1000;
}

.bottom-nav {
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: var(--card-shadow);
}

.nav-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: 0 20px;
  cursor: pointer;
  border-radius: 50px;
  transition: all var(--transition-duration) ease;
  color: var(--text-secondary);
  flex-direction: column;
  gap: 4px;
}

.nav-item:hover,
.nav-item.active {
  color: var(--primary-color);
  background-color: rgba(64, 158, 255, 0.1);
}

.nav-item .el-icon {
  font-size: 18px;
}

.nav-item span {
  font-size: 14px;
}

/* 深色模式适配 */
:deep(.dark-mode) .bottom-nav {
  background-color: rgba(33, 33, 33, 0.8);
  
}

/* 响应式设计 */
@media screen and (max-width: 480px) {
  .bottom-nav-container {
    width: 90%;
    bottom: 15px;
  }

  .nav-item {
    height: 50px;
    padding: 0 12px;
  }

  .nav-item span {
    font-size: 12px;
  }
}
</style>
