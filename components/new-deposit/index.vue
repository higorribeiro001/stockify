<script setup lang="ts">
interface NewDeposit {
    loadDeposits: () => void;
}

import { setAddress } from '~/services/api/address';
import { setDeposit } from '~/services/api/deposit';
import { getAddress, getCities, getLocation, getUf } from '~/services/api/locations';

const props = defineProps<NewDeposit>();

const dialog = ref(false);

const orange = '#FF6A00';

const itemsUf = ref([{}]);
const itemsCity = ref([{}]);

const location = ref({
    latitude: null,
    longitude: null
})

const snackbar = ref({
    active: false,
    text: ''
});

const isLoading = ref(false);

const newDeposit = ref([
    {
        label: 'Nome*',
        type: 'text',
        name: 'depositName',
        value: '',
        error: ''
    },
    {
        label: 'Limite*',
        type: 'text',
        name: 'limit',
        value: '',
        error: ''
    },
    {
        label: 'País*',
        type: 'text',
        name: 'country',
        value: 'Brasil',
        error: ''
    },
    {
        label: 'Estado*',
        type: 'select',
        name: 'uf',
        value: '',
        error: ''
    },
    {
        label: 'Cidade*',
        type: 'select',
        name: 'city',
        value: '',
        error: ''
    },
    {
        label: 'CEP*',
        type: 'text',
        name: 'cep',
        value: '',
        error: ''
    },
    {
        label: 'Endereço*',
        type: 'text',
        name: 'addressValue',
        value: '',
        error: ''
    },
    {
        label: 'Bairro*',
        type: 'text',
        name: 'neighborhood',
        value: '',
        error: ''
    },
]);

const showErrors = ref(false);

const validateField = (index: number) => {
    const field = newDeposit.value[index];
    switch (field.name) {
        case 'depositName':
            field.error = field.value.length >= 2 ? '' : 'Nome deve ter pelo menos 2 caracteres.';
            break;
        case 'limit':
            field.error = parseFloat(field.value) > 0 ? '' : 'Limite deve ser maior que 0.';
            break;
        case 'addressValue':
            field.error = field.value.length >= 3 && field.value.length <= 255 
                ? '' 
                : 'Endereço deve ter entre 3 e 255 caracteres.';
            break;
        case 'cep':
            field.error = field.value.length >= 3 && field.value.length <= 9 
                ? '' 
                : 'CEP deve ter entre 3 e 9 caracteres.';
            break;
        case 'city':
            field.error = field.value.length >= 3 && field.value.length <= 200 
                ? '' 
                : 'Cidade deve ter entre 3 e 200 caracteres.';
            break;
        case 'neighborhood':
            field.error = field.value.length >= 3 && field.value.length <= 200 
                ? '' 
                : 'Bairro deve ter entre 3 e 200 caracteres.';
            break;
        case 'uf':
            field.error = field.value.length === 2 ? '' : 'Estado deve ter exatamente 2 caracteres.';
            break;
        case 'country':
            field.error = field.value.length >= 3 && field.value.length <= 120 
                ? '' 
                : 'País deve ter entre 3 e 120 caracteres.';
            break;
        default:
            field.error = '';
            break;
    }
};

const submitForm = async () => {
    let isValid = true;

    newDeposit.value.forEach((field, index) => {
        validateField(index);
        if (field.error) isValid = false;
    });

    if (isValid) {
        isLoading.value = true;
        try {
            const response = await setAddress({
                cep: newDeposit.value[5].value,
                addressValue: newDeposit.value[6].value,
                neighborhood: newDeposit.value[7].value,
                city: newDeposit.value[4].value,
                uf: newDeposit.value[3].value,
                country: newDeposit.value[2].value,
                latitude: location.value.latitude ?? 0,
                longitude: location.value.longitude ?? 0
            });

            if (response.status === 201) {
                const responseDeposit = await setDeposit({
                    depositName: newDeposit.value[0].value,
                    limit: parseInt(newDeposit.value[1].value),
                    isActive: true,
                    addressId: response.data['id'],
                });

                if (responseDeposit.status === 201) {
                    snackbar.value.active = true;
                    snackbar.value.text = 'Depósito cadastrado com sucesso.';
                    props.loadDeposits();
                    cancel();
                } 
            } 
        } catch {
            snackbar.value.active = true;
            snackbar.value.text = 'Algo deu errado. Tente novamente.';
        } finally {
            isLoading.value = false;
        }
    } 
};

