<template>
  <audio id="play" :src="musicUrl" controls ref="audioRef" @canplay="getDuration"
         @timeupdate="getGoTime"/>

  <div class="outside" :style="{top : outsideBottom + 'vh'}" @mouseover="enterOutside"
       @mouseleave="leaveOutside">
    <div class="progress">
      <img :src="musicImage" alt="图片">
      <div class="playbackComponent">
        <el-button circle @click="previous" size="large">
          <el-icon style="vertical-align: middle" size="20">
            <DArrowLeft/>
          </el-icon>
        </el-button>

        <el-button circle @click="audioPlay" size="large">
          <el-icon style="vertical-align: middle" size="20">
            <div v-if="playbackStatus">
              <VideoPause/>
            </div>
            <div v-else>
              <VideoPlay/>
            </div>
          </el-icon>
        </el-button>

        <el-button circle @click="next" size="large">
          <el-icon style="vertical-align: middle" size="20">
            <DArrowRight/>
          </el-icon>
        </el-button>
      </div>
      <div class="songName">
        <h3>{{ musicName }}</h3>
      </div>
      <div class="anotherComponent">
        <el-button circle>
          <el-icon style="vertical-align: middle">
            <Star/>
          </el-icon>
        </el-button>
        <h2 id="playTime">{{ time }} / {{ totalDurationMinute }} : {{ totalDurationSecond }}</h2>
      </div>
      <el-slider v-model="thisPercentage" :show-tooltip="false" @change="getChangedLocation" class="progressBar"/>
    </div>
    <el-icon size="30" class="displayButton">
      <ArrowUpBold id="displayArrowhead" style="transition: 1s"/>
    </el-icon>
  </div>

</template>

<script setup>
import {audioList} from './audio.js';
import {DArrowLeft, DArrowRight, VideoPause, VideoPlay, Star, ArrowUpBold} from "@element-plus/icons-vue";

// audio.js
const {
  audioRef,
  getDuration,
  getGoTime,
  thisPercentage,
  audioPlay,
  time,
  playbackStatus,
  previous,
  next,
  totalDurationMinute,
  totalDurationSecond,
  getChangedLocation,
  outsideBottom,
  enterOutside,
  leaveOutside,
  musicUrl,
  musicName,
  musicImage
} = audioList();
</script>

<style scoped>
* {
  font-family: "幼圆", serif;
}

#play {
  display: none;
}

.outside {
  width: 100%;
  height: 150px;
  background-color: rgb(200, 200, 200, 0.6);
  position: fixed;
  left: 0;
  display: flex;
  justify-content: center;
  transition: 1s;
}

.displayButton {
  position: relative;
  top: -25px;
  float: right;
  background-color: rgb(200, 200, 200, 0.6);
  border-radius: 5px;
}

.progress {
  width: 60%;
  position: relative;
  top: 45px;
  left: 4%;
}

.progressBar {
  position: relative;
  bottom: 100px;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  position: relative;
  top: -30px;
  right: 120px;
}

.anotherComponent {
  position: relative;
  top: -5vh;
  right: 80px;
  float: right;
}

.songName {
  width: 450px;
  position: absolute;
  top: 80px;
  left: 170px;
  //border: 2px solid #000;
}

.songName h3 {
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  position: relative;
  top: -13vh;
}

#playTime {
  position: relative;
  top: -7vh;
  left: 50px;
}

.playbackComponent {
  position: relative;
  top: 0;
  right: 5vw;
}

</style>
