<!--icon-->
<template>
    <div class="icon">
      <el-card>
        <div style="margin-bottom: 10px">
          <el-button sizi="mini" @click="handleAdd()" type="primary" icon="el-icon-plus">新增</el-button>
        </div>
        <el-table :data="tableData" border>
          <el-table-column prop="icon" label="图标" align="center" width="70">
            <template slot-scope="scope">
              <div v-if="scope.row.icon">
                <i
                  v-if="scope.row.icon.startsWith('el-icon')"
                  :class="scope.row.icon"
                  style="font-size:20px"
                ></i>
                <svg-icon v-else :name="scope.row.icon" width="20px" height="20"></svg-icon>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="showEditDialog(scope.row)">
                <i class="el-icon-edit" /> 编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
                <i class="el-icon-delete" /> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <iconDialog :dialog="dialog" :formData="formData" @addIcon="addIcon" @editIcon="editIcon"></iconDialog>
    </div>
  </template>
   
  <script>
  import IconDialog from "./iconDialog.vue";
  import { addIcon, getIconList, editIcon, deleteIcon } from "@/api/icon/index";
  export default {
    name: "icon",
    components: { IconDialog },
    data() {
      return {
        dialog: {
          show: false,
          title: ""
        },
        formData: {},
        tableData: [
          {
            icon: ""
          }
        ]
      };
    },
    mounted() {
      this.getIconList();
    },
    computed: {},
    methods: {
      //获取icon列表
      async getIconList() {
        let { data } = await getIconList();
        this.tableData = data.data;
      },
   
      //打开新增icon窗口
      handleAdd() {
        this.dialog = {
          show: true,
          title: "新增icon",
          option: "add"
        };
        this.formData = {
          icon: ""
        };
      },
      //打开编辑icon窗口
      showEditDialog(row) {
        this.dialog = {
          show: true,
          title: "编辑图标",
          option: "edit"
        };
        this.formData = {
          _id: row._id,
          icon: row.icon
        };
      },
      //新增icon
      async addIcon() {
        await addIcon(this.formData);
        this.dialog.show = false;
        this.$notify({
          title: "成功",
          message: "新增icon成功！",
          type: "success"
        });
        this.getIconList();
      },
      //编辑icon
      async editIcon() {
        await editIcon(this.formData, this.formData._id);
        this.dialog.show = false;
        this.$notify({
          title: "成功",
          message: "编辑icon成功！",
          type: "success"
        });
        this.getIconList();
      },
      //删除icon
      handleDelete(row) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            await deleteIcon(row._id);
            this.getIconList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  };
  </script>