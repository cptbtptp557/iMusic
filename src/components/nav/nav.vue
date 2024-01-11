<template>
  <div id="ikun">
    <div id="nav">
      <nav>
        <div id="thisLogo">
          <img src="../../image/logo.png" alt="navLogo" id="navLogo">
          <p id="navName">iMusic</p>
        </div>
        <div id="navRight">

          <label for="home" :style="{ backgroundColor: current === home ? 'rgba(0,0,0,0.2)' : '' }">
            首页
            <input type="radio" id="home" :value="home" v-model="current">
          </label>
          <label for="myMusic" :style="{ backgroundColor: current === myMusic ? 'rgba(0,0,0,0.2)' : '' }">
            我的音乐
            <input type="radio" id="myMusic" :value="myMusic" v-model="current" @click="jump">
          </label>
          <label for="concern" :style="{ backgroundColor: current === concern ? 'rgba(0,0,0,0.2)' : '' }">
            关注
            <input type="radio" id="concern" :value="concern" v-model="current" @click="jump">
          </label>
          <label for="mv" :style="{ backgroundColor: current === mv ? 'rgba(0,0,0,0.2)' : '' }">
            MV
            <input type="radio" id="mv" :value="mv" v-model="current">
          </label>
          <label for="personalCenter" :style="{ backgroundColor: current === personalCenter ? 'rgba(0,0,0,0.2)' : '' }">
            个人中心
            <input type="radio" id="personalCenter" :value="personalCenter" v-model="current">
          </label>

          <input type="text" placeholder=" 搜索" id="find" :style="{width: divWidth}">
        </div>
      </nav>
    </div>
  </div>

  <KeepAlive class="insideRight">
    <component :is="current" class="right"></component>
  </KeepAlive>
</template>

<script setup>
import home from "@/components/home/home.vue";
import myMusic from "@/components/myMusic/myMusic.vue";
import concern from "@/components/concern/concern.vue";
import mv from "@/components/mv/mv.vue";
import personalCenter from "@/components/personalCenter/personalCenter.vue"

import {shallowRef} from "vue";

const current = shallowRef(home);

const jump = () => {
  const getCookieToken = document.cookie.split(";")[0].split("=")[1];
  if (!getCookieToken) {
    current.value = personalCenter;
  }
}
</script>

<style scoped>
@import "nav.less";
</style>