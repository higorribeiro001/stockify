<script setup lang="ts">
    interface Deposit {
        depositName: string,
        limit: number,
        isActive: boolean,
    }

    import ballActive from '../public/assets/ball-active.svg';
    import ballInactive from '../public/assets/ball-inactive.svg';

    const props = defineProps<Deposit>()
</script>

<template>
    <div class="d-flex flex-column">
        <h2 
            class="title-deposit text-subtitle-1 font-weight-bold"
        >
            {{ props.depositName }}
        </h2>
        <div class="d-flex flex-row justify-start align-center ga-1">
            <div class="ball">
                <v-img
                    class="ball"
                    :width="9"
                    :height="9"
                    :src="props.isActive ? ballActive : ballInactive"
                />
            </div>
            <h3 class="text-subtitle-2 font-weight-medium">{{ props.isActive ? 'ativo' : 'inativo' }}</h3>
        </div>
        <div class="d-flex flex-row ga-2">
            <h3 class="text-subtitle-2 font-weight-medium">Limite:</h3>
            <h3 class="text-subtitle-2 font-weight-medium">{{ props.limit }}</h3>
        </div>
    </div>
</template>

<style scoped>
    .title-deposit {
        color: #FF6A00;
    }
</style>