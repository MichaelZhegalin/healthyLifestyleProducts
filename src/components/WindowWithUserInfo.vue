<template>
        <v-container class="window-with-user-info__container">
            <v-row class="d-flex flex-column">
                <v-col class="d-flex justify-start align-center">
                    <h3>{{ title }}</h3>
                </v-col>
                <v-col 
                    v-if="isAuthorized" 
                    class="d-flex flex-column CardForFood__characteristics-text-container"
                >
                    <span class="CardForFood__characteristics-text">Калории: {{calories}}</span>
                    <span class="CardForFood__characteristics-text">Белки: {{ proteins }}</span>
                    <span class="CardForFood__characteristics-text">Жиры: {{ fats }}</span>
                    <span class="CardForFood__characteristics-text">Углеводы: {{ carbs }}</span>
                </v-col>
                <v-col v-else>
                    <p>
                        Чтобы увидеть информацию о своем питании, 
                        пожалуйста, войдите в аккаунт во вкладке "Пользователи"
                    </p>
                </v-col>
            </v-row>
        </v-container>
</template>

<script>
    import { useUserInfo } from '@/store/userInfoModule'

    export default {
        props: {
            id: String
        },
        computed: {
            title: {
                get(){
                    return useUserInfo()?.users?.[this.id]?.userName??"Гость"
                }
            },
            isAuthorized: {
                get(){
                    return useUserInfo()?.users?.[this.id]?.userName === undefined? false: true
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .window-with-user-info__container{
        position: absolute;
        left: 10%;
        top: 15%;
        width: 500px;
        height: 100px;
    }
    .CardForFood__characteristics-text-container{
        font-size: 18px;
    }
    .CardForFood__characteristics-text{
        width: 200px;
        background-color: rgba(0,0,0, 0.1);
        border-radius: 5px;
        padding: 6px;
        margin: 5px;
    }
</style>