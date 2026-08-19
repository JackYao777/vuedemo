const { defineConfig } = require('@vue/cli-service')

// 体彩网足球赛果接口（webapi.sporttery.cn）会校验 Referer 且不开放 CORS，
// 仅在 dev server 下通过反向代理转发并注入 Referer。生产构建需自行接入后端代理。
const SPORTTERY_PROXY = {
  target: 'https://webapi.sporttery.cn',
  changeOrigin: true,
  pathRewrite: { '^/sporttery-api': '' },
  headers: {
    Referer: 'https://www.lottery.gov.cn/jc/zqsgkj/',
    Accept: 'application/json, text/plain, */*'
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/sporttery-api': SPORTTERY_PROXY
    }
  }
})
