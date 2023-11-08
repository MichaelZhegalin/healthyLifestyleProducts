<template>
    <v-container>
        <form-dialog 
            v-model="isShowDialog" 
            @saveDialogForm="saveDialogForm" 
            @closeDialogForm="closeDialogForm"
            :btnVisible="true"
        >
            <template #formBody>
                <add-user-form
                    :userInfo="userInfo"
                />
            </template>
        </form-dialog>
        <v-row>
            <v-col cols="12">
                <users-page-navbar
                    v-model="searchUser"
                />
            </v-col>
            <v-col class="usersList_col-center" cols="12">
                    <carousel :objWithInfoProp="objWithInfoAboutUsers">
                        <template v-slot:default="cardSlot">
                            <card-for-user 
                                :id="cardSlot.cardId"
                            />
                        </template>   
                    </carousel>
            </v-col>
            <v-col class="usersList_col-center" cols="12">
                <v-btn @click="showDialog" class="bg-green-lighten-2 text-white" size="x-large">
                    Добавить
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UsersPageNavbar from '../components/UsersPageNavbar.vue'
    import Carousel from '../components/Carousel.vue'
    import CardForUser from '../components/cards/CardForUser.vue'
    import FormDialog from '../components/dialog/FormDialog.vue'
    import AddUserForm from '../components/form/AddUserForm.vue'
    import {useUserInfo} from '../store/userInfoModule'
    import { useCalculatorPFC } from '@/store/calculatorProteinsFatsCarbsModule'

    export default {
        components:{ UsersPageNavbar, Carousel, CardForUser, FormDialog, AddUserForm},
        data(){
            return{
                isShowDialog: false,
                objWithInfoAboutUsers: {},
                searchUser: null, 
                userInfo: {
                    userName: '',
                    age: '',
                    height: '',
                    weight: '',
                    gender: '',
                    genderItem: ["Мужчина", "Женщина"]
                }
            }
        },
        methods:{
            showDialog(){
                this.isShowDialog = true;
            },
            saveDialogForm(){
                if (
                    this.userInfo.userName !== '' &&
                    this.userInfo.weight !== '' && 
                    this.userInfo.height !== '' && 
                    this.userInfo.age !== '' &&
                    this.userInfo.gender !== ''
                ) {
                    if (
                        !!Number(this.userInfo.weight) && 
                        Number(this.userInfo.weight) >= 0 &&
                        !!Number(this.userInfo.height) && 
                        Number(this.userInfo.height) >= 0 &&
                        !!Number(this.userInfo.age) && 
                        Number(this.userInfo.age) >= 0
                    ) {
                        useCalculatorPFC().setCalorieCount({
                            weight: this.userInfo.weight,
                            height: this.userInfo.height,
                            age: this.userInfo.age,
                            gender: this.userInfo.gender
                        })

                        useCalculatorPFC().adjustmentForPhysicalActivity(1.55);

                        let needCalorie = Math.floor(useCalculatorPFC().calorieWithPhysicalActivity);
                        let needPFC = useCalculatorPFC().getPFC;

                        useUserInfo().setNewUser({
                            userName: this.userInfo.userName,
                            age: this.userInfo.age,
                            height: this.userInfo.height,
                            weight: this.userInfo.weight,
                            gender: this.userInfo.gender,
                            needCalories: needCalorie,
                            needPFC: needPFC,
                            id: Date.now()
                        });

                        this.copyObject(useUserInfo().users, this.objWithInfoAboutUsers);
                    } else {
                        alert("Вы ввели данные неправильно! В числовые поля необходимо вводить положительные числа!")
                    }
                } else {
                    alert("Вы заполнили форму не до конца!");
                }
                
                this.userInfo.userName = '';
                this.userInfo.age = '';
                this.userInfo.height = '';
                this.userInfo.weight = '';
                this.userInfo.gender = '';
            },
            closeDialogForm(){
                this.userInfo.userName = '';
                this.userInfo.age = '';
                this.userInfo.height = '';
                this.userInfo.weight = '';
                this.userInfo.gender = '';
            },
            copyObject(copiedObj, finishObj){
                for(let key in copiedObj){
                    finishObj[key] = copiedObj[key];
                }
                return finishObj
            }
        },
        computed:{
            observerOfUsers: {
                get(){
                    return Object.keys(useUserInfo().users).length
                }
            }
        },
        watch:{
            observerOfUsers(){
                this.searchUser = '';
                this.objWithInfoAboutUsers = {};
                this.copyObject(useUserInfo().users, this.objWithInfoAboutUsers);
            },
            searchUser(){
                let value = this.searchUser.toLowerCase();
                for(let key in useUserInfo().users){
                    if (useUserInfo().users[key].userName.toLowerCase().includes(`${value}`)) {
                        this.objWithInfoAboutUsers[key] = useUserInfo().users[key];
                    } else {
                        delete this.objWithInfoAboutUsers[key];
                    }
                }
            }
        },
        mounted(){
            this.copyObject(useUserInfo().users, this.objWithInfoAboutUsers);
        },
    }
</script>

<style lang="scss" scoped>
    .usersList_col-center{
        display: flex; 
        justify-content: center;
    }
</style>