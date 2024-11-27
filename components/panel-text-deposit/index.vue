<script setup lang="ts">
    import EditDeposit from '../edit-deposit/index.vue';
    import RemoveDeposit from '../remove-deposit/index.vue';

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
            <div class="d-flex flex-row ga-2 justify-space-between mt-4 pb-1">
                <EditDeposit 
                    :deposit_name="props.deposit_name"
                    :limit="props.limit"
                    :is_active="props.is_active"
                    :address_id="props.address_id"
                    :address="props.address"
                    :cep="props.cep"
                    :neighborhood="props.neighborhood"
                    :city="props.city"
                    :uf="props.uf"
                    :country="props.country"
                    :latitude="props.latitude"
                    :longitude="props.longitude"
                />
                <RemoveDeposit />
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