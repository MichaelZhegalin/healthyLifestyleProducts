<template>
    <v-container class="container-size">
        <v-row>
            <v-col cols="6">
                <v-text-field
                    :value="userName"
                    @input="setUserName"
                    :counter="10"
                    label="Имя"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="age"
                    @input="setAge"
                    :counter="3"
                    label="Возраст"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="height"
                    @input="setHeight"
                    :counter="3"
                    label="Рост"
                    variant="underlined"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    :value="weight"
                    @input="setWeight"
                    :counter="3"
                    label="Вес"
                    variant="underlined"
                />
            </v-col>
            <v-col>
                <v-select 
                    v-model="gender"
                    :items="genderItem" 
                    label="Пол"
                    variant="underlined"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
    export default{
        props:{
            userName: String,
            age: String,
            height: String,
            weight: String,
            genderProp: String,
            genderItem: Array
        },
        methods:{
            setUserName(event){
                this.$emit('setUserName', event.target.value);
            },
            setAge(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setAge', event.target.value);
                }
            },
            setHeight(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setHeight', event.target.value);
                }
            },
            setWeight(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setWeight', event.target.value);
                }
            },
            setGender(event){
                if (!!Number(event.target.value) && Number(event.target.value) >= 0) {
                    this.$emit('setGender', event.target.value);
                }
            }
        },
        computed:{
            gender: {
                get(){
                    return this.genderProp
                },
                set(value){
                    return this.$emit('setGender', value)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container-size{
        width: 20rem;
    }
</style>