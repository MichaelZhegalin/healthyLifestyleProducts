<template>
    <v-card class="mx-auto" max-width="344" min-width="200">
        <v-img
            :src="imageURL"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="95px"
            cover
        >
            <v-card-title class="text-white">{{ title }}</v-card-title>
        </v-img>
        <v-list density="compact">
            <v-list-subheader>Антропометрия</v-list-subheader>
            <v-list-item
                v-for="item in items"
                :key="item"
                :value="item"
                color="primary"
                rounded="shaped"
            >
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
                <span>{{ item.text }}</span>
            </v-list-item>
        </v-list>
        <v-container>
            <v-row justify="center">
                <v-col class="card_btns-col" cols="6">
                    <v-btn 
                        @click="setActiveUser" 
                        v-if="!isActive" 
                        class="card-btn bg-green-lighten-2 text-white"
                    >
                        Выбрать
                    </v-btn>
                    <v-btn 
                        v-else
                        disabled
                    >
                        Выбран
                    </v-btn>
                </v-col>
                <v-col class="card_btns-col" cols="6">
                    <v-btn 
                        @click="deleteUser" 
                        class="card-btn bg-red-lighten-2 text-white"
                    >
                    Удалить
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>  
    </v-card>
</template>

<script>
    import { useUserInfo } from '@/store/userInfoModule'

    export default {
        props:{
            id: String
        },
        data: (props) => ({
            imageURL: useUserInfo().users[props.id].gender.localeCompare('Мужчина') === 0 ? 
                        "/src/img/man.jpg" : 
                        "/src/img/woman.png",
            items: [
                { text: `Пол: ${useUserInfo().users[props.id].gender}`, icon: 'mdi-gender-male-female' },
                { text: `Возраст: ${useUserInfo().users[props.id].age}`, icon: 'mdi-clock' },
                { text: `Рост: ${useUserInfo().users[props.id].height} см.`, icon: 'mdi-human-male-height-variant' },
                { text: `Вес: ${useUserInfo().users[props.id].weight} кг.`, icon: 'mdi-scale-bathroom' },
            ],
            title: useUserInfo().users[props.id].userName,
        }),
        methods:{
            setActiveUser(){
                useUserInfo().setActiveUser(this.id)
            },
            deleteUser(){
                useUserInfo().deleteUser(this.id)
            }
        },
        computed:{
            isActive: {
                get(){
                    return useUserInfo()?.users[this.id]?.isActive;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .card-btn{
        font-weight: 500;
    }
    .card_btns-col{
        display: flex; 
        justify-content: center;
    }
</style>