<script setup lang="ts">
    import logo from "../public/assets/Stockify.svg"

    const items = [
        {
            prependIcon: 'mdi-clock-outline',
            title: 'recipe with chicken',
        },
        {
            prependIcon: 'mdi-clock-outline',
            title: 'best hiking trails near me',
        },
        {
            prependIcon: 'mdi-clock-outline',
            title: 'how to learn a new language',
        },
        {
            prependIcon: 'mdi-clock-outline',
            title: 'DIY home organization ideas',
        },
        {
            prependIcon: 'mdi-clock-outline',
            title: 'latest fashion trends',
        },
    ];
</script>

<template>
    <div class="d-flex flex-column">
        <v-row class="d-flex justify-space-between align-center mb-1 pt-3 px-3">
            <div class="logo">
                <v-col 
                    cols="12"
                    class="pl-0"
                >
                    <v-img
                        :width="207"
                        :height="61"
                        :src="logo"
                    ></v-img>
                </v-col>
            </div>
            <v-autocomplete
                :items="items"
                density="comfortable"
                menu-icon=""
                placeholder="pesquise..."
                append-inner-icon="mdi-magnify"
                style="max-width: 377px;"
                theme="light"
                variant="solo"
                item-props
                rounded
            ></v-autocomplete>
        </v-row>
        <v-divider class="mb-8"></v-divider>
    </div>
</template>

<style scoped>
    .search {
        background-color: #D9D9D9;
        max-width: 377px;
        width: 377px;
        height: 31px;
    }
</style>