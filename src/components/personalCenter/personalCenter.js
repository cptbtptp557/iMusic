import {ref} from "vue";
import {getPlayListsData} from '@/axios/piniaGetLists/getThisPlayMusicLists';
import {ElMessage, ElNotification} from "element-plus";
import {alibabaCloud_OSS} from '@/AlibabaCloud/OSS';

export const personalCenter = () => {
    const outsideSplashPage = ref('编辑资料'); //外层标签页初始页面
    const insideFirstSplashPage = ref('基本设置'); //内层标签页初始页面
    const imageUrl = ref('https://cptbtptp2557.oss-cn-shenzhen.aliyuncs.com/InitialAvatar'); //头像图片地址
    //const imageUrl = ref('');
    const nickname = ref('i用户'); //昵称
    const gender = ref('man') //性别
    const introduce = ref('展现最好的自己'); //简介
    const account = ref(''); //账号
    const password = ref(''); //密码
    const enrollPassword = ref(''); //注册账号时的密码
    const againPassword = ref(''); //再次输入密码
    const thisToken = ref(''); //生成的token

    // 点击箭头前往页面底部
    const goBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    const changeInformation = async () => {
        nickname.value = document.getElementById('nickname').value;
        if (nickname.value === '') nickname.value = 'i用户';
        introduce.value = document.getElementById('introduce').value;
        if (introduce.value === '') introduce.value = '展现最好的自己';
        await getPlayListsData().postInformation(nickname.value, introduce.value, gender.value, 'changeInformation');
    };

    // 显示注册页面
    const enrollAccount = () => {
        document.getElementById('login').style.display = 'none';
        document.getElementById('enroll').style.display = 'block';
    };

    // 显示登陆界面
    const goBackLogin = () => {
        document.getElementById('login').style.display = 'block';
        document.getElementById('enroll').style.display = 'none';
    };

    // 判断密码是否一致
    const enroll = async () => {
        if (enrollPassword.value !== againPassword.value) {
            ElMessage({
                duration: 2000,
                message: '输入不一致！！！',
                type: 'error',
                offset: 100,
            })
        } else if (enrollPassword.value === againPassword.value) {
            await getPlayListsData().requestEnroll(enrollPassword.value)
                .then(() => {
                    // console.log(getPlayListsData().userAccount);
                    ElNotification({
                        dangerouslyUseHTMLString: true,
                        message: '<h4>账号:' + getPlayListsData().userAccount + '</h4><h4>密码:' + enrollPassword.value + '</h4>',
                        offset: 100,
                    });
                    getPlayListsData().getImageFile()
                        .then(() => {
                            alibabaCloud_OSS().InitialAvatar(getPlayListsData().defaultImageInformation, getPlayListsData().userAccount);
                        })
                })
        }
    };

    // 登录
    const login = async () => {
        await getPlayListsData().verifyLogin(account.value, password.value)
            .then(() => {
                thisToken.value = getPlayListsData().tokenData;
                if (thisToken.value) {
                    nickname.value = getPlayListsData().userData.nickname;
                    gender.value = getPlayListsData().userData.gender;
                    introduce.value = getPlayListsData().userData.introduce;
                    ElNotification({
                        title: '登陆成功',
                        message: '欢迎' + nickname.value + '',
                        type: 'success',
                        offset: 100,
                    })
                    // 将token存入cookie,并设置有效时间为一天
                    document.cookie = "token = " + thisToken.value + "; expires = +1";
                    imageUrl.value = 'https://cptbtptp2557.oss-cn-shenzhen.aliyuncs.com/' + account.value;
                } else {
                    ElNotification({
                        title: '登陆失败',
                        message: '账号或密码错误!!!',
                        type: 'error',
                        offset: 100,
                    })
                }
            })
    }

    // 将token返回给后端
    const getCookieToken = document.cookie.split(";").find(c => c.startsWith("token=")).split("=")[1];
    (async () => {
        if (getCookieToken) {
            await getPlayListsData().haveTokenLogin(getCookieToken);
            if (!getPlayListsData().haveTokenUserData) {
                thisToken.value = getCookieToken;
                nickname.value = getPlayListsData().haveTokenUserData.nickname;
                gender.value = getPlayListsData().haveTokenUserData.gender;
                introduce.value = getPlayListsData().haveTokenUserData.introduce;
            } else {
                thisToken.value = getCookieToken;
                nickname.value = getPlayListsData().haveTokenUserData.nickname;
                gender.value = getPlayListsData().haveTokenUserData.gender;
                introduce.value = getPlayListsData().haveTokenUserData.introduce;
                imageUrl.value = 'https://cptbtptp2557.oss-cn-shenzhen.aliyuncs.com/' + getPlayListsData().haveTokenUserData.account;
            }
        }
    })();

    // 退出登录
    const signOut = async () => {
        thisToken.value = '';
        document.cookie = "token = " + "";
        getPlayListsData().haveTokenUserData = [];
        getPlayListsData().userData = [];
        account.value = '';
        password.value = '';
    }

    return {
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
    }
}