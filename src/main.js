import Vue from 'vue'
import VCharts from 'v-charts'
import App from './App.vue'
// import '@/Plugins/echartV.js'

import SvgIcon from 'vue-svgicon'
import "@/icons/index.js"
import '@/utils/icons.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/Plugins/datav.js'
import 'reset-css'
import {i18n} from './i18n/index.js'; 
import VueRouter from 'vue-router'
import router from './router/index'
import VueDPlayer from 'vue-dplayer';
import "vue-dplayer/dist/vue-dplayer.css";
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(SvgIcon, {
  tagName: 'svg-icon'
});

// 全局注册Vue DPlayer组件
Vue.use(VueDPlayer);

Vue.use(VCharts)
Vue.config.productionTip = false;
//使用 echarts 4.7版本 + v-charts ，bmap做底图，地图看似正常显示，控制台报错
Vue._watchers = Vue.prototype._watchers = []
new Vue({
  el: '#app',
  router:router,
  i18n,
  render: h => h(App),
});
// .$mount('#app')