const cancel = () => {
    dialog.value = false;
    for (var f of newDeposit.value) {
        f.value = '';
        f.error = '';
    }
    showErrors.value = false;
}

const searchUf = async () => {
    try {
        const response = await getUf();
        if (response.status === 200) {
            itemsUf.value = response.data;
        }
    } catch (error) {
        itemsUf.value = [];
    }
}

const searchCity = async (uf: string) => {
    try {
        const response = await getCities(uf);
        if (response.status === 200) {
            itemsCity.value = response.data;
        }
    } catch (error) {
        itemsCity.value = [];
    }
}

const searchCep = async (cep: string) => {
    try {
        const response = await getAddress(cep);
        if (response.status === 200) {
            newDeposit.value[6].value = response.data['logradouro'];
            newDeposit.value[7].value = response.data['bairro'];
        }
    } catch (error) {
        itemsCity.value = [];
    }
}

const searchLocation = async (cep: string) => {
    try {
        const response = await getLocation(cep);
        if (response.status === 200) {
            location.value.latitude = response.data['lat'];
            location.value.longitude = response.data['lng'];
        }
    } catch (error) {
        itemsCity.value = [];
    }
}

onMounted(() => {
    searchUf();
});

watch(() => newDeposit.value[2].value, () => {
    searchUf();
});

watch(() => newDeposit.value[3].value, (uf) => {
    searchCity(uf)
});

watch(() => newDeposit.value[5].value, (cep) => {
    searchCep(cep);
    searchLocation(cep);
});
</script>

<template>
    <v-snackbar
      v-model="snackbar.active"
      multi-line
    >
      {{ snackbar.text }}

      <template v-slot:actions>
        <v-btn
          color="red"
          variant="text"
          @click="snackbar.active = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <Loading 
        :active="isLoading"
    />
    <v-dialog
        v-model="dialog"
        max-width="600"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn 
                class="btn-new rounded-lg text-capitalize font-weight-black mb-6 w-lg-50 w-md-25 w-sm-100"
                :color="orange"
                prepend-icon="mdi-plus"
                v-bind="activatorProps"
            >
                Novo depósito
            </v-btn>
        </template>

        <form 
            ref="formRef"
        >
            <v-card
                title="Novo Depósito"
            >
                <v-card-text>
                    <v-row dense>
                        <v-col
                            cols="12"
                            md="6"
                            sm="6"
                            v-for="(d, index) in newDeposit" 
                            :key="index"
                        >
                            <v-text-field
                                v-if="d.type === 'text'"
                                :label="d.label"
                                v-model="d.value"
                                :name="d.name"
                                :error-messages="d.error"
                                @input="validateField(index)"
                            ></v-text-field>
                            <v-select
                                v-else
                                :items="d.name === 'uf' ? itemsUf : itemsCity"
                                :item-title="d.name === 'uf' ? 'sigla' : 'nome'"
                                :item-value="d.name === 'uf' ? 'sigla' : 'nome'"
                                :label="d.label"
                                v-model="d.value"
                                :name="d.name"
                                :error-messages="d.error"
                                @input="validateField(index)"
                            ></v-select>
                        </v-col>

                    </v-row>

                    <small class="text-caption text-medium-emphasis font-weight-bold">*Campos obrigatórios</small>
                </v-card-text>

                <v-card-actions class="d-flex justify-space-between pb-7">
                    <v-btn
                        class="rounded-lg text-uppercase font-weight-black ml-5"
                        color="#FF6A00"
                        @click="submitForm"
                    >
                        Cadastrar
                    </v-btn>

                    <v-btn
                        class="rounded-lg text-uppercase font-weight-black mr-5"
                        @click="cancel"
                    >
                        Cancelar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </form>
    </v-dialog>
</template>

<style scoped>
    * {
        font-family: "JetBrains Mono", monospace;
    }
</style>