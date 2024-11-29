<script setup lang="ts">
interface MainContent {
    value: Array<number>;
    deposits: DepositComplete[];
}

const props = defineProps<MainContent>();
</script>

<template>
    <div class="area-dashboard d-flex flex-lg-row flex-column ga-10">
        <div class="w-lg-50 w-sm-100">
            <v-card
                class="mx-auto text-center"
                color="white"
                elevation="0"
            >
                <v-card-text class="pa-0">
                    <div class="text-lg-h4 text-sm-h5 font-weight-thin text-left">
                        Vendas nas últimas 24 horas
                    </div>
                </v-card-text>  
                <v-card-text class="pa-0">
                    <v-sheet
                        class="rounded-lg border-sm" 
                        color="white"
                    >
                        <v-sparkline
                            :model-value="props.value"
                            color="#00c6ff"
                            height="170"
                            padding="24"
                            stroke-linecap="round"
                            smooth
                        >
                            <template v-slot:label="item">
                                R${{ item.value }}
                            </template>
                        </v-sparkline>
                    </v-sheet>
                </v-card-text>
            </v-card>
        </div>
        <div class="area-map w-lg-50 w-sm-100">
            <MapApp 
                :deposits="props.deposits"
            />
        </div>
    </div>
</template>