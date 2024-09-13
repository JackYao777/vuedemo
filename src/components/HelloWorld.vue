<template>
  <div class="tree-box" style="text-align: center">
    <el-tree ref="permissionNode" :props="defaultProps" :data="data" node-key="label" check-strictly
      @check="handleCheck" @check-change="handleCheckChange" show-checkbox>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "TreeNodeC",
  data() {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    selectChildren(data) {
      data && data.children && data.children.map(item => {
        this.$refs.permissionNode.setChecked(item.id, true);
        if (data.children) {
          this.selectChildren(item)
        }
      });
    },
    handleCheck(data, { checkedKeys }) {
      // 节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
      //如果为取消
      if (checkedKeys.includes(data.id)) {
        //如果当前节点有子集
        this.selectChildren(data);
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      // 节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点
      //如果为取消
      if (checked === false) {
        //如果当前节点有子集
        if (data.children) {
          //循环子集将他们的选中取消
          data.children.map(item => {
            this.$refs.permissionNode.setChecked(item.id, false);
          });
        }
      } else {
        //否则(为选中状态)
        //判断父节点id是否为空
        if (data.parentId !== 0) {
          //如果不为空则将其选中
          this.$refs.permissionNode.setChecked(data.parentId, true);
        }
      }
    }
  }
}

</script>