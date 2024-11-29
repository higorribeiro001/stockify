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

interface ProductPost {
    name: string;
    blobImage: string;
    description: string;
    categoryId: number;
    price: number;
    depositId: number;
}

interface Product {
    id: number;
    name: string;
    blobImage: string;
    description: string;
    categoryId: number;
    category: {
        nameCategory: string;
    };
    price: number;
    depositId: number;
    deposit: {
        depositName: string;
        limit: number;
    };
    isActive: boolean;
    isPurchased: boolean;
}

interface ProductRequestPut {
    id: number;
    name: string;
    blobImage: string;
    description: string;
    categoryId: number;
    price: number;
    depositId: number;
    isActive: boolean;
    isPurchased: boolean;
}

interface Category {
    id: number;
    nameCategory: string;
}

interface ItemProduct {
    label: string;
    value: string;
}