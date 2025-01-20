<template>
  <div 
    class="search-item"
    :class="{ expanded: isExpanded }"
    @click.stop="handleClick"
  >
    <template v-if="!isExpanded">
      <el-icon><Search /></el-icon>
      <span>搜索</span>
    </template>
    
    <el-input
      v-else
      v-model="searchText"
      placeholder="请输入城市名"
      class="search-input"
      @click.stop
      @keyup.enter="handleSearch"
    >
      <template #append>
        <button 
          @click.stop="handleSearch" 
          class="custom-search-button"
        >
          <el-icon><Search /></el-icon>
          搜索
        </button>
      </template>
    </el-input>
  </div>
</template>

<script>
import { ref, onBeforeUnmount } from 'vue'
import { Search } from '@element-plus/icons-vue'

export default {
  name: 'SearchBar',
  components: {
    Search
  },
  emits: ['search'],
  setup(props, { emit }) {
    const searchText = ref('')
    const isExpanded = ref(false)

    const handleClick = () => {
      if (!isExpanded.value) {
        isExpanded.value = true
        document.addEventListener('click', handleOutsideClick)
      }
    }

    const handleSearch = () => {
      if (searchText.value.trim()) {
        emit('search', searchText.value.trim())
        searchText.value = ''
        isExpanded.value = false
      }
    }

    const handleOutsideClick = (event) => {
      const searchItem = event.target.closest('.search-item')
      if (!searchItem) {
        isExpanded.value = false
        document.removeEventListener('click', handleOutsideClick)
      }
    }

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleOutsideClick)
    })

    return {
      searchText,
      isExpanded,
      handleClick,
      handleSearch
    }
  }
}
</script>

<style scoped>
.search-item {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  height: 56px;
  padding: 0 20px;
  cursor: pointer;
  border-radius: 50px;
  transition: all var(--transition-duration) ease;
  color: var(--text-secondary);
}

.search-item.expanded {
  flex: 5;
  background-color: rgba(255, 255, 255, 0.9);
}

.search-input {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 20px);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-duration) ease;
}

.search-item.expanded .search-input {
  opacity: 1;
  visibility: visible;
}

.search-item.expanded span {
  opacity: 0;
  visibility: hidden;
}

.custom-search-button {
  border: none;
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  color: white;
  background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
  box-shadow: 0 4px 15px rgba(79, 172, 254, 0.2);
  transition: all var(--transition-duration) ease;
  font-weight: 500;
}

.custom-search-button:hover {
  background: linear-gradient(45deg, #00f2fe 0%, #4facfe 100%);
  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.3);
  transform: translateY(-1px);
}

.custom-search-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(79, 172, 254, 0.2);
}

.search-input :deep(.el-input__wrapper) {
  box-shadow: none !important;
  background: transparent;
}

.search-input :deep(.el-input-group__append) {
  padding: 0;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

.search-input :deep(.el-input__inner) {
  border: none;
  background: transparent;
  padding-right: 10px;
}

/* 深色模式适配 */
:deep(.dark-mode) .search-item.expanded {
  background-color: rgba(33, 33, 33, 0.8);
}

:deep(.dark-mode) .search-input .el-input__inner {
  color: var(--text-primary);
}

/* 响应式设计 */
@media screen and (max-width: 480px) {
  .search-item {
    height: 50px;
    padding: 0 12px;
  }

  .search-item span {
    font-size: 12px;
  }

  .custom-search-button {
    height: 36px;
    padding: 0 16px;
    font-size: 13px;
  }
}
</style>
