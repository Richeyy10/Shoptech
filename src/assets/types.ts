// types/product.ts
import { StaticImageData } from 'next/image';
export interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    offerPrice: number;
    image: StaticImageData[] | string[];
    // Add any other properties your product has
  }

  export interface Address {
    _id: string;
    userId: string;
    fullName: string;
    phoneNumber: string;
    pincode: number;
    area: string;
    city: string;
    state: string;
    __v: number;
};


export interface Item {
  product: Product;
  quantity: number;
  _id: string;
}

export interface Order {
  _id: string;
  userId: string;
  items: Item[];
  amount: number;
  address: Address;
  status: string;
  date: number;
  __v: number;
}

// The main data array
export const orderDummyData: Order[] = [
  // ... your data here
];