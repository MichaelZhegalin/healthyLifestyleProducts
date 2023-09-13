<template>
    <nav class="d-flex justify-center">
        <v-card class="d-flex align-center bg-green-lighten-2" max-width="600" min-width="600" height="75">
            <v-container>
                <v-row>
                    <v-col align-self="center">
                        <h2>Пользователи</h2>
                    </v-col>
                    <v-col>
                        <form action="#">
                            <v-text-field variant="underlined" label="Поиск"/>
                        </form>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
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