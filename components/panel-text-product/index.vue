<script setup lang="ts">
interface Product {
    id: number;
    name: string;
    blobImage: string;
    isActive: boolean;
    isPurchased : boolean;
    categoryId: number;
    category: {
        nameCategory: string;
    };
    description: string;
    depositId: number;
    deposit: {
        depositName: string;
        limit: number;
    }
    price: number;
    deposits: Deposit[];
    categories: Category[];
    itemsProducts: ItemProduct[];
    loadProducts: () => void;
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
            <p class="text-subtitle-2 font-weight-regular">{{ props.deposit.depositName }}</p>
        </div>
        <div class="d-flex flex-row ga-2">
            <h3 class="text-subtitle-2 font-weight-medium">Preço:</h3>
            <p class="text-subtitle-2 font-weight-regular">R$ {{ String(props.price.toFixed(2)).replace('.', ',') }}</p>
        </div>
        <div class="d-flex justify-center w-100">
            <div class="d-flex flex-row ga-2 justify-space-between mt-4 pb-1">
                <EditProduct 
                    :id="props.id"
                    :name="props.name"
                    :blob_image="props.blobImage"
                    :category_id="props.categoryId"
                    :is_active="props.isActive"
                    :is_purchased="props.isPurchased"
                    :description="props.description"
                    :deposit_id="props.depositId"
                    :deposit="$props.deposit"
                    :price="props.price"
                    :category="props.category"
                    :deposits="props.deposits"
                    :categories="props.categories"
                    :itemsProducts="props.itemsProducts"
                    :loadProducts="props.loadProducts"
                />
                <RemoveProduct 
                    :id="props.id"
                    :loadProducts="props.loadProducts"
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