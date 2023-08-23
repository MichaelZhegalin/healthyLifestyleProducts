<template>
    <v-app>
        <header>
            <main-navbar></main-navbar>
        </header>
        <v-main>
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
  @import './assets/style.scss';
</style>
