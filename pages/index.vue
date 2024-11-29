<script setup lang="ts">
import Navbar from '../components/navbar/index.vue';
import PanelTitleDeposit from '../components/panel-title-deposit/index.vue';
import PanelTextDeposit from '../components/panel-text-deposit/index.vue';
import PanelTitleProduct from '../components/panel-title-product/index.vue';
import PanelTextProduct from '../components/panel-text-product/index.vue';
import NewDeposit from '../components/new-deposit/index.vue';
import NewProduct from '../components/new-product/index.vue';
import { getDeposits } from '~/services/api/deposit';
import { getCategories } from '~/services/api/category';
import { getProducts } from '~/services/api/product';

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
const deposits = ref<DepositComplete[]>([]);
const categories = ref<Category[]>([]);
const itemsProducts: ItemProduct[] = [
  {
      label: 'IPhone',
      value: '/assets/products/iphone.jpg'
  },
  {
      label: 'Celular Samsung',
      value: '/assets/products/samsung.jpg'
  },
  {
      label: 'Pc Gamer',
      value: '/assets/products/pc-gamer.jpg'
  },
  {
      label: 'Pc Dell',
      value: '/assets/products/pc-dell.jpg'
  },
  {
      label: 'PS5',
      value: '/assets/products/ps5.jpg'
  },
  {
      label: 'Carro 1',
      value: '/assets/products/carro1.jpg'
  },
  {
      label: 'Camaro',
      value: '/assets/products/camaro.jpg'
  }
];

const products = ref<Product[]>([]);

const listDeposits = async () => {
    deposits.value = await getDeposits();
};

const listProducts = async () => {
    products.value = await getProducts();
};

const listCategories = async () => {
    categories.value = await getCategories();
}

onMounted(() => {
    listDeposits();
    listCategories();
    listProducts();
});
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
                        <NewDeposit 
                          :load-deposits="listDeposits"
                        />
                        <v-expansion-panels
                          :readonly="readonly"
                          multiple
                        >
                          <v-expansion-panel 
                            :key="index"
                            v-for="(deposit, index) in deposits" 
                          >
                            <v-expansion-panel-title>
                              <PanelTitleDeposit 
                                :depositName="deposit.depositName"
                                :isActive="deposit.isActive"
                                :limit="deposit.limit"
                              />
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                              <PanelTextDeposit 
                                :id="deposit.id"
                                :depositName="deposit.depositName"
                                :isActive="deposit.isActive"
                                :limit="deposit.limit"
                                :addressId="deposit.addressId"
                                :addressValue="deposit.address.addressValue"
                                :cep="deposit.address.cep"
                                :neighborhood="deposit.address.neighborhood"
                                :city="deposit.address.city"
                                :uf="deposit.address.uf"
                                :country="deposit.address.country"
                                :latitude="deposit.address.latitude"
                                :longitude="deposit.address.longitude"
                                :load-deposits="listDeposits"
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
                        <div class="d-flex flex-lg-row flex-sm-column ga-3 w-100">
                          <NewProduct 
                            :items-products="itemsProducts"
                            :categories="categories"
                            :deposits="deposits"
                            :load-products="() => {}"
                          />
                          <NewCategory 
                            :load-categories="() => {}"
                          />
                        </div>
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
                                      :blob_image="product.blobImage"
                                      :is_active="product.isActive"
                                      :category_id="product.categoryId"
                                      :category="product.category"
                                    />
                                  </v-expansion-panel-title>
                                  <v-expansion-panel-text>
                                    <PanelTextProduct 
                                      :id="product.id"
                                      :name="product.name"
                                      :blobImage="product.blobImage"
                                      :isActive="product.isActive"
                                      :isPurchased="product.isPurchased"
                                      :categoryId="product.categoryId"
                                      :category="product.category"
                                      :depositId="product.depositId"
                                      :deposit="product.deposit"
                                      :description="product.description"
                                      :price="product.price"
                                      :load-products="listProducts"
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

