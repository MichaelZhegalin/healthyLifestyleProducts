<template>
    <v-card class="mx-auto" max-width="344" min-width="200">
        <v-img
            :src="imageURL"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="100px"
            cover
        >
            <v-card-title class="text-white">{{ title }}</v-card-title>
        </v-img>
        <v-list density="compact">
            <v-list-subheader>Антропометрия</v-list-subheader>
            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                color="primary"
                rounded="shaped"
            >
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
                <span>{{ item.text }}</span>
            </v-list-item>
        </v-list>
        <div class="card-btns">
            <v-btn @click="$router.push(`${routerPush}`)" color="green" class="btn">Выбрать</v-btn>
            <v-btn @click="$router.push(`${routerPush}`)" color="red" class="btn">Удалить</v-btn>
        </div>  
    </v-card>
</template>

<script>
    export default {
        props: {
            title: String,
            imageURL: String,
            subtitle: String,
            routerPush: String,
        },
        data: () => ({
            items: [
                { text: 'Пол', icon: 'mdi-gender-male-female' },
                { text: 'Возраст', icon: 'mdi-clock' },
                { text: 'Рост', icon: 'mdi-human-male-height-variant' },
                { text: 'Вес', icon: 'mdi-scale-bathroom' },
            ],
        }),

    }
</script>

<style scoped lang="scss">
    .btn{
        font-weight: 500;
    }
    .card-btns{
        display: flex; 
        justify-content: space-around; 
        margin: 10px;
    }
</style>