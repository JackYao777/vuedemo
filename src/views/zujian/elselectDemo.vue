<template>
  <el-select v-model="selectedValues" multiple placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  data() {
    return {
      selectedValues: [],
      options: [
        { value: "option1", label: "选项1" },
        { value: "option2", label: "选项2" },
        { value: "option3", label: "选项3" },
        { value: "option4", label: "选项4" },
        { value: "option5", label: "选项5" },
        { value: "option6", label: "选项6" },
        // ...更多选项
      ],
    };
  },
};
</script>

<style scoped>
/deep/ .el-select__tags {
  flex-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
  /* text-overflow: ellipsis; 显示省略号 */
}
/deep/ .el-tag.el-tag--info{
    overflow: ellipsis; 
    text-overflow: ellipsis; 
}
</style>
