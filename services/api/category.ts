import axios from "axios"

export async function setCategory(nameCategory: string) {
    const body = { nameCategory }

    return await axios.post(import.meta.env.VITE_URL_API + '/api/category/v1', body);
}

export async function getCategories() {
    try {
        const response = await axios.get(import.meta.env.VITE_URL_API + '/api/category/v1')
        return response.data;
    } catch {
        return [];
    }
}