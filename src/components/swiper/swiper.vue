<template>
  <el-carousel indicator-position="outside" height="50vh">
    <el-carousel-item v-for="image in list" :key="image.id">
      <img :src="image.imageUrl" alt="推荐歌图" >
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import { mySqlList } from "@/axios/getMySqlList"

const { list } = mySqlList();
</script>

<style scoped>
.el-carousel{
  position: relative;
  left: 25vw;
  border-radius: 1vh;
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
img{
  width: 100%;
  height: 100%;
}
</style>
