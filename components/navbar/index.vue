<script setup lang="ts">
import logo from "../public/assets/Stockify.svg"

interface Item {
    prependIcon: string,
    title: string,
};

interface Navbar {
    deposits: DepositComplete[];
    products: Product[];
    filterDeposits: (value: string) => void;
    filterProducts: (value: string) => void;
    loadProducts: () => void;
    loadDeposits: () => void;
}

const props = defineProps<Navbar>()

const items = ref<Item[]>([]);
const icon = 'mdi-clock-outline';

const search = ref('');

const loadListItems = () => {
    for (var d of props.deposits) {
        items.value.push(
            {
                prependIcon: icon,
                title: d.depositName
            }
        )
    }

    for (var p of props.products) {
        items.value.push(
            {
                prependIcon: icon,
                title: p.name
            }
        )
    }
}

onMounted(() => {
    loadListItems();
})

watch(() => search.value, (newSearch) => {
    if (newSearch === null) {
        props.loadDeposits();
        props.loadProducts();
    } 
    props.filterDeposits(newSearch);
    props.filterProducts(newSearch);
})
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
                v-model="search"
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
                item-text="title"    
                item-value="title"
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