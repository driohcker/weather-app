<template>
    <el-card class="user-card">
      <div class="user-info">
        <el-avatar 
          :size="64" 
          :src="avatar"
          @error="handleAvatarError"
        >
          <el-icon><User /></el-icon>
        </el-avatar>
        <div class="user-details">
          <h3>{{ name || '未登录' }}</h3>
          <p>{{ description || '（暂未实现登录功能）' }}</p>
        </div>
      </div>
    </el-card>
  </template>
  
  <script>
  import { User } from '@element-plus/icons-vue'
  
  export default {
    name: 'UserCard',
    components: {
      User
    },
    props: {
      avatar: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleAvatarError() {
        console.warn('Avatar loading failed')
      }
    }
  }
  </script>
  
  <style scoped>
  .user-card {
    margin: 20px auto;
    width: 99%;
    max-width: 400px;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }
  
  .user-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px;
  }
  
  .user-details h3 {
    margin: 0;
    font-size: 18px;
    color: #303133;
    font-weight: 600;
  }
  
  .user-details p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #909399;
  }
  
  /* 深色模式适配 */
  :deep(.dark-mode) .user-card {
    background-color: rgba(33, 33, 33, 0.8);
    
  }
  
  :deep(.dark-mode) .user-details h3 {
    color: #ffffff;
  }
  
  :deep(.dark-mode) .user-details p {
    color: #ffffff;
  }
  
  /* 响应式设计 */
  @media screen and (max-width: 480px) {
    .user-card {
      margin: 15px auto;
    }
  
    .user-details h3 {
      font-size: 16px;
    }
  
    .user-details p {
      font-size: 13px;
    }
  }
  </style>
  