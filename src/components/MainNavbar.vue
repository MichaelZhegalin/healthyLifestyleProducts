<template>
    <v-app-bar :elevation="1" rounded>
        <v-app-bar-nav-icon @click="$router.push('/')">
            <v-img :width="45" src="src/img/apple.png"></v-img>
        </v-app-bar-nav-icon>
        <v-app-bar-title style="font-size: 20px;">ЗОЖ-учет продуктов</v-app-bar-title>
        <div>
            <div class="row">
                <div class="col">
                    <v-btn style="font-size: 14px;">Статистика</v-btn>
                </div>
                <div class="col">
                    <v-btn style="font-size: 14px;">Пользователи</v-btn>
                </div>
                <div class="col">
                    <v-btn style="font-size: 14px;">Продукты</v-btn>
                </div>
            </div>        
        </div> 
    </v-app-bar>
</template>

<script>
export default {

}
</script>

<style>

</style>