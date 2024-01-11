<template>
  <div>
    <img src="../../image/logo.png" alt="logo" id="logo" :style="{'scale':scaleLast,'top':topLast,'transition':one}"/>
    <p id="name" :style="{'opacity':opacityLast,'transition':two}">坤坤爱音乐</p>
  </div>
</template>

<script setup>
  import { useAnimationLogic } from './logo.js';

  const { scaleLast, topLast, one, opacityLast, two } = useAnimationLogic();
</script>

<style scoped>
  @import "logo.less";
</style>