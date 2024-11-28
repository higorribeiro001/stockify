<script setup lang="ts">
    import EditDeposit from '../edit-deposit/index.vue';
    import RemoveDeposit from '../remove-deposit/index.vue';

    interface Deposit {
        id: number;
        depositName: string;
        limit: number;
        isActive: boolean;
        addressId: number;
        cep: string;
        addressValue: string;
        neighborhood: string;
        city: string;
        uf: string;
        country: string;
        latitude: number;
        longitude: number;
        loadDeposits: () => void;
    }

    const props = defineProps<Deposit>()
</script>

<template>
    <div class="d-flex flex-column">
        <v-divider class="mb-2"></v-divider>
        <h3 class="text-subtitle-2 font-weight-bold mb-1">Endereço</h3>
        <p class="text-subtitle-2 font-weight-regular">{{ props.cep }}</p>
        <p class="text-subtitle-2 font-weight-regular">{{ props.addressValue }}</p>
        <p class="text-subtitle-2 font-weight-regular">{{ props.neighborhood }}</p>
        <p class="text-subtitle-2 font-weight-regular">{{ props.city }}</p>
        <p class="text-subtitle-2 font-weight-regular">{{ props.country }}</p>
        <div class="d-flex justify-center w-100">
            <div class="d-flex flex-row ga-2 justify-space-between mt-4 pb-1">
                <EditDeposit 
                    :id="props.id"
                    :depositName="props.depositName"
                    :limit="props.limit"
                    :isActive="props.isActive"
                    :addressId="props.addressId"
                    :addressValue="props.addressValue"
                    :cep="props.cep"
                    :neighborhood="props.neighborhood"
                    :city="props.city"
                    :uf="props.uf"
                    :country="props.country"
                    :latitude="props.latitude"
                    :longitude="props.longitude"
                    :loadDeposits="props.loadDeposits"
                />
                <RemoveDeposit 
                    :id="props.id"
                    :addressId="props.addressId"
                    :loadDeposits="props.loadDeposits"
                />
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