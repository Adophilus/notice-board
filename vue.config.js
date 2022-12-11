const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    allowedHosts: [ "dev.uche.lan" ]
  },
  transpileDependencies: true
})
