<template>
    <div class="box">
        <div class="box-btn">
            <button>测试</button>
            <button>关闭</button>
            <span class="ceshi"></span>
        </div>
        <span>

        </span>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    border: 1px solid red;
    text-align: center;

    // position: relative;
    // display: flex;
    // justify-content: center;
    .box-btn {
        // text-align: center;
        height: 200px;
        width: 200px;
        // inset: 0;
        // margin: auto;
        border: 1px solid rebeccapurple;
        display: inline-block;
        vertical-align: middle;

        // position: absolute;
        // left: 50%;
        // top:50%;
        //  transform: translate(-50%,-50%);
        button{
            display: inline-block;
            border: 1px solid black;
            vertical-align: middle;
        }
        .ceshi {
            display: inline-block;
            border: 1px solid black;
            height: 100%;
            vertical-align: middle;
            width: 0;
        }
    }

    span {
        display: inline-block;
        border: 1px solid black;
        height: 100%;
        // width: 50%;
        vertical-align: middle;
    }
}
</style>