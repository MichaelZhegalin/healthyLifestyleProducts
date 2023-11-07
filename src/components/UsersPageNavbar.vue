<template>
    <nav class="d-flex justify-center">
        <v-card 
            class="d-flex align-center bg-green-lighten-2" 
            max-width="600" 
            min-width="600" 
            height="75"
        >
            <v-container>
                <v-row>
                    <v-col align-self="center">
                        <h2 class="text-white">Пользователи</h2>
                    </v-col>
                    <v-col>
                        <form>
                            <v-text-field 
                                v-model="searchUser"
                                variant="underlined" 
                                label="Поиск"
                            />
                        </form>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </nav>
</template>

<script>
    export default {
        props:{
            modelValue: String
        },
        computed:{
            searchUser: {
                get(){
                    return this.modelValue
                },
                set(value){
                    this.$emit('update:modelValue', value)
                }
            },
        }
    }
</script>