<template>
    <div class="box">
        <section class="bg"></section>
        <div class="loading-text">0%</div>
    </div>
</template>
<script>
export default {
    data(){
    return{
        load:0,
        loadText:null,
        bg:null,
        currentInt:null
    }
    },
    methods: {
        scale(num, in_min, in_max, out_min, out_max) {
            return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
        },
        blurring() {
            this.load++
            console.log(this.load)
            if (this.load > 99) {
                clearInterval(this.currentInt)
            }

            this.loadText.innerText = `${this.load}%`
            this.loadText.style.opacity = this.scale(this.load, 0, 100, 1, 0)
            this.bg.style.filter = `blur(${this.scale(this.load, 0, 100, 30, 0)}px)`
        }
    },
    mounted() {
        this.loadText = document.querySelector('.loading-text');
        this.bg = document.querySelector('.bg')
        this.currentInt= setInterval(this.blurring, 15)
        // setInterval(function(){ alert("Hello"); }, 3000);
    }
}
</script>
<style lang="less" scoped>
.box {
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    // background: powderblue;
    overflow: hidden;

    .bg {
        background: url('http://47.115.128.32:9000/vueadmin//UserIconadminVue/捕获.PNG') no-repeat center center/cover;
        position: absolute;
        top: -30px;
        left: -30px;
        width:100%;
        height:100%;
        z-index: -1;
        filter: blur(0px);
    }

    .loading-text {
        font-size: 50px;
        color: #fff;
    }
}
</style>