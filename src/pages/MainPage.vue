<template>
    <calendar/>
</template>

<script>
    import Calendar from '@/components/Calendar.vue';
    import { useFoodInfo } from '@/store/foodInfoModule'

    export default {
        components: {Calendar},
        methods: {
            setJSON(){
                let isNormalize = useFoodInfo().isNormalizeData
                if(!isNormalize){
                    useFoodInfo().normalizeData();
                    useFoodInfo().setJSONFoodBase();
                }
            },
        },
        mounted(){
            this.setJSON();
        }
    }
</script>