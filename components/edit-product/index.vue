<script setup lang="ts">
    interface Product {
        name: string;
        blob_image: string;
        category_id : number;
        category : string;
        is_active: boolean;
        is_purchased : boolean;
        description: string;
        deposit_id: number;
        deposit: string;
        price: number;
    }

    const props = defineProps<Product>()

    const dialog = ref(false);

    const product = ref([
    {
        label: 'Nome*',
        type: 'text',
        value: props.name
       },
       {
        label: 'Imagem*',
        type: 'file',
        value: null
       },
       {
        label: 'Descrição*',
        type: 'text',
        value: props.description
       },
       {
        label: 'Categoria*',
        type: 'select',
        value: props.category
       },
       {
        label: 'Ativo*',
        type: 'select',
        value: String(props.is_active)
       },
       {
        label: 'Vendido*',
        type: 'select',
        value: String(props.is_purchased)
       },
       {
        label: 'Depósito*',
        type: 'select',
        value: props.deposit
       },
       {
        label: 'Preço*',
        type: 'text',
        value: String(props.price)
       },
    ]);
</script>

<template>
    <v-dialog
        v-model="dialog"
        max-width="600"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn 
                class="btn-expanded rounded-lg text-capitalize font-weight-black"
                color="#4CAF50"
                prepend-icon="mdi-pencil"
                elevation="0"
                v-bind="activatorProps"
            >
                Editar
            </v-btn>
        </template>

        <v-card
            title="Editar Depósito"
        >
            <v-card-text>
                <v-row dense>
                    <v-col
                        cols="12"
                        md="6"
                        sm="6"
                        v-for="(d) in product"
                    >
                        <v-text-field
                            v-if="d.type === 'text'"
                            :label="d.label"
                            v-model="d.value"
                            required
                        ></v-text-field>
                        <v-file-input
                            v-else-if="d.type === 'file'"
                            accept="image/*"
                            label="Imagem"
                            required
                        ></v-file-input>
                        <v-select
                            v-else
                            :items="['0-17', '18-29', '30-54', '54+']"
                            :label="d.label"
                            v-model="d.value"
                            required
                        ></v-select>
                    </v-col>

                </v-row>

                <small class="text-caption text-medium-emphasis font-weight-bold">*Campos obrigatórios</small>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-between pb-7">
                <v-btn
                    class="rounded-lg text-uppercase font-weight-black ml-5"
                    color="#FF6A00"
                    @click="dialog = false"
                >
                    Salvar
                </v-btn>
                <v-btn
                    class="rounded-lg text-uppercase font-weight-black mr-5"
                    @click="dialog = false"
                >
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped>
    * {
        font-family: "JetBrains Mono", monospace;
    }
</style>