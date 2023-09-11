<template>
    <v-btn @click="$router.push('day')">перейти на странцу дня</v-btn>
</template>

<script>
    import { useSampleStore } from '../store/sampleStore';
    export default {
        data(){
            return{
                sampleStore: useSampleStore()
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>