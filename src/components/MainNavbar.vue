<template>
    <v-app-bar :elevation="1" rounded>
        <v-app-bar-nav-icon @click="$router.push('/')">
            <v-img :width="45" src="/src/img/apple.png"/>
        </v-app-bar-nav-icon>
        <v-app-bar-title class="appbar-font-size">ЗОЖ-учет продуктов</v-app-bar-title>
        <div>
            <v-container>
                <v-row>
                    <v-col cols="4">
                        <v-btn class="navbar-btns" @click="$router.push('/statistics')">Статистика</v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn class="navbar-btns" @click="$router.push('/users')">Пользователи</v-btn>
                    </v-col>
                    <v-col cols="4">
                        <v-btn class="navbar-btns" @click="$router.push('/foods')">Продукты</v-btn>
                    </v-col>  
                </v-row>
            </v-container>     
        </div> 
    </v-app-bar>
</template>

<style scoped lang="scss">
    .appbar-font-size{
        font-size: 20px;
    }
    .navbar-btns{
        font-size: 14px;
    }
</style>