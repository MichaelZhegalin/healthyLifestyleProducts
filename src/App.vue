<template>
  <v-app>
      <header>
          <main-navbar/>
      </header>
      <v-main class="app-background">
          <users-plate :id="id"/>
          <router-view/>
      </v-main>
  </v-app>
</template>

<script>
import MainNavbar from './components/MainNavbar.vue'
import usersPlate from './components/UsersPlate.vue'
import { useUserInfo } from './store/userInfoModule'
export default {
  components: { MainNavbar, usersPlate },
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