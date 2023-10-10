<template>
    <v-btn class="plate__btns-position">{{ title }}</v-btn>
</template>

<script>
    import { useUserInfo } from '@/store/userInfoModule'

    export default {
        props:{
            id: String
        },
        computed:{
            title: {
                get(){
                    return useUserInfo().users[this.id]?.userName ?? "Гость"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .plate__btns-position{
        position: sticky;
        top: 15%;
        left: 2%;
    }
</style>