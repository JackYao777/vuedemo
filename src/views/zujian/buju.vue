<template>
    <div class="box">
        <div class="container">
            <div class="leftContent">
                <div class="leftContentDetail">
                    <label>单据类型</label><el-input type="text" aria-placeholder="请输入数据"
                        style="margin-right: 20px"></el-input>
                    <label>单据类型</label><el-input type="text" aria-placeholder="请输入数据"></el-input>
                    <!-- left -->
                </div>
                <!-- <label>单据类型</label><el-input type="text" aria-placeholder="请输入数据"></el-input> -->

            </div>
            <div class="rightContent">
                <div class="rightContentDetail"><el-input type="text" aria-placeholder="请输入数据"></el-input>
                    <el-buttom>查询</el-buttom> <el-buttom>查询</el-buttom>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
.box {
    height: 100%;
    width: 100%;
    border: 1px solid red;

    .container {
        display: flex;
        height: 100%;
        border: 1px solid rgb(69, 63, 124);
        justify-content:space-between;
        margin: 0 50px;

        .leftContent {
            max-height: 64px;
            width: 100%;
            border: 1px solid pink;
            padding: 0 20px;

            .leftContentDetail {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 100%;

                label {
                    min-width: 90px;
                }
            }
        }

        .rightContent {
            max-height: 64px;
            width: 100%;
            border: 1px solid pink;
            padding: 0 50px;
            .rightContentDetail {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                width: 100%;
                height: 100%;

                label {
                    min-width: 90px;
                }
            }
        }

    }
}
</style>