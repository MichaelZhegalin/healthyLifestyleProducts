<template>
    <nav>
        <v-container class="bg-green-lighten-2 users-navbar-container">
            <v-row>
                <v-col align-self="center">
                    <h2 class="text-white">Пользователи</h2>
                </v-col>
                <v-col>
                    <form action="#">
                        <v-text-field class="text-white" variant="underlined" label="Поиск"/>
                    </form>
                </v-col>
            </v-row>
        </v-container>
    </nav>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss">
    .users-navbar-container{
        max-width: 30rem; 
        border-radius: 10px;
    }
</style>