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
                                :value="searchUser" 
                                @input="setSearchUser($event.target.value)" 
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
            searchUserProp: String
        },
        methods: {
            setSearchUser(value){
                this.$emit('setSearchUser', value)
            }
        },
        computed: {
            searchUser: {
                get(){
                    return this.searchUserProp
                }
            }
        },
    }
</script>