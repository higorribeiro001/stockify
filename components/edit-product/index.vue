<script setup lang="ts">
import { putProduct } from '~/services/api/product';

interface Product {
    id: number;
    name: string;
    blob_image: string;
    category_id : number;
    category: {
        nameCategory: string;
    };
    is_active: boolean;
    is_purchased : boolean;
    description: string;
    deposit_id: number;
    deposit: {
        depositName: string;
        limit: number;
    }
    price: number;
    deposits: Deposit[];
    categories: Category[];
    itemsProducts: ItemProduct[];
    loadProducts: () => void;
}

const props = defineProps<Product>()

const dialog = ref(false);

const fileUpload = ref<File | null>(null);

const product = ref([
    {
        label: 'Nome*',
        type: 'text',
        name: 'name',
        value: props.name,
        error: ''
    },
    {
        label: 'Imagem*',
        type: 'file',
        name: 'file',
        value: props.blob_image,
        error: ''
    },
    {
        label: 'Descrição*',
        type: 'text',
        name: 'description',
        value: props.description,
        error: ''
    },
    {
        label: 'Categoria*',
        type: 'select',
        name: 'categoryId',
        value: props.category_id,
        error: ''
    },
    {
        label: 'Ativo*',
        type: 'select',
        name: 'isActive',
        value: props.is_active ? 'Sim' : 'Não',
        error: ''
    },
    {
        label: 'Vendido*',
        type: 'select',
        name: 'isPurchased',
        value: props.is_purchased ? 'Sim' : 'Não',
        error: ''
    },
    {
        label: 'Depósito*',
        type: 'select',
        name: 'depositId',
        value: props.deposit_id,
        error: ''
    },
    {
        label: 'Preço*',
        type: 'text',
        name: 'price',
        value: String(props.price),
        error: ''
    },
]);

const showErrors = ref(false);
const isLoading = ref(false);
const snackbar = ref({
    active: false,
    text: ''
});

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

const validateField = (index: number) => {
    const field = product.value[index];
    switch (field.name) {
        case 'name':
            field.error = field.value !== '' ? '' : 'Nome deve ter pelo menos 2 caracteres.';
            break;
        case 'description':
            field.error = field.value !== ''
                ? '' 
                : 'Descrição deve ter entre 3 e 255 caracteres.';
            break;
        case 'blobImage':
            field.error = field.value !== ''
                ? '' 
                : 'Selecione uma imagem.';
            break;
        case 'price':
            field.error = String(field.value) !== ''
                ? '' 
                : 'Preço inválido, coloque vírgula.';
            break;
        case 'categoryId':
            field.error = field.value !== ''
                ? '' 
                : 'Categoria inválida.';
            break;
        case 'depositId':
            field.error = field.value !== ''
                ? '' 
                : 'Depósito inválido.';
            break;
        default:
            field.error = '';
            break;
    }
};

const submitForm = async () => {
    let isValid = true;

    product.value.forEach((field, index) => {
        validateField(index);

        if (fileUpload.value) {
            const allowedTypes = ['image/png', 'image/jpeg', 'application/jpg'];
            const MAX_SIZE = 2 * 1024 * 1024;

            if (!allowedTypes.includes(fileUpload.value.type)) {
                product.value[1].error = 'Tipo de arquivo inválido! Por favor, selecione uma imagem PNG, JPEG ou JPG.';
            } else if (fileUpload.value.size > MAX_SIZE) {
            product.value[1].error = 'Arquivo ultrapassa o limite de tamanho.';
            } else {
                product.value[1].error = '';
            }
        }

        if (field.error) isValid = false;
    });

    if (isValid) {
        isLoading.value = true;
        try {
            const response = await putProduct({
                id: props.id,
                name: product.value[0].value as string,
                file: fileUpload.value,
                blobImage: product.value[1].value as string,
                description: product.value[2].value as string,
                categoryId: parseInt(product.value[3].value as string),
                depositId: parseInt(product.value[6].value as string),
                price: parseFloat(String(product.value[7].value).replace(',', '.')),
                isActive: Boolean(product.value[4].value),
                isPurchased: Boolean(product.value[5].value)
            });

            if (response.status === 200) {
                snackbar.value.active = true;
                snackbar.value.text = 'Produto editado com sucesso.';
                props.loadProducts();

                dialog.value = false;
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
    for (var f of product.value) {
        f.value = '';
        f.error = '';
    }
    showErrors.value = false;
}
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
                title="Editar Produto"
            >
                <v-card-text>
                    <v-row dense>
                        <v-col
                            cols="12"
                            md="6"
                            sm="6"
                            v-for="(d, index) in product"
                        >
                            <v-text-field
                                v-if="d.type === 'text'"
                                :label="d.label"
                                v-model="d.value"
                                :name="d.name"
                                :error-messages="d.error"
                                @input="validateField(index)"
                            ></v-text-field>
                            <v-file-input 
                                v-else-if="d.type === 'file'" 
                                :label="d.label"
                                v-model="fileUpload"
                                :name="d.name"
                                :error-messages="d.error"
                            >
                            </v-file-input>
                            <v-select
                                v-else
                                :items="d.name === 'depositId' ? props.deposits : d.name === 'categoryId' ? props.categories : d.name === 'blobImage' ? props.itemsProducts : itemsActive"
                                :item-title="d.name === 'depositId' ? 'depositName' : d.name === 'categoryId' ? 'nameCategory' : 'label'"
                                :item-value="d.name === 'blobImage' || d.name === 'isActive' || d.name === 'isPurchased' ? 'value' : 'id'"
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