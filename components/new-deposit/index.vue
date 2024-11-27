<script setup lang="ts">
    const dialog = ref(false);

    const orange = '#FF6A00';

    const newDeposit = ref([
       {
        label: 'Nome*',
        type: 'text',
        value: ''
       },
       {
        label: 'Limite*',
        type: 'text',
        value: ''
       },
       {
        label: 'Endereço*',
        type: 'text',
        value: ''
       },
       {
        label: 'CEP*',
        type: 'text',
        value: ''
       },
       {
        label: 'Cidade*',
        type: 'select',
        value: ''
       },
       {
        label: 'Estado*',
        type: 'select',
        value: ''
       },
       {
        label: 'País*',
        type: 'text',
        value: ''
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
                class="btn-new rounded-lg text-capitalize font-weight-black mb-6"
                :color="orange"
                prepend-icon="mdi-plus"
                v-bind="activatorProps"
            >
                Novo depósito
            </v-btn>
        </template>

        <v-card
            title="Novo Depósito"
        >
            <v-card-text>
                <v-row dense>
                    <v-col
                        cols="12"
                        md="6"
                        sm="6"
                        v-for="(d) in newDeposit"
                    >
                        <v-text-field
                            v-if="d.type === 'text'"
                            :label="d.label"
                            v-model="d.value"
                            required
                        ></v-text-field>
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
                    Cadastrar
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