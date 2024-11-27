<script setup lang="ts">
  interface Deposit {
    deposit_name: string,
    limit: number,
    is_active: boolean,
    address_id: number,
    cep: string,
    address: string,
    neighborhood: string,
    city: string,
    uf: string,
    country: string,
    latitude: number,
    longitude: number
  }

  import Navbar from '../components/navbar/index.vue';
  import PanelTitle from '../components/panel-title/index.vue';
  import PanelText from '../components/panel-text/index.vue';
  import NewDeposit from '../components/new-deposit/index.vue';

  const orange = '#FF6A00';
  const tab = ref('main');
  const tabs = [{
    text: 'Principal',
    value: 'main'
  }, 
  {
    text: 'Depósitos',
    value: 'deposits'
  }, 
  {
    text: 'Produtos',
    value: 'products'
  }];
  const panel = ref([0, 1]);
  const readonly = ref(false);
  const deposits: Deposit[] = [
    {
      deposit_name: 'Depósito 1',
      limit: 60,
      is_active: true,
      address_id: 1,
      cep: "68628-582",
      address: "Rua Rubens Braga",
      neighborhood: "JK",
      city: "Paragominas",
      uf: "PA",
      country: "Brasil",
      latitude: -2.9760732,
      longitude: -47.3656384
    },
    {
      deposit_name: 'Depósito 2',
      limit: 60,
      is_active: true,
      address_id: 1,
      cep: "68628-582",
      address: "Rua Rubens Braga",
      neighborhood: "JK",
      city: "Paragominas",
      uf: "PA",
      country: "Brasil",
      latitude: -2.9760732,
      longitude: -47.3656384
    },
    {
      deposit_name: 'Depósito 3',
      limit: 60,
      is_active: true,
      address_id: 1,
      cep: "68628-582",
      address: "Rua Rubens Braga",
      neighborhood: "JK",
      city: "Paragominas",
      uf: "PA",
      country: "Brasil",
      latitude: -2.9760732,
      longitude: -47.3656384
    },
    {
      deposit_name: 'Depósito 4',
      limit: 60,
      is_active: true,
      address_id: 1,
      cep: "68628-582",
      address: "Rua Rubens Braga",
      neighborhood: "JK",
      city: "Paragominas",
      uf: "PA",
      country: "Brasil",
      latitude: -2.9760732,
      longitude: -47.3656384
    },
    {
      deposit_name: 'Depósito 5',
      limit: 60,
      is_active: false,
      address_id: 1,
      cep: "68628-582",
      address: "Rua Rubens Braga",
      neighborhood: "JK",
      city: "Paragominas",
      uf: "PA",
      country: "Brasil",
      latitude: -2.9760732,
      longitude: -47.3656384
    }
  ];
</script>

<template>
    <div class="app">
      <Navbar />
      <v-card class="elevation-0">
          <v-tabs
            class="mb-2"
            v-model="tab"
            bg-color="white"
          >
            <v-tab 
              v-for="(t) in tabs"
              class="text-capitalize text-subtitle-1 font-weight-bold"
              :value="t.value"
              :color="orange"
              base-color="#7D7D7D"
              width="104"
            >
              {{ t.text }}
            </v-tab>
          </v-tabs>
          
          <v-card-text class="pa-0 py-5">
            <v-tabs-window v-model="tab">
                <v-tabs-window-item 
                  value="main"
                >
                    One
                </v-tabs-window-item>

                <v-tabs-window-item value="deposits">
                  <div class="d-flex flex-lg-row flex-column">
                      <v-col
                        cols="lg:6 md:6 sm:12"
                      >
                        <div class="area-map">

                        </div>
                      </v-col>
                      <v-col
                        cols="lg:6 md:6 sm:12"
                      >
                        <div class="deposits">
                          <NewDeposit />
                          <v-expansion-panels
                            :readonly="readonly"
                            multiple
                          >
                            <v-expansion-panel v-for="(deposit, index) in deposits">
                              <v-expansion-panel-title>
                                <PanelTitle 
                                  :deposit_name="deposit.deposit_name"
                                  :is_active="deposit.is_active"
                                  :limit="deposit.limit"
                                />
                              </v-expansion-panel-title>
                              <v-expansion-panel-text>
                                <PanelText 
                                  :address_id="deposit.address_id"
                                  :address="deposit.address"
                                  :cep="deposit.cep"
                                  :neighborhood="deposit.neighborhood"
                                  :city="deposit.city"
                                  :uf="deposit.uf"
                                  :country="deposit.country"
                                />
                              </v-expansion-panel-text>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </div>
                      </v-col>
                    </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="products">
                    Three
                </v-tabs-window-item>
            </v-tabs-window>
          </v-card-text>
      </v-card>
    </div>
</template>

<style scoped>
  * {
    font-family: "JetBrains Mono", monospace;
  }

  .app {
    font-weight: 700;
    font-size: 16px;
    padding: 23px 33px;
  }

  .logo {
    width: 207px;
    height: 68px;
  }

  .area-map {
    height: 556px;
    border-radius: 10px;
    background-color: aqua;
  }

  .deposits {
    display: flex;
    flex-direction: column;
    padding-left: 2px;
    padding-right: 2px;
    padding-bottom: 2px;
  }

  .btn-new {
    width: 165px;
    max-height: 61px;
  }
</style>

