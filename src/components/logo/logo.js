import { ref } from 'vue';

export function useAnimationLogic() {
    const scaleLast = ref();
    const topLast = ref();
    const one = ref();
    const opacityLast = ref();
    const two = ref();

    setInterval(() => {
        scaleLast.value = 0.5;
        topLast.value = '15vh';
    }, 500);
    setInterval(() => {
        one.value = '0s';
        opacityLast.value = 1;
    }, 1500);
    setInterval(() => {
        two.value = '0s';
    }, 2000);

    return {
        scaleLast,
        topLast,
        one,
        opacityLast,
        two
    };
}