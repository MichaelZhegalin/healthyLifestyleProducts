<template>
    <v-app-bar :elevation="1" rounded>
        <v-app-bar-nav-icon @click="$router.push('/')">
            <v-img :width="45" src="src/img/apple.png"></v-img>
        </v-app-bar-nav-icon>
        <v-app-bar-title class="appbar-font-size">ЗОЖ-учет продуктов</v-app-bar-title>
        <div>
            <div class="row">
                <div class="col">
                    <v-btn class="navbar-btns">Статистика</v-btn>
                </div>
                <div class="col">
                    <v-btn class="navbar-btns" @click="$router.push('/users')">Пользователи</v-btn>
                </div>
                <div class="col">
                    <v-btn class="navbar-btns">Продукты</v-btn>
                </div>
            </div>        
        </div> 
    </v-app-bar>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">
    .appbar-font-size{
        font-size: 20px;
    }
    .navbar-btns{
        font-size: 14px;
    }
</style>