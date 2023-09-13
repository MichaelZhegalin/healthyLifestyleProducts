<template>
    <nav class="d-flex justify-center">
        <v-card class="d-flex align-center bg-green-lighten-2" max-width="600" min-width="600" height="75">
            <v-container>
                <v-row>
                    <v-col align-self="center" cols="3">
                        <h2 class="text-white">Продукты</h2>
                    </v-col>
                    <v-col cols="9">
                        <form action="#">
                            <v-container>
                                <v-row>
                                    <v-col cols="8">
                                        <v-select 
                                            :items="sortParams" 
                                            label="Сортировать по"
                                            variant="underlined"
                                        />
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field variant="underlined" label="Поиск"/>
                                    </v-col>
                                </v-row>
                            </v-container>
                            
                            
                        </form>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </nav>
</template>

<script>
export default {
    data(){
        return{
            sortParams: ["Названиям", "Калориям", "Белкам", "Жирам", "Углеводам"],
        }
    }

}
</script>

<style>

</style>