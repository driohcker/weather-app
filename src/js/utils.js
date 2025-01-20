// 时间格式化
export const formatTime = (timeString) => {
  if (!timeString) return ''
  const date = new Date(timeString)
  return `${date.getFullYear()}
  -${String(date.getMonth() + 1).padStart(2, '0')}
  -${String(date.getDate()).padStart(2, '0')} 
  ${String(date.getHours()).padStart(2, '0')}
  :${String(date.getMinutes()).padStart(2, '0')}`
}

// 深色模式管理
export const darkModeManager = {
  isDarkMode() {
    return localStorage.getItem('darkMode') === 'true'
  },
  
  setDarkMode(value) {
    localStorage.setItem('darkMode', value)
    if (value) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  },
  
  toggle() {
    const current = this.isDarkMode()
    this.setDarkMode(!current)
    return !current
  },
  
  init() {
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark-mode')
    }
  }
}

// 错误处理
export const handleApiError = (error) => {
  console.error('API Error:', error)
  return {
    message: error.response?.data?.message || 'An error occurred',
    code: error.response?.status || 500
  }
}
