<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <food-page-navbar/>
            </v-col>
            <v-col cols="12">
                <v-container>
                    <v-row>
                        <v-col>
                            <card-for-food title="Noir Degustation 72%"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <card-for-food title="Noir Degustation 72%"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <card-for-food title="Noir Degustation 72%"/>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
            <v-col class="d-flex justify-center" cols="12">
                <v-btn class="bg-green-lighten-2 text-white" size="x-large">Добавить</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import CardForFood from '@/components/cards/CardForFood.vue'
import FoodPageNavbar from '@/components/FoodPageNavbar.vue'
export default {
  components: { CardForFood, FoodPageNavbar },

}
</script>

<style>

</style>