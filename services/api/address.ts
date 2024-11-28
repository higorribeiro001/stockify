import axios from "axios"

export async function setAddress(data: Address) {
    const body = data

    return await axios.post(import.meta.env.VITE_URL_API + '/api/address/v1', body);
}

export async function putAddress(data: AddressRequestPut) {
    const body = data

    return await axios.put(import.meta.env.VITE_URL_API + '/api/address/v1', body);
}

export async function deleteAddress(id: number) {
    return await axios.delete(import.meta.env.VITE_URL_API + '/api/address/v1/?id=' + id);
}