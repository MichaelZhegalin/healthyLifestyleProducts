<template>
    <v-btn @click="$router.push('day')">перейти на странцу дня</v-btn>
    <calendar/>
</template>

<script>
    import { useSampleStore } from '../store/sampleStore';
    import Calendar from '@/components/Calendar.vue';
    export default {
        components: {Calendar},
        data(){
            return{
                sampleStore: useSampleStore()
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>