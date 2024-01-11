import {ref, toRaw, watch} from 'vue';
import {songToBePlayedLists} from '@/pinia/songToBePlayedLists'

export const audioList = () => {
    const music = ref(1); //音频名
    const audioRef = ref(null);
    const getMusicAllTime = ref(0); //音频总时长
    const duration = ref(0); //音频播放时时长
    const minute = ref(0); //显示器分钟
    const changSecond = ref(0); //显示器秒
    const thisPercentage = ref(0);
    const time = ref('0:00'); //音频初始显示时间
    const playbackStatus = ref(false); //音频播放状态
    const totalDurationMinute = ref(0); //当前音频总时长的分钟
    const totalDurationSecond = ref('00'); //当前音频总时长的秒数
    const outsideBottom = ref(98); //outside初始top距离
    let musicUrl = ref() //当前歌曲路径
    let musicName = ref() //当前歌曲名
    let musicImage = ref() //当前歌曲图片

    // 获取当前播放歌曲数据
    let thisListenMusic = ref([]);

    let getTheReadyToPlaySongData = () => {
        let {data} = songToBePlayedLists();
        thisListenMusic.value = data;
        getThisMusicLists();
        // console.log(thisListenMusic.value);
        // document.getElementById('play').play();
        // playbackStatus.value = true;
    };
    watch(music, () => {
        getThisMusicLists();
    });

    // 获取播放歌单具体数据
    let getThisMusicLists = () => {
        musicUrl.value = toRaw(thisListenMusic.value)[music.value - 1].musicUrl;
        musicName.value = toRaw(thisListenMusic.value)[music.value - 1].musicName;
        musicImage.value = toRaw(thisListenMusic.value)[music.value - 1].musicImage;
    }

    // 获取音频总时长以及总时长的分钟与秒数
    const getDuration = () => {
        getMusicAllTime.value = audioRef.value.duration;
        totalDurationMinute.value = parseInt(getMusicAllTime.value / 60);
        totalDurationSecond.value = parseInt(getMusicAllTime.value % 60);
        if (totalDurationSecond.value >= 10) {
            totalDurationSecond.value = parseInt(getMusicAllTime.value % 60);
        } else if (totalDurationSecond.value < 10) {
            totalDurationSecond.value = '0' + parseInt(getMusicAllTime.value % 60);
        }
    };

    // 获取音频播放时时长
    const getGoTime = () => {
        duration.value = audioRef.value.currentTime;
        minute.value = parseInt(duration.value / 60);
        changSecond.value = parseInt(duration.value % 60);

        if (changSecond.value >= 10) {
            time.value = minute.value + ':' + changSecond.value;
        } else {
            time.value = minute.value + ':' + '0' + changSecond.value;
        }
        // 下一首歌
        if (duration.value === getMusicAllTime.value) {
            music.value += 1;
            playbackStatus.value = false;

            setTimeout(() => {
                audioPlay()
            }, 500)
        }
    };

    // 计算percentages
    setInterval(() => {
        thisPercentage.value = (duration.value / getMusicAllTime.value) * 100;
    }, 1000);

    // 音频播放
    const audioPlay = () => {
        document.getElementById('play').play();
        playbackStatus.value = !playbackStatus.value;
        if (playbackStatus.value === true) {
            document.getElementById('play').play();
        } else {
            document.getElementById('play').pause();
        }
    };

    //拖动进度条改变播放进度
    const getChangedLocation = value => {
        audioRef.value.currentTime = value * getMusicAllTime.value / 100;
    };

    // 鼠标移入outside
    const enterOutside = () => {
        let {data} = songToBePlayedLists();
        thisListenMusic.value = data;
        if (thisListenMusic.value.length !== 0) getThisMusicLists();

        outsideBottom.value = 82;
        document.getElementById('displayArrowhead').style.transform = 'rotateX(180deg)';
    }

    // 鼠标移出outside
    const leaveOutside = () => {
        outsideBottom.value = 98;
        document.getElementById('displayArrowhead').style.transform = 'rotateX(0deg)';
    }

    //上一首
    const previous = () => {
        playbackStatus.value = false;
        if (music.value === 1) {
            music.value = 1;
        } else {
            music.value--;
        }
    };

    //下一首
    const next = () => {
        playbackStatus.value = false;
        if (music.value === toRaw(thisListenMusic.value).length) {
            music.value = toRaw(thisListenMusic.value).length;
        } else {
            music.value++;
        }
    };

    return {
        getMusicAllTime,
        minute,
        audioRef,
        duration,
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
        musicImage,
        getTheReadyToPlaySongData,
        getThisMusicLists
    }
}