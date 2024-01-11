import OSS from 'ali-oss';
import {ref} from "vue";
import {getPlayListsData} from '@/axios/piniaGetLists/getThisPlayMusicLists'

export const alibabaCloud_OSS = () => {
    const client = new OSS({
        accessKeyId: 'LTAI5tGxPZ3hn1rbGVuyRdoQ',
        accessKeySecret: '4BIHxXF56YRZCAJTRUvGEgg9G0DtqG',
        region: 'oss-cn-shenzhen',
        bucket: 'cptbtptp2557'
    });

    const file = ref(null);

    // 修改头像
    const handleFileChange = async (event) => {
        file.value = event.target.files[0];
        await upLoadImage();
    };

    // 修改头像--上传图片到阿里云oss
    const upLoadImage = async () => {
        if (!file.value) return;
        try {
            const result = await client.put(`${getPlayListsData().haveTokenUserData.account}`, file.value);
            console.log('图片上传成功', result);
        } catch (err) {
            console.error('图片上传失败', err);
        }
    };

    // 修改头像--上传图片到阿里云oss
    const InitialAvatar = async (event, account) => {
        if (!event) return;
        try {
            const result = await client.put(`${account}`, event);
            console.log('图片上传成功:', result);
        } catch (err) {
            console.error('图片上传失败', err);
        }
    };

    return {
        handleFileChange,
        upLoadImage,
        InitialAvatar,
    }
}