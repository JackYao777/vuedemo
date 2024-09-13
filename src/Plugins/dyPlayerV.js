import Vue from 'vue'
import VueDPlayer from 'vue-dplayer'
import DPlayer from 'dplayer'
import 'dplayer/dist/DPlayer.min.css'
import SpeedPlugin from 'dplayer-speed-plugin'

// Use DPlayer plugin
DPlayer.install(SpeedPlugin)

Vue.use(VueDPlayer, {
  options: {
    video: {
      url: 'http://cdn.localhost:8080/test.mp4',
      pic: 'http://cdn.localhost:8080/test.jpg'
    },
    plugins: [
      SpeedPlugin
    ]
  }
})
