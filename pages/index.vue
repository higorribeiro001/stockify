<script setup lang="ts">
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
const value = ref<Array<number>>([]);
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

const defineValues = async () => {
  var prod: Product[] = await getProducts();
  let productFilter = prod.filter((item) => {
    return item.isPurchased === true
  });

  if (productFilter.length > 7) {
    for (var l of productFilter.slice(-7)) {
      value.value.push(l.price);
    }
  } else {
    for (var l of productFilter) {
      value.value.push(l.price);
    }
  }
}

const listCategories = async () => {
    categories.value = await getCategories();
}

const filterDeposits = async (name: string) => {
  let depositFilter = deposits.value.filter((item) => {
    return name === item.depositName
  });

  deposits.value = depositFilter;
}

const filterProducts = async (name: string) => {
  if (name === '') {
    listProducts();
  }
  let productFilter = products.value.filter((item) => {
    return name === item.name
  });

  products.value = productFilter;
}

onMounted(() => {
    listDeposits();
    listCategories();
    listProducts();
    defineValues();
});
</script>

<template>
    <div class="app">
      <Navbar
        v-if="deposits.length > 0 && products.length" 
        :deposits="deposits"
        :products="products"
        :filter-deposits="filterDeposits"
        :filter-products="filterProducts"
        :load-products="listProducts"
        :load-deposits="listDeposits"
      />
      <Navbar
        v-else 
        :deposits="deposits"
        :products="products"
        :filter-deposits="filterDeposits"
        :filter-products="filterProducts"
        :load-products="listProducts"
        :load-deposits="listDeposits"
      />
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
                  <TabContentMain 
                    v-if="deposits.length > 0"
                    :value="value"
                    :deposits="deposits!"
                  />
                  <div 
                    v-else 
                    class="d-flex w-100 h-100 justify-center align-center"
                  >
                    <h2 style="margin-top: 120px;">Bem-vindo, cadastre depósitos e produtos para que possa ser exibido o dashboard.</h2>
                  </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="deposits">
                  <div class="d-flex flex-lg-row flex-column">
                    <v-col
                      cols="lg:6 md:6 sm:12"
                    >
                      <MapApp 
                        v-if="deposits.length > 0"
                        :deposits="deposits"
                      />
                      <div 
                        v-else 
                      >
                        <h2>Nenhum depósito encontrado.</h2>
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
                                :load-products="listProducts"
                              />
                            </v-expansion-panel-text>
                          </v-expansion-panel>
                        </v-expansion-panels>
                      </div>
                    </v-col>
                  </div>
                </v-tabs-window-item>

                <v-tabs-window-item value="products">
                  <div class="d-flex w-100">
                    <div class="products w-100">
                        <div class="d-flex flex-lg-row flex-sm-column justify-sm-between ga-1 w-100">
                          <NewProduct 
                            :items-products="itemsProducts"
                            :categories="categories"
                            :deposits="deposits"
                            :load-products="listProducts"
                          />
                          <NewCategory 
                            :load-categories="listCategories"
                          />
                        </div>
                        <div 
                          v-if="products.length > 0"
                          class="d-flex flex-lg-wrap w-100"
                        >
                          <v-expansion-panels
                            :readonly="readonly"
                            multiple
                          >
                              <v-row>
                                <v-col 
                                  v-for="(product, index) in products" 
                                  class="pr-lg-5 px-md-2 px-3 pl-lg-4"
                                  style="max-width: 600px;"
                                  :key="index"
                                  cols="12" 
                                >
                                  <v-expansion-panel>
                                    <v-expansion-panel-title>
                                      <PanelTitleProduct 
                                        :name="product.name"
                                        :blob_image="product.blobImage"
                                        :is_active="product.isActive"
                                        :category_id="product.categoryId"
                                        :nameCategory="product.category?.nameCategory"
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
                                        :categories="categories"
                                        :deposits="deposits"
                                        :items-products="itemsProducts"
                                        :load-products="listProducts"
                                      />
                                    </v-expansion-panel-text>
                                  </v-expansion-panel>
                                </v-col>
                              </v-row>
                          </v-expansion-panels>
                        </div>
                        <div 
                          v-else 
                        >
                          <h2>Nenhum produto encontrado.</h2>
                        </div>
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

