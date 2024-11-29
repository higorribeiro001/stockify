import axios from "axios"

export async function setProduct(data: ProductPost) {
    const body = data

    return await axios.post(import.meta.env.VITE_URL_API + '/api/product/v1', body);
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
    const body = data

    return await axios.put(import.meta.env.VITE_URL_API + '/api/product/v1', body);
}

export async function deleteProduct(id: number) {
    return await axios.delete(import.meta.env.VITE_URL_API + '/api/product/v1?id=' + id);
}