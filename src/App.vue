<template>
  <componentNav></componentNav>
  <logo :style="{'opacity': logoEnd}"></logo>
  <Player/>
</template>

<script setup>
import componentNav from '../src/components/nav/nav.vue'
import logo from '../src/components/logo/logo.vue'
import Player from '../src/components/audio/audio.vue'

import { AppEnd } from "./AppJs/App"
const { logoEnd , changeStyle} = AppEnd();

changeStyle();
</script>

<style>
  @import "App.less";
</style>
