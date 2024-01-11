<template>
  <div class="thisOutside" v-if="thisToken">
    <div class="outsideTop">
      <img :src="imageUrl" alt="头像" class="avatar">
      <h1>{{ nickname }}</h1>
      <h3>{{ introduce }}</h3>
      <img src="https://i.postimg.cc/WpdZJjnx/image.png" alt="箭头向下" class="arrowhead" @click="goBottom">
    </div>
    <el-divider/>
    <div class="subject">
      <el-tabs tab-position="left" :v-model="outsideSplashPage">
        <el-tab-pane label="个人中心">
          <img :src="imageUrl" alt="头像">
          <h3>{{ nickname }}</h3>
          <el-divider class="levelDivider"/>
          <p>关注: 1</p>
        </el-tab-pane>

        <el-tab-pane label="编辑资料">
          <el-tabs tab-position="top" :v-model="insideFirstSplashPage" class="editProfile">
            <el-tab-pane label="基本设置">
              <div class="basicSettings">
                <label>昵称:
                  <input type="text" id="nickname" v-model="nickname">
                </label><br>
                <label style="position: relative; top: -130px;margin-right: 7px">简介:</label>
                <textarea type="text" placeholder="展示闪亮的自己..." maxlength="150" id="introduce" v-model="introduce"></textarea>
                <br>
                <div>
                  性别:
                  <label>
                    <input type="radio" v-model="gender" value="man">
                    男
                  </label>
                  <label>
                    <input type="radio" v-model="gender" value="woman">
                    女
                  </label>
                </div>
                <el-tooltip content="点击更换头像">
                  <label class="avatarUploader">
                    <img :src="imageUrl" alt="头像" style="width: 20vh; height: 20vh" v-if="imageUrl">
                    <el-icon size="60" style="top: 10vh" v-else>
                      <Plus/>
                    </el-icon>
                    <input type="file" @change="handleFileChange" style="display: none">
                  </label>
                </el-tooltip>
                <el-button type="primary" plain @click="changeInformation">点击保存</el-button>
              </div>
            </el-tab-pane>

            <el-tab-pane label="绑定设置">
              绑定设置
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>

        <el-tab-pane label="设置">
          <el-button type="primary" plain @click="signOut">退出账号</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

  <div class="login" id="loginInterface" v-else-if="!thisToken">
    <div class="loginBackground">
      <form name="login" id="login">
        <div class="border">
          <input type="text" id="account" required="required" v-model="account">
          <label>Account 账号</label>
        </div>
        <div class="border">
          <input type="password" id="password" required="required" v-model="password">
          <label>Password 密码</label>
        </div>
        <input type="button" class="button" value="登录" @click="login">
        <p class="enroll" @click="enrollAccount">注册账号</p>
      </form>

      <form name="enroll" id="enroll">
        <div class="border">
          <input type="password" id="enrollPassword" required="required" v-model="enrollPassword">
          <label>Password 密码</label>
        </div>
        <div class="border">
          <input type="password" id="againPassword" required="required" v-model="againPassword">
          <label>Again 再次输入</label>
        </div>
        <input type="button" class="button" value="注册" @click="enroll">
        <p class="enroll" @click="goBackLogin">返回登陆</p>
      </form>
    </div>
  </div>
  <el-backtop :right="50" :bottom="50"/>
</template>

<script setup>
import {alibabaCloud_OSS} from '@/AlibabaCloud/OSS';
import {personalCenter} from './personalCenter';
import {Plus} from "@element-plus/icons-vue";

const {handleFileChange} = alibabaCloud_OSS();
const {
  nickname,
  introduce,
  outsideSplashPage,
  insideFirstSplashPage,
  goBottom,
  gender,
  imageUrl,
  changeInformation,
  enrollAccount,
  goBackLogin,
  enroll,
  account,
  password,
  enrollPassword,
  againPassword,
  login,
  thisToken,
  signOut
} = personalCenter();
</script>

<style scoped>
@import "personalCenter.less";
</style>