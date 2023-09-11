<template>
    <v-container>
        <my-dialog v-model="isShowDialog">
            <template v-slot:formBody>
                <add-user-form></add-user-form>
            </template>
            
        </my-dialog>
        <v-row>
            <v-col cols="12">
                <users-page-navbar/>
            </v-col>
            <v-col class="usersList_col-center" cols="12">
                    <carousel>
                        <card-for-user 
                            title="Завтрак"
                            subtitle="Съешь сам"
                            imageURL="../src/img/breakfast.jpg"
                            routerPush="day/breakfast"
                        />
                    </carousel>
            </v-col>
            <v-col class="usersList_col-center" cols="12">
                <v-btn @click="ShowDialog" class="bg-green-lighten-2 text-white" size="x-large">Добавить</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UsersPageNavbar from '../components/UsersPageNavbar.vue'
    import Carousel from '../components/Carousel.vue'
    import CardForUser from '../components/cards/CardForUser.vue'
    import MyDialog from '../components/dialog/MyDialog.vue'
import AddUserForm from '../components/AddUserForm.vue'
    export default {
        components: { UsersPageNavbar, Carousel, CardForUser, MyDialog, AddUserForm},
        data(){
            return{
                isShowDialog: false,
            }
        },
        methods: {
            ShowDialog(){
                this.isShowDialog = true;
            }
        }
        }
</script>

<style lang="scss" scoped>

    .usersList_col-center{
        display: flex; 
        justify-content: center;
    }
</style>