import {defineStore} from "pinia";
import {ref} from "vue";

export const songToBePlayedLists = defineStore('playedLists', () => {
    const data = ref([]);

    let inData = lists => {
        data.value = lists;
    }
    return {
        data,
        inData,
    }
})