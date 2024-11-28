import axios from "axios"

export async function getUf() {
  return await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
}

export async function getCities(uf: string) {
  return await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
}

export async function getAddress(cep: string) {
  return await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}

export async function getLocation(cep: string) {
  return await axios.get(`https://cep.awesomeapi.com.br/json/${cep}`)
}