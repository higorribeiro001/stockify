<script setup lang="ts">
import { deleteProduct } from '~/services/api/product';

interface DeleteProduct {
    id: number;
    loadProducts: () => void;
}

const props = defineProps<DeleteProduct>();

const dialog = ref(false);

const snackbar = ref({
    active: false,
    text: ''
});

const removeProduct = async () => {
    const response = await deleteProduct(props.id);

    if (response.status === 204) {
        snackbar.value.active = true;
        snackbar.value.text = 'Produto removido com sucesso.';
        props.loadProducts();
        dialog.value = false;
    } 
}
</script>

<template>
    <v-dialog
        v-model="dialog"
        max-width="600"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn 
                class="btn-expanded rounded-lg text-capitalize font-weight-black"
                color="#FF1616"
                prepend-icon="mdi-trash-can"
                elevation="0"
                v-bind="activatorProps"
            >
                Excluir
            </v-btn>
        </template>

        <v-card
            title="Excluir Produto"
        >
            <v-card-text>
                <p class="text-caption font-weight-bold">Certeza que deseja excluir o produto?</p>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-between pb-7">
                <v-btn
                    class="rounded-lg text-uppercase font-weight-black ml-5"
                    color="#FF6A00"
                    @click="removeProduct()"
                >
                    Excluir
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