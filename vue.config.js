const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8080,  // 你可以修改为你想要的端口
    allowedHosts: 'all',  // 允许所有主机头
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'  // 解决 WebSocket 连接问题
    },
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      args[0].__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false
      return args
    })
  }
})
