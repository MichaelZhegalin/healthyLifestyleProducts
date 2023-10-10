<template>
    <v-container class="container-size">
        <v-row class="pt-5 d-flex justify-center">
            <v-date-picker 
                title="Выберете промежуток" 
                multiple
                v-model="date"
            />
        </v-row>
    </v-container>
</template>
  
<script>
    import { VDatePicker } from 'vuetify/labs/VDatePicker'
    export default {
        props:{
            dateProp: Object
        },
        components: { VDatePicker },
        computed:{
            date: {
                get(){
                    return this.dateProp
                },
                set(value){
                        return this.$emit('addDate', value)
                    }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .container-size{
        width: 30rem;
    }
</style>