<template>
    <nav class="navbar">
        <div class="container bg-green-accent-4 users-navbar-container">
            <div class="row users-navbar-row">
                <div class="col">
                    <h3 class="text-white">Пользователи</h3>
                </div>
                <div class="col">
                    <form action="#">
                        <v-text-field class="text-white" variant="underlined" label="Поиск"/>
                    </form>
                </div>
            </div>   
        </div>
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
    .users-navbar-row{
        width: 100%; 
        display: flex; 
        align-items: center;
    }
</style>