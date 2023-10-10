<template>
    <v-container>
        <my-dialog 
            v-model="isShowDialog" 
            @saveDialogForm="saveDialogForm" 
            @closeDialogForm="closeDialogForm"
            :btnVisible="true"
        >
            <template #formBody>
                <add-user-form
                    :userName="userName"
                    :age="age"
                    :height="height"
                    :weight="weight"
                    :genderProp="genderProp"
                    :genderItem="genderItem"
                    @setUserName="setUserName"
                    @setAge="setAge"
                    @setHeight="setHeight"
                    @setWeight="setWeight"
                    @setGender="setGender"
                />
            </template>
        </my-dialog>
        <v-row>
            <v-col cols="12">
                <users-page-navbar
                    @setSearchUser="setSearchUser"
                    :searchUserProp="searchUser"
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
    import MyDialog from '../components/dialog/MyDialog.vue'
    import AddUserForm from '../components/form/AddUserForm.vue'
    import {useUserInfo} from '../store/userInfoModule'
    import { useCalculatorPFC } from '@/store/calculatorProteinsFatsCarbsModule'

    export default {
        components: { UsersPageNavbar, Carousel, CardForUser, MyDialog, AddUserForm},
        data(){
            return{
                isShowDialog: false,
                userName: '',
                age: '',
                height: '',
                weight: '',
                genderProp: '',
                genderItem: ["Мужчина", "Женщина"],
                objWithInfoAboutUsers: {},
                searchUser: '', 
            }
        },
        methods: {
            setSearchUser(value){
                this.searchUser = value;
                value = value.toLowerCase();
                for(let key in useUserInfo().users){
                    if (useUserInfo().users[key].userName.toLowerCase().includes(`${value}`)) {
                        this.objWithInfoAboutUsers[key] = useUserInfo().users[key];
                    } else {
                        delete this.objWithInfoAboutUsers[key];
                    }
                }
            },
            showDialog(){
                this.isShowDialog = true;
            },
            setUserName(value){
                this.userName = value;
            },
            setAge(value){
                this.age = value;
            },
            setHeight(value){
                this.height = value;
            },
            setWeight(value){
                this.weight = value;
            },
            setGender(value){
                this.genderProp = value;
            },
            saveDialogForm(){
                if (
                    this.userName !== '' &&
                    this.weight !== '' && 
                    this.height !== '' && 
                    this.age !== '' &&
                    this.genderProp !== ''
                ) {
                    useCalculatorPFC().setCalorieCount({
                        weight: this.weight,
                        height: this.height,
                        age: this.age,
                        gender: this.genderProp
                    })

                    useCalculatorPFC().adjustmentForPhysicalActivity(1.55);

                    let needCalorie = Math.floor(useCalculatorPFC().calorieWithPhysicalActivity);
                    let needPFC = useCalculatorPFC().getPFC;

                    useUserInfo().setNewUser({
                        userName: this.userName,
                        age: this.age,
                        height: this.height,
                        weight: this.weight,
                        gender: this.genderProp,
                        needCalories: needCalorie,
                        needPFC: needPFC,
                        id: Date.now()
                    });

                    this.copyObject(useUserInfo().users, this.objWithInfoAboutUsers);
                } else {
                    alert("Вы заполнили форму не до конца!");
                }
                
                this.userName = '';
                this.age = '';
                this.height = '';
                this.weight = '';
                this.setGender('');
            },
            closeDialogForm(){
                this.userName = '';
                this.age = '';
                this.height = '';
                this.weight = '';
                this.setGender('');
            },
            copyObject(copiedObj, finishObj){
                for(let key in copiedObj){
                    finishObj[key] = copiedObj[key];
                }
                return finishObj
            }
        },
        computed: {
            observerOfUsers: {
                get(){
                    return Object.keys(useUserInfo().users).length
                }
            }
        },
        watch: {
            observerOfUsers(){
                this.searchUser = '';
                this.objWithInfoAboutUsers = {};
                this.copyObject(useUserInfo().users, this.objWithInfoAboutUsers);
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