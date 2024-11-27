<script setup lang="ts">
    import EditProduct from '../edit-product/index.vue';
    import RemoveProduct from '../remove-product/index.vue';

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
</script>

<template>
    <div class="d-flex flex-column">
        <v-divider class="mb-2"></v-divider>
        <div class="d-flex flex-row ga-2">
            <h3 class="text-subtitle-2 font-weight-medium">Descrição:</h3>
            <p class="text-subtitle-2 font-weight-regular">{{ props.description }}</p>
        </div>   
        <div class="d-flex flex-row ga-2">
            <h3 class="text-subtitle-2 font-weight-medium">Depósito:</h3>
            <p class="text-subtitle-2 font-weight-regular">{{ props.deposit }}</p>
        </div>
        <div class="d-flex flex-row ga-2">
            <h3 class="text-subtitle-2 font-weight-medium">Preço:</h3>
            <p class="text-subtitle-2 font-weight-regular">{{ props.price }}</p>
        </div>
        <div class="d-flex justify-center w-100">
            <div class="d-flex flex-row ga-2 justify-space-between mt-4 pb-1">
                <EditProduct 
                    :name="props.name"
                    :blob_image="props.blob_image"
                    :category_id="props.category_id"
                    :category="props.category"
                    :is_active="props.is_active"
                    :is_purchased="props.is_purchased"
                    :description="props.description"
                    :deposit_id="props.deposit_id"
                    :deposit="props.deposit"
                    :price="props.price"
                />
                <RemoveProduct />
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