<!--iconDialog   -->
<template>
    <div class="iconDialog">
      <el-dialog :title="dialog.title" width="45%" :visible.sync="dialog.show">
        <el-form ref="ref_form_icon" :model="formData" label-width="100px">
          <el-form-item label="图标" prop="icon">
            <IconPicker v-model="formData.icon" :icon="formData.icon" @iconName="getIconName"></IconPicker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.show = false">取 消</el-button>
          <el-button
            v-if="dialog.option == 'add'"
            @click="addIcon('ref_form_icon')"
            type="primary"
          >确 定</el-button>
          <el-button
            v-if="dialog.option == 'edit'"
            @click="editIcon('ref_form_icon')"
            type="primary"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
   
  <script>
  import IconPicker from "@/components/IconPicker";
   
  export default {
    name: "iconDialog",
    components: { IconPicker },
    props: ["dialog", "formData"],
    methods: {
      getIconName(value) {
        this.formData.icon = value;
      },
      addIcon() {
        this.$emit("addIcon");
      },
      editIcon() {
        this.$emit("editIcon");
      }
    }
  };
  </script>