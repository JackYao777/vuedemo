<template>
    <div style="height: 100%; width: 100%;">
        <div>
            <input style="height: 30px; width:500px" type="text" v-model="video.video" placeholder="请输入mu38地址"></input>
            <button type="primary" @click="loadVideo(video)">确定</button>
            <p>{{video.video}}</p>
        </div>
        <div style="display: flex;justify-content: center; align-items: center; height: 100%">   <div id="dplayer" ref="player" class="dplayer" ></div></div>
     
    </div>
</template>

<script>
import Hls from 'hls.js'
import DPlayer from 'dplayer'

export default {
    data() {
        return {
            dp: null,
            video: {
                video:'',
                img:''
            }
        }
    },
    methods: {
        loadVideo(videoInfo) {
            console.log('sdf',videoInfo)
            this.dp = new DPlayer({
                element: this.$refs.player,
                video: {
                    //  pic: videoInfo.img, // 视频封面
                    url: videoInfo.video,
                    type: 'customHls',
                    customType: {
                        customHls: function (video, player) {
                            const hls = new Hls()
                            hls.loadSource(video.src)
                            hls.attachMedia(video)
                        }
                    }
                }
            })
        }
    },
    mounted() {
        // getVideo: ajax request for getting videoInfo
        /*   getVideo().then(res => {
            this.video = res.data.video
            this.laodVideo(this.video)
          }) */
        this.video = {
            //封面
            //img: "https://cn.bing.com/th?id=OHR.MeotoIwa_ZH-CN3126370410_1920x1080.jpg&rf=LaDigue_1920x1080.jpg",
            video: "https://play.xluuss.com/play/mbkEgWEe/index.m3u8",
        }
        this.loadVideo(this.video)
    }
}
</script>
<style lang="less" scoped>
.dplayer {
    width: 500px;
}
</style>