import {defineStore, DefineStoreOptions} from "pinia";

export const useNSFWStore = defineStore('nsfw', {
    persist: {
        key: 'NSFWStore',
        paths: [
            'enable',
            'rate'
        ],
        storage: localStorage
    },
    state: () => ({
        enable: false,
        rate: 0,
        show: false,
        timeOut: NaN
    }),
    actions: {
        load() {
            if (this.timeOut)
                clearTimeout(this.timeOut);

            this.timeOut = setTimeout(() => {
                this.show = true;
                this.timeOut = NaN;
            }, 800);
        },
        cancel() {
            if (this.timeOut) {
                clearTimeout(this.timeOut);
                this.timeOut = NaN;
            }
        }
    }
// 其他配置...
} as Omit<DefineStoreOptions<"nsfw", { enable: boolean, rate: number, show: boolean, timeOut: number }, {}, {}>, "id">);
