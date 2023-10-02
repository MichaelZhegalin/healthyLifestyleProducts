<template>
  <v-app>
      <header>
          <main-navbar/>
      </header>
      <v-main class="app-background">
          <!-- <window-with-user-info :id="id"/> -->
          <router-view/>
      </v-main>
  </v-app>
</template>

<script>
import MainNavbar from './components/MainNavbar.vue'
import WindowWithUserInfo from './components/WindowWithUserInfo.vue'
import { useUserInfo } from './store/userInfoModule'
export default {
  components: { MainNavbar, WindowWithUserInfo },
  data(){
    return {
      // id: useUserInfo().activeUserId,
    }
  },
  computed:{
    id: {
      get(){
        return useUserInfo().activeUserId
      }
    }
  }
}
</script>

<style>
@import '/src/styles/settings.scss';
</style>