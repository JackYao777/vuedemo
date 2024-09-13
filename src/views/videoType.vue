<template>
    <div class="video-container">
      <div
        class="video-wrapper"
        ref="videoWrapper"
        @mouseenter="handleMouseEnter"
        @mouseout="handleEnded"
      >
        <video
          class="video"
          id="videoComp"
          :src="videoUrl"
          ref="video"
          autoplay
          muted
          v-if="showVideo && videoOrGif === 'video'"
          loop
        ></video>
   
        <img
          class="poster"
          ref="gif"
          :src="gifUrl"
          v-if="showVideo && videoOrGif === 'gif'"
        />
   
        <img class="poster" ref="image" :src="imgUrl" v-if="!showVideo" />
      </div>
    </div>
  </template>
   
  <script>
  export default {
    props: {
      videoUrl: {
        default:"https://stupid-dragon.oss-cn-beijing.aliyuncs.com/vue-video-danmaku/d.mp4",
      },
      imgUrl: {
        default:"http://47.115.128.32:9000/vueadmin//UserIconadminVue/捕获.PNG",
      },
      gifUrl: {
        default: "",
      },
      videoOrGif: {
        default: "video",
      },
    },
    data() {
      return {
        showVideo: false,
      };
    },
    methods: {
      handleMouseEnter() {
        this.showVideo = true;
      },
      handleEnded() {
        this.showVideo = false;
      },
    },
  };
  </script>
   
  <style scoped>
  .video-container {
    width: 500px;
    height: 500px;
    margin: auto;
  }
   
  .video-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }
   
  .video {
    width: 100%;
  }
   
  .poster {
    width: 100%;
    cursor: pointer;
  }
  </style>