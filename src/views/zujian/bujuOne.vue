<template>
  <div class="box">
    <div class="searchContainer">
      <div class="leftContent">
        <div class="leftContentDetail">
          <label>单据类型</label
          ><el-select
            multiple
            popper-class="custom-select-popper"
            v-model="value"
            placeholder="请选择"
            style="max-width: 240px; margin-right: 44px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <label>创建时间</label>
          <!-- <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="max-width: 300px; min-width: 50px"
            @change="search"
          > -->
          <el-date-picker
            v-model="value1"
            value-format="yyyy-MM-dd 00:00:00"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="search"
             style="max-width: 240px; margin-right: 44px"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="rightContent">
        <!-- <el-input
          type="text"
          placeholder="请输入姓名或者工号"
          style="max-width: 600px"
          class="setInputcss"
        ></el-input> -->

        <el-input
          placeholder="请输入内容"
          v-model="input3"
          style="max-width: 600px"
        >
          <el-select style="width: 130px;" v-model="sfKeyChoose" slot="prepend" placeholder="请选择">
            <!-- <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option> -->
            <el-option
              v-for="item in keywordOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-input>
        <!-- <el-button type="primary" style="margin-left: 12px" class="btnClass">查询</el-button> -->
        <button style="margin-left: 12px" class="btnClass" @click="search">
          查询
        </button>
        <button class="btnClassCZ">重置</button>
        <!-- <el-button>重置</el-button> -->
      </div>
    </div>
    <div class="contaner">
      <el-table
        @sort-change="sortChange"
        :data="tableData"
        :cell-style="{ height: '100px' }"
        class="custom-table-class"
        border
        :width="'100%'"
        :header-cell-style="{ background: '#E5E6EB', height: '40px' }"
      >
        <el-table-column prop="date" label="序号" min-width="4%" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          min-width="37%"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="address" label="单据类型" min-width="9%">
        </el-table-column>
        <el-table-column prop="address" label="发起人" min-width="9%">
        </el-table-column>
        <el-table-column prop="address" label="状态" min-width="9%">
        </el-table-column>
        <el-table-column prop="address" label="当前节点" min-width="9%">
        </el-table-column>
        <el-table-column prop="address" label="上一步处理人" min-width="9%">
        </el-table-column>
        <el-table-column
          prop="date"
          label="创建时间"
          min-width="14%"
          sortable="custom"
        >
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>

      <!-- <el-pagination
        small
        :current-page.sync="page"
        :page-size="20"
        layout="prev,pager, next"
        :total="showdefaulttotal || taskTotal || taskTableData.length"
        @current-change="change"
      >
      </el-pagination> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "bujuOne",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: [],
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      input3: "",
      sfKeyChoose: "1",
      keywordOption: [
        {
          label: "工号/姓名",
          value: "1",
        },
        {
          label: "项目名称",
          value: "2",
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    search() {
      console.log("查询开始");
    },
    sortChange({ column, prop, order }) {
      console.log(
        `排序列: ${column.label}，排序方向: ${order}`,
        `prop:${prop}`
      );
      //  this.queryParams.isAsc = column.order === "ascending" ? 'asc' : 'desc'
      // 在这里可以实现具体的排序逻辑，例如对tableData数组进行排序
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  width: 100%;
  overflow: hidden;
  .searchContainer {
    height: 64px;
    display: flex;
    flex: 1;
    justify-content: space-between;

    .leftContent {
      border: 1px solid pink;
      flex: 0.9;
      .leftContentDetail {
        display: flex;
        height: 100%;
        max-width: 80%;
        align-items: center;
        padding: 0 16px;
        gap: 8px;
        label {
          min-width: 56px;
          font-size: 14px;
          font-weight: normal;
          line-height: 24px;
          text-align: right;
          letter-spacing: 0px;
          color: #3d3d3d;
        }

        /deep/ .custom-select-popper {
          .el-select__tags {
            height: 40px;
            white-space: nowrap;
            overflow: hidden;
            flex-wrap: nowrap;
          }
        }
      }
    }

    
    .rightContent {
      align-items: center;
      border: 1px solid pink;
      flex: 1.1;
      display: flex;
      justify-content: flex-end;
      padding: 0 16px;
      gap: 4px;
    }
  }
  .el-button + .el-button,
  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin-left: 0px;
  }
  .contaner {
    height: 814px; /* 确保父容器有高度 */
    overflow-y: scroll;
    width: 100%;
  }
  .btnClass {
    width: 72px;
    height: 32px;
    //   font-family: 苹方-简;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    border-radius: 2px;
    /* 苍穹blue/主色 */
    background: #1c6eff;
    border: transparent;
    cursor: pointer;
  }
  .btnClassCZ {
    width: 72px;
    height: 32px;
    //   font-family: 苹方-简;
    font-size: 14px;
    font-weight: normal;
    line-height: 22px;
    text-align: center;
    letter-spacing: 0px;
    border-radius: 2px;
    opacity: 1;
    background: #ffffff;
    border: 1px solid #d3d7de;
    cursor: pointer;
  }
  .block {
    // border: 1px solid red;
    height: 48px;
    position: sticky;
    bottom: 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 20px;
    background: #fff;
    z-index: 999;
    opacity: 1;
    background: #ffffff;
    box-shadow: inset 0px 1px 0px 0px #d9dde4;
  }

  .el-table .cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    //  height: 48px; /* 设置你需要的固定高度 */
    // line-height: 20px; /* 行高需要根据固定高度来调整 */
  }

  .el-table .cell:hover {
    overflow: visible;
    white-space: normal;
    height: auto;
  }
  /deep/ .setInputcss .el-input__inner {
    height: 32px;
  }
  /deep/ .el-select {
    z-index: 999;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  /* 增加下拉菜单的高度 */
}
</style>
