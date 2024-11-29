<script setup lang="ts">
interface NewCategory {
    loadCategories: () => void;
}
import Loading from '../loading/index.vue';
import { setCategory } from '~/services/api/category';

const props = defineProps<NewCategory>();

const dialog = ref(false);

const snackbar = ref({
    active: false,
    text: ''
});

const isLoading = ref(false);

const newCategory = ref([{
    label: 'Nome*',
    type: 'text',
    name: 'nameCategory',
    value: '',
    error: ''
}]);

const showErrors = ref(false);

const validateField = (index: number) => {
    const field = newCategory.value[index];
    switch (field.name) {
        case 'nameCategory':
            field.error = field.value.length >= 2 ? '' : 'Nome deve ter pelo menos 2 caracteres.';
            break;
        default:
            field.error = '';
            break;
    }
};

const submitForm = async () => {
    let isValid = true;

    isLoading.value = true;

    newCategory.value.forEach((field, index) => {
        validateField(index);
        if (field.error) isValid = false;
    });

    if (isValid) {
        try {
            const response = await setCategory(newCategory.value[0].value);

            if (response.status === 201) {
                snackbar.value.active = true;
                snackbar.value.text = 'Categoria cadastrada com sucesso.';
                props.loadCategories();
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
    for (var f of newCategory.value) {
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
                color="black"
                prepend-icon="mdi-plus"
                v-bind="activatorProps"
            >
                Nova categoria
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
                            v-for="(d, index) in newCategory" 
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