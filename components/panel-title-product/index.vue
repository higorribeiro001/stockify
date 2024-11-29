<script setup lang="ts">
    interface Product {
        name: string;
        blob_image: string;
        category_id : number;
        nameCategory: string;
        is_active: boolean;
    }

    import ballActive from '../public/assets/ball-active.svg';
    import ballInactive from '../public/assets/ball-inactive.svg';
    import imageEx from '../public/assets/image-example.svg';

    const props = defineProps<Product>()
</script>

<template>
    <div class="d-flex ga-3">
        <div 
            class="py-0 pl-0"
        >
            <v-img
                :width="70"
                :height="70"
                :src="props.blob_image ? props.blob_image : imageEx"
            ></v-img>
        </div>
        <v-col class="d-flex flex-column pa-0">
            <h2 
                class="title-product text-subtitle-1 font-weight-bold"
            >
                {{ props.name }}
            </h2>
            <div class="d-flex flex-row justify-start align-center ga-1">
                <div class="ball">
                    <v-img
                        class="ball"
                        :width="9"
                        :height="9"
                        :src="props.is_active ? ballActive : ballInactive"
                    />
                </div>
                <h3 class="text-subtitle-2 font-weight-medium">{{ props.is_active ? 'ativo' : 'inativo' }}</h3>
            </div>
            <div class="d-flex flex-row ga-2">
                <h3 class="text-subtitle-2 font-weight-medium">Categoria:</h3>
                <h3 class="text-subtitle-2 font-weight-medium">{{ props.nameCategory }}</h3>
            </div>
        </v-col>
    </div>
</template>

<style scoped>
    .title-product {
        color: #FF6A00;
    }
</style>