<script setup lang="ts">
  interface Deposit {
    deposit_name: string;
    limit: number;
    is_active: boolean;
    address_id: number;
    cep: string;
    address: string;
    neighborhood: string;
    city: string;
    uf: string;
    country: string;
    latitude: number;
    longitude: number;
  }

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

  import Navbar from '../components/navbar/index.vue';
  import PanelTitleDeposit from '../components/panel-title-deposit/index.vue';
  import PanelTextDeposit from '../components/panel-text-deposit/index.vue';
  import PanelTitleProduct from '../components/panel-title-product/index.vue';
  import PanelTextProduct from '../components/panel-text-product/index.vue';
  import NewDeposit from '../components/new-deposit/index.vue';
  import NewProduct from '../components/new-product/index.vue';
  import imageExample from '../public/assets/image-example.svg';

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
  const value = [
    423,
    446,
    675,
    510,
    590,
    610,
    760,
  ];
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
    },
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

  const products: Product[] = [
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
    {
      name: 'Produto 1',
      blob_image: imageExample,
      description: 'Lorem ipsum dolor sit amet.',
      category_id: 1,
      category: 'Serviços digitais',
      is_active: true,
      is_purchased: true,
      deposit_id: 1,
      deposit: 'Depósito 1',
      price: 40.00
    },
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
                              :model-value="value"
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

                    </div>
                  </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="deposits">
                  <div class="d-flex flex-lg-row flex-column">
                    <v-col
                      cols="lg:6 md:6 sm:12"
                    >
                      <div class="area-map" style="height: 580px;">

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
                              <PanelTitleDeposit 
                                :deposit_name="deposit.deposit_name"
                                :is_active="deposit.is_active"
                                :limit="deposit.limit"
                              />
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                              <PanelTextDeposit 
                                :deposit_name="deposit.deposit_name"
                                :is_active="deposit.is_active"
                                :limit="deposit.limit"
                                :address_id="deposit.address_id"
                                :address="deposit.address"
                                :cep="deposit.cep"
                                :neighborhood="deposit.neighborhood"
                                :city="deposit.city"
                                :uf="deposit.uf"
                                :country="deposit.country"
                                :latitude="deposit.latitude"
                                :longitude="deposit.longitude"
                              />
                            </v-expansion-panel-text>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </v-col>
                  </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="products">
                  <div class="d-flex">
                    <div class="products">
                        <NewProduct />
                        <v-expansion-panels
                          :readonly="readonly"
                          multiple
                        >
                          <v-container 
                            class="px-4 sm:px-0"
                            fluid
                          >
                            <v-row>
                              <v-col 
                                v-for="(product, index) in products" 
                                class="pr-lg-5 px-md-2 px-0"
                                :key="index"
                                cols="12" 
                                md="6"
                              >
                                <v-expansion-panel>
                                  <v-expansion-panel-title>
                                    <PanelTitleProduct 
                                      :name="product.name"
                                      :blob_image="product.blob_image"
                                      :is_active="product.is_active"
                                      :category="product.category"
                                      :category_id="product.category_id"
                                    />
                                  </v-expansion-panel-title>
                                  <v-expansion-panel-text>
                                    <PanelTextProduct 
                                      :name="product.name"
                                      :blob_image="product.blob_image"
                                      :is_active="product.is_active"
                                      :is_purchased="product.is_purchased"
                                      :category="product.category"
                                      :category_id="product.category_id"
                                      :deposit_id="product.deposit_id"
                                      :deposit="product.deposit"
                                      :description="product.description"
                                      :price="product.price"
                                    />
                                  </v-expansion-panel-text>
                                </v-expansion-panel>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-expansion-panels>
                      </div>
                  </div>
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

  .area-dashboard {
    max-height: 580px;
  }

  .logo {
    width: 207px;
    height: 68px;
  }

  .area-map {
    min-height: 300px;
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

  .products {
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

  .list-products {
    display: flex;
    flex-wrap: wrap;
  }
</style>

