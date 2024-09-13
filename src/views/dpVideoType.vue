<template>
    <div class="main">
      <d-player ref="player" id="player" :options="options"></d-player>
    </div>
  </template>
  
  <script>
  export default {
    name: "main",
    data() {
      return {
        options: {
          container: document.getElementById("dplayer"), //播放器容器
          mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
          theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
          loop: false, // 是否自动循环
          lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
          screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
          hotkey: true, // 是否支持热键，调节音量，播放，暂停等
          preload: "auto", // 自动预加载
          volume: 0.7, // 初始化音量
          playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
          logo:
            "https://qczh-1252727916.cos.ap-nanjing.myqcloud.com/pic/273658f508d04d488414fd2b84c9f923.png", // 在视频左上角上打一个logo
          video: {
            url:
              "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4", // 播放视频的路径
            quality: [
              // 设置多个质量的视频
              {
                name: "高清",
                url:
                  "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                type: "auto" // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
              },
              {
                name: "标清",
                url:
                  "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
                type: "auto"
              }
            ],
            defaultQuality: 0, // 默认是高清
            pic:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg", // 视频封面图片
            thumbnails:
              "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=24336452,906724543&fm=26&gp=0.jpg" // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
          },
          // subtitle: {
          //   //字幕
          //   url: "", //字幕网址
          //   color: "#fff", //字幕颜色
          //   fontSize: "20px",
          //   bottom: "40px"
          // },
          danmaku: {
            // 弹幕
            id: "9E2E3368B56CDBB4",
            api: "https://api.prprpr.me/dplayer/",
            token: "tokendemo", //后端验证令牌
            maximum: 1000, //弹幕最大数量
            addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142"], //其他弹幕
            user: "DIYgod", //弹幕用户名
            bottom: "15%", //值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
            unlimited: true //即使弹幕重叠也显示所有弹幕
          },
          contextmenu: [
            //  自定义上下文菜单
            // 右键菜单
            {
              text: "b站",
              link: "https://www.bilibili.com"
            },
            {
              text: "选项二",
              click: player => {
                console.log(player);
              }
            }
          ],
          highlight: [
            //进度条上的自定义时间标记
            // 进度条时间点高亮
            {
              text: "10M",
              time: 6
            },
            {
              text: "20M",
              time: 12
            }
          ]
        }
      };
    },
    mounted() {
        // 以下为隐藏一些作者的信息和视频播放源 如不需要可删除
      // document.querySelector(".dplayer-menu").remove(); //隐藏右键菜单
      document.querySelector(".dplayer-mask").remove();
      document.querySelector(".dplayer-info-panel-item-url").remove(); //隐藏播放源
      let length = document.querySelectorAll(".dplayer-menu-item").length;
      document.querySelectorAll(".dplayer-menu-item")[length - 2].remove(); // 去掉作者信息
      document.querySelectorAll(".dplayer-menu-item")[length - 1].remove(); // 去掉作者信息
    }
  };
  </script>
  
  <style lang="less" scoped>
  .main {
    width: 1000px;
    height: 900px;
    margin: 0 auto;
    text-align: center;
  }
  /deep/.dplayer-danmaku-item {
    span {
      border: none !important; //去掉弹幕边框
    }
  }
  </style>
  
  