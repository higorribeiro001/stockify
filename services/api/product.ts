import axios from "axios"

export async function setProduct(data: ProductPost) {
    const formData = new FormData();

    if(data.file) {
        formData.append('file', data.file);
    }

    formData.append('productName', data.name);
    formData.append('description', data.description);
    formData.append('categoryId', String(data.categoryId));
    formData.append('depositId', String(data.depositId));
    formData.append('price', String(data.price).replace(',', '.'));

    const header = {headers: {'Content-Type': 'multipart/form-data'}};

    return await axios.post(import.meta.env.VITE_URL_API + '/api/product/v1', formData, header);
}

export async function getProducts() {
    try {
        const response = await axios.get(import.meta.env.VITE_URL_API + '/api/product/v1')
        return response.data;
    } catch {
        return [];
    }
}

export async function putProduct(data: ProductRequestPut) {
    const formData = new FormData();

    if(data.file) {
        formData.append('file', data.file);
    } else {
        formData.append('blobImage', data.blobImage);
    }

    formData.append('id', String(data.id));
    formData.append('productName', data.name);
    formData.append('description', data.description);
    formData.append('categoryId', String(data.categoryId));
    formData.append('depositId', String(data.depositId));
    formData.append('price', String(data.price).replace(',', '.'));

    const header = {headers: {'Content-Type': 'multipart/form-data'}};

    return await axios.put(import.meta.env.VITE_URL_API + '/api/product/v1', formData, header);
}

export async function deleteProduct(id: number) {
    return await axios.delete(import.meta.env.VITE_URL_API + '/api/product/v1?id=' + id);
}