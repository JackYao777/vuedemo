<template>
    <div class="box">
        <div class="container">
            <div class="panel" :class="{ active: this.active == 1 }" style="" @click="halderCss($event, 1)">
                <h3>Explore The World</h3>
            </div>
            <div id="2" class="panel" :class="{ active: this.active == 2 }" style="" @click="halderCss($event, 2)">
                <h3>Explore The World</h3>
            </div>
            <div id="13" class="panel" :class="{ active: this.active == 3 }" style="" @click="halderCss($event, 3)">
                <h3>Explore The World</h3>
            </div>
            <div id="4" class="panel" :class="{ active: this.active == 4 }" style="" @click="halderCss($event, 4)">
                <h3>Explore The World</h3>
            </div>
            <div id="5" class="panel" :class="{ active: this.active == 5 }" style="" @click="halderCss($event, 5)">
                <h3>Explore The World</h3>
            </div>
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            active: 1
        }
    },
    methods: {
        halderCss(evnet, num) {

            //#region 动态修改flex
            // const dataNodes = document.getElementsByClassName('panel');
            // console.log(dataNodes)
            // let mm;
            // mm = [...dataNodes];
            // mm.forEach(element => {
            //     element.style.flex = 0.5;
            // });
            // console.log(num, evnet.currentTarget.style);
            // evnet.currentTarget.style.flex = 5;
            //#endregion

            this.active = num;
        }
    }
}
</script>
<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    border: 1px solid royalblue;

    .container {
        margin: 0 auto;
        width: 1700px;
        height: 100%;
        border: 1px solid pink;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .panel {
        position: relative;
        flex: 0.5;
        height: 800px;
        border: 2px solid red;
        border-radius: 20px;
        width: 90px;
        margin-left: 20px;
        background-image: url("http://47.115.128.32:9000/vueadmin//UserIconadminVue/捕获.PNG");
        background-repeat: no-repeat;
        background-size: cover;
        cursor: pointer;
        transition: all 700ms ease-in;

        &.active {
            flex: 5;

            h3 {
                opacity: 1;
                transition: opacity 0.3s ease-in 0.4s;
            }
        }

        h3 {
            position: absolute;
            left: 20px;
            bottom: 10px;
            color: white;
            opacity: 0;
        }
    }


}
</style>