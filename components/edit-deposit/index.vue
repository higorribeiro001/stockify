<script setup lang="ts">
    interface Deposit {
        deposit_name: string;
        limit: number;
        is_active: boolean;
        address_id: number;
        cep: string;
        address: string;
        neighborhood: string;
        city: string;
        uf: string;
        country: string;
        latitude: number;
        longitude: number;
    }

    const props = defineProps<Deposit>()

    const dialog = ref(false);

    const orange = '#FF6A00';

    const editDeposit = ref([
       {
        label: 'Nome*',
        type: 'text',
        value: props.deposit_name
       },
       {
        label: 'Limite*',
        type: 'text',
        value: String(props.limit)
       },
       {
        label: 'Endereço*',
        type: 'text',
        value: props.address
       },
       {
        label: 'CEP*',
        type: 'text',
        value: props.cep
       },
       {
        label: 'Cidade*',
        type: 'select',
        value: props.city
       },
       {
        label: 'Estado*',
        type: 'select',
        value: props.uf
       },
       {
        label: 'País*',
        type: 'text',
        value: props.country
       },
       {
        label: 'Ativo*',
        type: 'select',
        value: String(props.is_active)
       },
       {
        label: 'Latitude*',
        type: 'text',
        value: String(props.latitude) || ''
       },
       {
        label: 'Longitude*',
        type: 'text',
        value: String(props.longitude) || ''
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
                        v-for="(d) in editDeposit"
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