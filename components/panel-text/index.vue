<script setup lang="ts">
    interface Deposit {
        address_id: number,
        cep: string,
        address: string,
        neighborhood: string,
        city: string,
        uf: string,
        country: string
    }

    const props = defineProps<Deposit>()
</script>

<template>
    <div class="d-flex flex-column">
        <v-divider class="mb-2"></v-divider>
        <h3 class="text-subtitle-2 font-weight-bold mb-1">Endereço</h3>
        <p class="text-subtitle-2 font-weight-regular">{{ props.cep }}</p>
        <p class="text-subtitle-2 font-weight-regular">{{ props.address }}</p>
        <p class="text-subtitle-2 font-weight-regular">{{ props.neighborhood }}</p>
        <p class="text-subtitle-2 font-weight-regular">{{ props.city }}</p>
        <p class="text-subtitle-2 font-weight-regular">{{ props.country }}</p>
        <div class="d-flex justify-center w-100">
            <div class="d-flex flex-row justify-space-between mt-4 pb-1 w-50 md:w-100 sm:w-100">
                <v-btn 
                    class="btn-expanded rounded-lg text-capitalize font-weight-black"
                    color="#4CAF50"
                    prepend-icon="mdi-pencil"
                    elevation="0"
                >
                    Editar
                </v-btn>
                <v-btn 
                    class="btn-expanded rounded-lg text-capitalize font-weight-black"
                    color="#FF1616"
                    prepend-icon="mdi-trash-can"
                    elevation="0"
                >
                    Excluir
                </v-btn>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .btn-expanded {
        width: 112px;
        height: 31px;
    }
</style>