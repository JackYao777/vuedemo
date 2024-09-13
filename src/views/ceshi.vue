<template>
    <div>
        <div style="width:100%; margin:2px;" @mouseenter="mouseenter(id)" @mouseleave="mouseleave(id)">
            <div style="width:100%; height: 200px; position: relative;">
                <a>
                    <video width="100%" height="100%" style="object-fit: cover;" :id="id + 'video'"
                        v-if="showPreview && id == currentIdV" autoplay loop
                        src="https://stupid-dragon.oss-cn-beijing.aliyuncs.com/vue-video-danmaku/d.mp4"></video>
                    <img :id="id + 'img'" v-if="!showPreview" width="100%" height="100%"
                        src="http://47.115.128.32:9000/vueadmin//UserIconadminVue/捕获.PNG" data-loaded="true">
                </a>
                <a style="position: absolute;left:10px; bottom:20px">
                    <span  style="display: inline-block; width:70px;height:25px;line-height: 25px; text-align:center; background-color:rgba(240, 67, 67, 0.8); color:white; border-radius: 10px; font-size: 12px;">
                      感谢观看
                    </span>
                </a>
                <a style="position: absolute;right:10px; bottom:20px">
                    <span  style="display: inline-block; width:70px;height:25px;line-height: 25px; text-align:center; background-color:rgba(66, 48, 48, 0.8); color:white; border-radius: 10px; font-size: 12px;">
                      3:40:30
                    </span>
                </a>
            </div>
            <div style="width:300px;text-wrap: nowrap;overflow: hidden; text-overflow: ellipsis;">
                <a>
                    天下第一武林大会撒旦飞洒地方手动阀第三方撒旦发射点撒地方
                </a>
            </div>
        </div>
      
    </div>
</template>
<script>
export default {
    name: 'ceshi',
    props: { id: String },
    data() {
        return {
            showPreview: false,
            holdPreviews: "",
            currentIdV: '1',
            currentIdI: '1',
        };
    },
    methods: {
        mouseenter(id) {
            this.showPreview = true;
            let iddV = id + 'video';
            this.currentIdV = id;
            // let iddI=id+'img';
            // let currentDataV = document.getElementById(iddV);
            // let currentDataM = document.getElementById(iddI);
            // currentDataM.style.display="none";
            // currentDataV.style.display="block";
        },
        mouseleave(id) {
            let iddI = id + 'img';
            this.currentIdI = id;
            this.showPreview = false;
            // let iddV = id + 'video';
            // let iddI=id+'img';
            // let currentDataV = document.getElementById(iddV);
            // let currentDataM = document.getElementById(iddI);
            // currentDataM.style.display="block";
            // currentDataV.style.display="none";
        },
        setPreview(bol) {
            this.showPreview = false;
        },
        clickPreview() {
            // this.showPreview=false;
        }
    }

}
</script>
<style scoped>
.vdbox {
    background: pink;
}

/* style="width:100%; display:inline-block; overflow:hidden;white-space:nowrap;text-overflow:ellipsis" */
</style>