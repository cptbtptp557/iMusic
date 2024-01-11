<template>
  <el-tabs tab-position="left" style="height: 80vh" class="demo-tabs" v-model="initial" @tab-click="getName">
    <el-tab-pane v-for="(item, index) in DeduplicationLists" :key="index" :label="item" :name="item">
      {{ item }}

      <el-row :gutter="16">
        <el-col :span="1" style="position: relative;left: 30px">
          <el-button @click="toggleAllSelection">播放</el-button>
        </el-col>
        <el-col :span="2">
          <el-popover>
            <p>请选择目标歌单:</p>
            <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
              <el-button v-for="(item, index) in DeduplicationLists" :key="index" :label="item" :name="item"
                         style="width: 100%; margin-bottom: 2px">
                {{ item }}
              </el-button>
            </div>
            <template #reference>
              <el-button :icon="FolderAdd">添加到</el-button>
            </template>
          </el-popover>
        </el-col>
        <el-col :span="2">
          <el-button :icon="Download">下载</el-button>
        </el-col>
        <el-divider/>  <!-- 分割线 -->
        <el-table :data="thisListsData" max-height="400" border ref="elTable" style="width: 100%"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="musicName" label="歌曲" width="350" sortable/>
          <el-table-column prop="author" label="歌手" width="300"/>
          <el-table-column prop="album" label="专辑"/>
        </el-table>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import {ref, provide, toRaw, watch} from "vue";
import {getPlayListsData} from '@/axios/piniaGetLists/getThisPlayMusicLists';
import {ElButton, ElCol, ElRow} from "element-plus";
import {Download, FolderAdd} from "@element-plus/icons";
import {songToBePlayedLists} from '@/pinia/songToBePlayedLists'
import {audioList} from '../audio/audio'

export default {
  computed: {
    Download() {
      return Download
    },
    FolderAdd() {
      return FolderAdd
    }
  },
  components: {
    ElButton,
    ElCol,
    ElRow,
  },
  setup() {
    let initial = '超爱';
    const name = ref('超爱');
    const elTable = ref(null);
    const getMusicLists = ref([]);
    const pushedMusicLists = ref([]);
    let DeduplicationLists = ref([]);
    let thisListsData = ref();
    const selectedSongs = ref();
    const {inData} = songToBePlayedLists();
    const {getTheReadyToPlaySongData} = audioList();

    const handleSelectionChange = selectedItems => {
      selectedSongs.value = selectedItems;
    };

    const toggleAllSelection = () => {
      inData(selectedSongs.value);
      getTheReadyToPlaySongData();
    }

    const getName = tab => {
      name.value = tab.props.name;
    };
    provide('name', name);

    (async () => {
      const getCookieToken = document.cookie.split(";")[0].split("=")[1];
      await getPlayListsData().getPlayListsData('超爱' , getCookieToken);
    })()
        .then(() => {
          thisListsData.value = getPlayListsData().playData;
          // console.log(getPlayListsData().playData);
        });

    watch(name, (newName) => {
      (async () => {
        const getCookieToken = document.cookie.split(";")[0].split("=")[1];
        await getPlayListsData().getPlayListsData(newName, getCookieToken);
      })()
          .then(() => {
            thisListsData.value = getPlayListsData().playData;
          })
    });

    (async () => {
      const getCookieToken = document.cookie.split(";")[0].split("=")[1];
      await getPlayListsData().getMusicLists(getCookieToken);
    })()
        .then(() => {
          getMusicLists.value = toRaw(getPlayListsData().musicData);
          for (let i = 0; i < getMusicLists.value.length; i++) {
            pushedMusicLists.value.push(getMusicLists.value[i].playLists)
          }
          DeduplicationLists.value = new Set(pushedMusicLists.value);
        })



    return {
      getName,
      initial,
      DeduplicationLists,
      thisListsData,
      handleSelectionChange,
      elTable,
      selectedSongs,
      toggleAllSelection,
      getTheReadyToPlaySongData
    };
  },
}


</script>

<style scoped>
@import 'myMusic.less';

.el-col {
  position: relative;
  left: 2.5vw;
  margin-right: 4vh;
}

.el-button {
  color: #e6e6e6;
  background-color: transparent;
  font-weight: bold;
  font-family: "幼圆", serif;

  &:hover {
    background-color: #e6e6e6;
    color: #475669;
  }
}
</style>
