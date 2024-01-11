import {defineStore} from "pinia";
import axios from "axios";

export const getPlayListsData = defineStore('playLists', {
    state: () => ({
        musicData: [],
        playData: [],
        tokenData: '',
        userData: [],
        userAccount: '',
        haveTokenUserData: [],
        defaultImageInformation: [],
    }),
    actions: {
        async getMusicLists(token) {
            try {
                const list = await axios.get('http://127.0.0.1:6067/getAllMusicLists', {
                    params: {
                        'token': token
                    }
                });
                this.musicData = list.data;
            } catch (err) {
                console.error('获取失败', err);
            }
        },

        async getPlayListsData(name = '超爱', token) {
            try {
                const list = await axios.get('http://127.0.0.1:6067/musicLists', {
                    params: {
                        'name': name,
                        'token': token
                    }
                });
                this.playData = list.data;
            } catch (err) {
                console.error('获取失败', err);
            }
        },


        // 修改资料
        async postInformation(nickname = 'i用户', introduce = '展现最好的自己', gender = 'man', use = 'changeInformation') {
            try {
                await axios.post(`http://127.0.0.1:6067/${use}`, '', {
                    params: {
                        'nickname': nickname,
                        'introduce': introduce,
                        'gender': gender
                    }
                })
            } catch (err) {
                console.error('传递失败', err);
            }
        },

        // 无token登陆验证
        async verifyLogin(account, password) {
            try {
                await axios.post('http://127.0.0.1:6067/login', {
                    'account': account,
                    'password': password
                })
                    .then((res) => {
                        this.tokenData = res.data.token;
                        this.userData = res.data.user;
                    })
            } catch (err) {
                console.error('登录失败', err);
            }
        },

        // 有token登录验证
        async haveTokenLogin(token) {
            try {
                const list = await axios.get('http://127.0.0.1:6067/haveToken', {
                    params: {
                        'token': token,
                    }
                });
                this.haveTokenUserData = list.data[0];
            } catch (err) {
                console.error('token过期!!!', err);
            }
        },

        // 创建账号
        async requestEnroll(password) {
            try {
                await axios.post('http://127.0.0.1:6067/enroll', {
                    'password': password,
                    'nickname': 'i用户',
                    'introduce': '展示最好的自己',
                    'gender': 'man'
                })
                    .then((res) => {
                        this.userAccount = res.data.generatedId;
                    })
            } catch (err) {
                console.error('传递失败', err);
            }
        },

        async getImageFile() {
            try {
                const response = await axios.get('https://cptbtptp2557.oss-cn-shenzhen.aliyuncs.com/InitialAvatar', {
                    responseType: 'blob'
                });
                const blob = new Blob([response.data], {type: 'image/png'});
                this.defaultImageInformation = new File([blob], 'ikun.png');
            } catch (error) {
                console.log('获取失败', error);
            }
        },

    }
});