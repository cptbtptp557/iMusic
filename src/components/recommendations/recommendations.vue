<template>
  <div id="outside">
    <div class="outside">
      <div id="outsideNav">
        <img src="../../../public/推荐码.png" alt="推荐">
        <p>{{ ComponentName }}|</p>
        <p style="opacity: 0.8" class="interpretation">{{ interpretation }}</p>
      </div><br><br>
      <div id="recommend">
        <div v-for="image in list.slice(0,4)" :key="image.id" id="recommendImage">
          <img :src="image.imageUrl" alt="推荐歌图" >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineProps  } from 'vue';
import { mySqlList } from "@/axios/getMySqlList"

export default {
  props: {
    interpretation: {
      type: String,
      required: true
    },
    ComponentName: {
      type: String,
      required: true
    }
  },
  setup() {
    // 使用defineProps函数定义属性
    defineProps(['interpretation', 'ComponentName']);

    const { list } = mySqlList();
    return {
      list
    }

  }
};
</script>

<style scoped>
  @import "recommendations.less";
</style>