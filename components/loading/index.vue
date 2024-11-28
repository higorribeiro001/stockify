<script setup lang="ts">
    interface Loading {active: boolean}

    const orange = '#FF6A00';
    const props = defineProps<Loading>()
</script>

<template>
    <v-dialog
        v-model="props.active"
        max-width="200"
    >
        <div class="d-flex flex-column align-center pa-8 rounded-lg bg-white">
            <v-progress-circular
                :color="orange"
                indeterminate
            ></v-progress-circular>
            <p class="mt-4">
                Carregando...
            </p>
        </div>
    </v-dialog>
</template>

<style scoped>
  * {
    font-family: "JetBrains Mono", monospace;
  }
</style>