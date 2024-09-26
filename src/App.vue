<template>
  <div id="app">
    <!-- <svg-icon name="mc" width="50"></svg-icon>
    <svg-icon name="md" height="50"></svg-icon>
    <svg-icon name="mr" width="20" height="20" color="red"></svg-icon>
    <Iconindex></Iconindex> -->
    <!-- <TreeNodeC></TreeNodeC> -->
    <!-- <DataV></DataV> -->
    <!-- <EchartsV></EchartsV> -->
    <!-- <language></language> -->
    <router-view></router-view>
  </div>
</template>

<script>

import Iconindex from '@/views/icon/index.vue'
import TreeNodeC from '@/components/HelloWorld.vue'
import DataV from '@/components/DataV.vue'
import EchartsV from '@/components/EchartsV.vue'
import language from './views/language.vue'
export default {
  name: 'App',
  components: { Iconindex, TreeNodeC, DataV, EchartsV, language },
}
</script>
<!-- http://47.115.128.32:9000/vueadmin//UserIconpic/%E7%BA%A2%E8%8E%B2.jpg -->
<!-- http://47.115.128.32:9000/vueadmin//UserIconpic/bgimg.jpg -->
<!-- http://47.115.128.32:9000/vueadmin//UserIconadminVue/Another03.jpg -->

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

#app {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  color: rgb(rgb(66, 48, 48), green, blue)
}
</style>
