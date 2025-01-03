<script setup lang="ts">
import { setProduct } from '~/services/api/product';

interface NewProduct {
    deposits: Deposit[];
    categories: Category[];
    itemsProducts: ItemProduct[];
    loadProducts: () => void;
}

interface BodyRequest {
    label: string;
    type: string;
    name: string;
    value: string;
    error: string;
}

const props = defineProps<NewProduct>();

const dialog = ref(false);

const orange = '#FF6A00';

const fileUpload = ref<File | null>(null);

const newProduct = ref<BodyRequest[]>([
    {
        label: 'Nome*',
        type: 'text',
        name: 'name',
        value: '',
        error: ''
    },
    {
        label: 'Imagem*',
        type: 'file',
        name: 'file',
        value: '',
        error: ''
    },
    {
        label: 'Descrição*',
        type: 'text',
        name: 'description',
        value: '',
        error: ''
    },
    {
        label: 'Categoria*',
        type: 'select',
        name: 'categoryId',
        value: '',
        error: ''
    },
    {
        label: 'Depósito*',
        type: 'select',
        name: 'depositId',
        value: '',
        error: ''
    },
    {
        label: 'Preço*',
        type: 'text',
        name: 'price',
        value: '',
        error: ''
    },
]);

const showErrors = ref(false);
const isLoading = ref(false);
const snackbar = ref({
    active: false,
    text: ''
});

const validateField = (index: number) => {
    const field = newProduct.value[index];
    switch (field.name) {
        case 'name':
            field.error = field.value!.length >= 2 ? '' : 'Nome deve ter pelo menos 2 caracteres.';
            break;
        case 'description':
            field.error = field.value!.length >= 3 && field.value!.length <= 255 
                ? '' 
                : 'Descrição deve ter entre 3 e 255 caracteres.';
            break;
        case 'file':
            field.error = fileUpload.value !== null
                ? '' 
                : 'Selecione uma imagem.';
            break;
        case 'price':
            field.error = field.value!.includes(',') 
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

    newProduct.value.forEach((field, index) => {
        validateField(index);
        
        const allowedTypes = ['image/png', 'image/jpeg', 'application/jpg'];
        const MAX_SIZE = 2 * 1024 * 1024;

        if (!fileUpload.value) {
            newProduct.value[1].error = 'Você precisa selecionar um arquivo.';
        } else if (!allowedTypes.includes(fileUpload.value.type)) {
            newProduct.value[1].error = 'Tipo de arquivo inválido! Por favor, selecione uma imagem PNG, JPEG ou JPG.';
        } else if (fileUpload.value.size > MAX_SIZE) {
          newProduct.value[1].error = 'Arquivo ultrapassa o limite de tamanho.';
        } else {
            newProduct.value[1].error = '';
        }

        if (field.error && !fileUpload.value) isValid = false;
    });

    if (isValid) {
        isLoading.value = true;
        try {
            const response = await setProduct({
                name: newProduct.value[0].value,
                blobImage: newProduct.value[1].value,
                file: fileUpload.value,
                description: newProduct.value[2].value,
                categoryId: parseInt(newProduct.value[3].value),
                depositId: parseInt(newProduct.value[4].value),
                price: parseFloat(newProduct.value[5].value.replace(',', '.'))
            });

            if (response.status === 201) {
                snackbar.value.active = true;
                snackbar.value.text = 'Produto cadastrado com sucesso.';
                props.loadProducts();
                cancel();
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
    fileUpload.value = null;
    for (var f of newProduct.value) {
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
                class="btn-new rounded-lg text-capitalize font-weight-black mb-6"
                style="width: 160px;"
                :color="orange"
                prepend-icon="mdi-plus"
                v-bind="activatorProps"
            >
                Novo produto
            </v-btn>
        </template>
        <form 
            ref="formRef"
        >
            <v-card
                title="Novo Produto"
            >
                <v-card-text>
                    <v-row dense>
                        <v-col
                            cols="12"
                            md="6"
                            sm="6"
                            v-for="(d, index) in newProduct"
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
                                :items="d.name === 'depositId' ? props.deposits : d.name === 'categoryId' ? props.categories : props.itemsProducts"
                                :item-title="d.name === 'depositId' ? 'depositName' : d.name === 'categoryId' ? 'nameCategory' : 'label'"
                                :item-value="d.name === 'blobImage' ? 'value' : 'id'"
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