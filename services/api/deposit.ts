import axios from "axios"

export async function setDeposit(data: Deposit) {
    const body = data

    return await axios.post(import.meta.env.VITE_URL_API + '/api/deposit/v1', body);
}

export async function getDeposits() {
    try {
        const response = await axios.get(import.meta.env.VITE_URL_API + '/api/deposit/v1')
        return response.data;
    } catch {
        return [];
    }
}

export async function putDeposit(data: DepositRequestPut) {
    const body = data

    return await axios.put(import.meta.env.VITE_URL_API + '/api/deposit/v1', body);
}

export async function deleteDeposit(id: number) {
    return await axios.delete(import.meta.env.VITE_URL_API + '/api/deposit/v1?id=' + id);
}