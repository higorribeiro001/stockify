<script setup lang="ts">
interface Map {
    deposits: DepositComplete[]
}

const props = defineProps<Map>();
</script>

<template>
    <div class="area-map" style="height: 580px; max-height: 580px;">
        <LMap
            style="height: 580px; max-height: 580px; border-radius: 10px;"
            :zoom="15"
            :center="[props.deposits[0]?.address!.latitude, props.deposits[0]?.address!.longitude]"
            :use-global-leaflet="false"
        >
            <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="Stockify"
            />
            <LMarker 
                v-for="(m) in props.deposits" 
                :lat-lng="[m.address!.latitude, m.address!.longitude]"
            >
                <LIcon>
                    <div 
                        class="d-flex flex-column rounded-lg elevation-4 bg-white" 
                        style="width: 182px; padding: 9px 18px;"
                    >
                        <h2 style="color: #FF6A00;">{{ m.depositName }}</h2>
                        <div class="d-flex flex-row ga-2">
                            <h3 class="text-subtitle-2 font-weight-medium">Status:</h3>
                            <h3 class="text-subtitle-2 font-weight-medium">{{ m.isActive ? 'ativo' : 'inativo' }}</h3>
                        </div>
                        <div class="d-flex flex-row ga-2">
                            <h3 class="text-subtitle-2 font-weight-medium">Limite:</h3>
                            <h3 class="text-subtitle-2 font-weight-regular">{{ m.limit }}</h3>
                        </div>
                    </div>
                </LIcon>
            </LMarker>
        </LMap>
    </div>
</template>