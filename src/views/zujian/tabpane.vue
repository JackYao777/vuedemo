<template>
  <div style="height: 100%;width: 100%;">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first" style="height: calc(100vh - 64px);">
        <bujuOne></bujuOne>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import bujuOne from "@/views/zujian/bujuOne.vue";
export default {
  components: { bujuOne },
  data() {
    return {
      activeName: "second",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      // 使用Vue.nextTick确保DOM已经更新
      this.$nextTick(() => {
        // 刷新sticky定位
        const stickyElements = document.querySelectorAll(".block");
        stickyElements.forEach((el) => {
          // 假设您使用了CSS类名 'sticky-element'
          const style = getComputedStyle(el);
          if (style.position === "sticky") {
            console.log('123')
            el.style.position = "absolute";
            setTimeout(() => {
              el.style.position = "sticky";
            });
          }
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
/* 修改标签页头部的padding */
 /deep/ .el-tabs__header {
  padding:16px 16px 0 16px; /* 根据需求调整padding值 */
}
 /deep/ .el-tabs__item{
    width: 112px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    padding: 0;
    color: gray;
}
/* 设置选中标签的颜色 */
 /deep/.el-tabs__item.is-active {
  color: #ff0000; /* 你想要的颜色 */
  border-color: #ff0000; /* 如果需要改变边框颜色 */
}
</style>
