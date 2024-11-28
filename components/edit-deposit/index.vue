<script setup lang="ts">
import { putAddress } from '~/services/api/address';
import { putDeposit } from '~/services/api/deposit';
import { getAddress, getCities, getLocation, getUf } from '~/services/api/locations';

interface Deposit {
    id: number;
    depositName: string;
    limit: number;
    isActive: boolean;
    addressId: number;
    cep: string;
    addressValue: string;
    neighborhood: string;
    city: string;
    uf: string;
    country: string;
    latitude: number;
    longitude: number;
    loadDeposits: () => void;
}

const props = defineProps<Deposit>()

const dialog = ref(false);

const snackbar = ref({
    active: false,
    text: ''
});

const itemsUf = ref([{}]);
const itemsCity = ref([{}]);
const itemsActive = ref(
    [
        {
            label: "Sim",
            value: true
        },
        {
            label: "Não",
            value: false
        }
    ]
);

const isLoading = ref(false);

const editDeposit = ref([
    {
        label: 'Nome*',
        type: 'text',
        name: 'depositName',
        value: props.depositName,
        error: ''
    },
    {
        label: 'Limite*',
        type: 'text',
        name: 'limit',
        value: String(props.limit),
        error: ''
    },
    {
        label: 'País*',
        type: 'text',
        name: 'country',
        value: props.country,
        error: ''
    },
    {
        label: 'Estado*',
        type: 'select',
        name: 'uf',
        value: props.uf,
        error: ''
    },
    {
        label: 'Cidade*',
        type: 'select',
        name: 'city',
        value: props.city,
        error: ''
    },
    {
        label: 'CEP*',
        type: 'text',
        name: 'cep',
        value: props.cep,
        error: ''
    },
    {
        label: 'Endereço*',
        type: 'text',
        name: 'addressValue',
        value: props.addressValue,
        error: ''
    },
    {
        label: 'Bairro*',
        type: 'text',
        name: 'neighborhood',
        value: props.neighborhood,
        error: ''
    },
    {
        label: 'Ativo*',
        type: 'select',
        name: 'isActive',
        value: props.isActive ? 'Sim' : 'Não',
        error: ''
    },
    {
        label: 'Latitude*',
        type: 'text',
        name: 'latitude',
        value: String(props.latitude) || '',
        error: ''
    },
    {
        label: 'Longitude*',
        type: 'text',
        name: 'longitude',
        value: String(props.longitude) || '',
        error: ''
    },
]);

const showErrors = ref(false);

const validateField = (index: number) => {
    const field = editDeposit.value[index];
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

    isLoading.value = true;

    editDeposit.value.forEach((field, index) => {
        validateField(index);
        if (field.error) isValid = false;
    });

    if (isValid) {
        try {
            const response = await putAddress({
                id: props.addressId,
                cep: editDeposit.value[5].value,
                addressValue: editDeposit.value[6].value,
                neighborhood: editDeposit.value[7].value,
                city: editDeposit.value[4].value,
                uf: editDeposit.value[3].value,
                country: editDeposit.value[2].value,
                latitude: parseFloat(editDeposit.value[9].value),
                longitude: parseFloat(editDeposit.value[10].value)
            });

            if (response.status === 200) {
                const responseDeposit = await putDeposit({
                    id: props.id,
                    depositName: editDeposit.value[0].value,
                    limit: parseInt(editDeposit.value[1].value),
                    isActive: Boolean(editDeposit.value[8].value),
                    addressId: response.data['id'],
                });

                if (responseDeposit.status === 200) {
                    snackbar.value.active = true;
                    snackbar.value.text = 'Depósito editado com sucesso.';
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
            editDeposit.value[6].value = response.data['logradouro'];
            editDeposit.value[7].value = response.data['bairro'];
        }
    } catch (error) {
        itemsCity.value = [];
    }
}

const searchLocation = async (cep: string) => {
    try {
        const response = await getLocation(cep);
        if (response.status === 200) {
            editDeposit.value[9].value = response.data['lat'];
            editDeposit.value[10].value = response.data['lng'];
        }
    } catch (error) {
        itemsCity.value = [];
    }
}

onMounted(() => {
    searchUf();
});

watch(() => editDeposit.value[2].value, () => {
    searchUf();
});

watch(() => editDeposit.value[3].value, (uf) => {
    searchCity(uf)
});

watch(() => editDeposit.value[5].value, (cep) => {
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
    <v-dialog
        v-model="dialog"
        max-width="600"
    >
        <template v-slot:activator="{ props: activatorProps }">
            <v-btn 
                class="btn-expanded rounded-lg text-capitalize font-weight-black"
                color="#4CAF50"
                prepend-icon="mdi-pencil"
                elevation="0"
                v-bind="activatorProps"
            >
                Editar
            </v-btn>
        </template>
        <form 
            ref="formRef"
        >
            <v-card
                title="Editar Depósito"
            >
                <v-card-text>
                    <v-row dense>
                        <v-col
                            cols="12"
                            md="6"
                            sm="6"
                            v-for="(d, index) in editDeposit"
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
                                :items="d.name === 'uf' ? itemsUf : d.name === 'city' ? itemsCity : itemsActive"
                                :item-title="d.name === 'uf' ? 'sigla' :  d.name === 'city' ? 'nome' : 'label'"
                                :item-value="d.name === 'uf' ? 'sigla' :  d.name === 'city' ? 'nome' : 'value'"
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
                        Salvar
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