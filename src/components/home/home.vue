<template>
  <div :style="{'opacity': qwe , 'transition': ewq}" class="qqq">
    <swiper></swiper>
    <recommendations interpretation="倾情推荐"  ComponentName="推荐歌曲"></recommendations><br>
    <recommendations interpretation="倾情推荐"  ComponentName="推荐视频"></recommendations>
  </div>

</template>

<script setup>
  import swiper from "@/components/swiper/swiper.vue";
  import recommendations from "@/components/recommendations/recommendations.vue"
  import {ref} from "vue";

  const qwe = ref();
  const ewq = ref();

  setInterval(() => {
    qwe.value = 1;
  },2000)
  setInterval(() => {
    ewq.value = '0s';
  },2500)
</script>

<style scoped>
.qqq{
  position: relative;
  transition: 1s;
  opacity: 0;
  top: 10vh;
  right: 25vw;
}
</style>