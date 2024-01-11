import {ref} from "vue";

export const mySqlList = () => {
    let list = ref([]);

    fetch('http://127.0.0.1:6067/data')
        .then(response => response.json())
        .then(data => {
            list.value = data;
            // console.log(list.value)
        })
        .catch(error => {
            console.error('提取数据时出错:', error);
        });
    return {
        list,
    }
}


