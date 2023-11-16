<template>
    <v-card 
        class="mx-auto d-flex flex-column" 
        max-width="344" 
        min-width="200" 
        height="400"
    >
        <v-img
            :src="imageURL"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="65px"
            cover
        >
            <v-card-title class="text-white">{{ title }}</v-card-title>
        </v-img>
        <v-list density="compact">
            <v-list-subheader>Вы употребили: </v-list-subheader>
            <v-list-item
                v-for="item in items"
                :key="item"
                :value="item"
                color="primary"
                rounded="shaped"
            >
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"/>
                </template>
                <span>{{ item.text }}</span>
            </v-list-item>
        </v-list>
        <v-container class="d-flex align-end">
            <v-row justify="center" class="py-3">
                <v-btn 
                    @click="deleteFood" 
                    class="card-btn bg-red-lighten-2 text-white"
                >
                    Удалить
                </v-btn>
            </v-row>
        </v-container>  
    </v-card>
</template>

<script>
    import { useFoodInfo } from '@/store/foodInfoModule'

    export default {
        props:{
            imageURL: String,
            id: String,
            timesOfDay: String,
            selectedDate: String,
            eatFood: Object
        },
        data: (props) => ({
            title: props.eatFood[props.id].foodName,
            items: [
                { text: `Масса: ${props.eatFood[props.id].weight} г.`, icon: 'mdi-silverware-clean' },
                { text: `Калории: ${props.eatFood[props.id].calories}`, icon: 'mdi-fire' },
                { text: `Белки: ${props.eatFood[props.id].proteins}`, icon: 'mdi-water-outline' },
                { text: `Жиры: ${props.eatFood[props.id].fats}`, icon: 'mdi-water' },
                { text: `Углеводы: ${props.eatFood[props.id].carbs}`, icon: 'mdi-wall-fire' },
            ],
        }),
        methods:{
            deleteFood(){
                useFoodInfo().deleteEatFood(this.selectedDate, this.timesOfDay, this.id);
            }
        },
    }
</script>

<style scoped lang="scss">
    .card-btn{
        font-weight: 500;
    }
</style>