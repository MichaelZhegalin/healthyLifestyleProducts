import { defineStore } from "pinia";

export const useSampleStore = defineStore('sampleStore', {
    state: () => ({
        testState: 0,
    }),
    getters: {},
    actions: {
        test(){
            this.testState += 1;
        }
    }
})