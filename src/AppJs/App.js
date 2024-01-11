import {ref} from "vue";

export const AppEnd = () => {
    const logoEnd = ref();

    setInterval(() => {
        logoEnd.value = 0;
    }, 2500);

    const changeStyle = () => {
        const debounce = (fn, delay) => {
            let timer = null;
            return function () {
                let context = this;
                let args = arguments;
                clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(context, args);
                }, delay);
            }
        }

        const _ResizeObserver = window.ResizeObserver;
        window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
            constructor(callback) {
                callback = debounce(callback, 16);
                super(callback);
            }
        }
    }

    return {
        logoEnd,
        changeStyle,
    }
}