<template>
    <v-dialog v-model="isShowDialog" persistent width="auto">
        <v-card>
            <v-toolbar color="info" title="Заполните форму"/>
            <v-form>
                <slot name="formBody"></slot>
            </v-form>
            <v-container>
                <v-row justify="center">
                    <v-col cols="6">
                        <v-btn 
                            class="text-white bg-green-lighten-2" 
                            @click="saveDialogForm"
                            block
                            v-if="btnVisible"
                        >
                            Сохранить
                        </v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-btn 
                            class="text-white bg-red-lighten-2" 
                            @click="closeDialogForm"
                            block
                        >
                            Закрыть
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>  
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props:{
            isShowDialogProp: Boolean,
            title: String,
            btnVisible: Boolean
        },
        methods:{
            saveDialogForm(){
                this.isShowDialog = false;
                this.$emit('saveDialogForm');
            },
            closeDialogForm(){
                this.isShowDialog = false;
                this.$emit('closeDialogForm');
            }
        },
        computed:{
            isShowDialog: {
                get(){
                    return this.isShowDialogProp;
                },
                set(value){
                    return this.$emit('update:modelValue', value)
                }
            }
        },
    }
</script>