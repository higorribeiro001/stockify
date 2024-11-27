<script setup lang="ts">
    const dialog = ref(false);
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
            title="Excluir Depósito"
        >
            <v-card-text>
                <p class="text-caption font-weight-bold">Certeza que deseja excluir o depósito?</p>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-between pb-7">
                <v-btn
                    class="rounded-lg text-uppercase font-weight-black ml-5"
                    color="#FF6A00"
                    @click="dialog = false"
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