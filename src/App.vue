<template>
    <v-app>
        <header>
            <main-navbar></main-navbar>
        </header>
        <v-main class="app-background">
            <router-view/>
        </v-main>
    </v-app>
</template>

<script>
  import MainNavbar from './components/MainNavbar.vue'
  export default {
    components: { MainNavbar },
  }
</script>

<style>
  @import '/src/assets/style.scss';
</style>
