interface Address {
    cep: string;
    addressValue: string;
    neighborhood: string;
    city: string;
    uf: string;
    country: string;
    latitude: number;
    longitude: number;
}

interface AddressRequestPut {
    id: number;
    cep: string;
    addressValue: string;
    neighborhood: string;
    city: string;
    uf: string;
    country: string;
    latitude: number;
    longitude: number;
}

interface Deposit {
    depositName: string;
    limit: number;
    isActive: boolean;
    addressId: number;
}

interface DepositRequestPut {
    id: number;
    depositName: string;
    limit: number;
    isActive: boolean;
    addressId: number;
}

interface DepositComplete {
    id: number;
    depositName: string;
    limit: number;
    isActive: boolean;
    addressId: number;
    address: {
      cep: string;
      addressValue: string;
      neighborhood: string;
      city: string;
      uf: string;
      country: string;
      latitude: number;
      longitude: number;
    }
}

interface DepositEdit {
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
}