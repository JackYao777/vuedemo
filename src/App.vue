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
  components: { Iconindex, TreeNodeC, DataV, EchartsV,language },
}
</script>

<style>
/* html,
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
} */
</style>
