<template>
    <h1 class="sampStyleScss">Начальная сборка Vue3(Vite) + pinia + router + bootstrap5 + vuetify + scss</h1>
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