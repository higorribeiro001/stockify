<script setup lang="ts">
import { deleteAddress } from '~/services/api/address';
import { deleteDeposit } from '~/services/api/deposit';

interface DeleteDeposit {
    id: number;
    addressId: number;
    loadDeposits: () => void;
}

const props = defineProps<DeleteDeposit>();

const dialog = ref(false);

const snackbar = ref({
    active: false,
    text: ''
});

const removeDeposit = async () => {
    const response = await deleteAddress(props.addressId);

    if (response.status === 204) {
        const responseDeposit = await deleteDeposit(props.id);

        if (responseDeposit.status === 204) {
            snackbar.value.active = true;
            snackbar.value.text = 'Depósito removido com sucesso.';
            props.loadDeposits();
            dialog.value = false;
        } 
    } 
}
</script>

<template>
    <v-snackbar
      v-model="snackbar.active"
      multi-line
    >
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="snackbar.active = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
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
                    @click="removeDeposit()"
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