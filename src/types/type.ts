import { Category, Product } from "@prisma/client";

export type Address = {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  streetLine1?: string;
  streetLine2?: string;
};

export type OrderItemsQuantity = {
  name: string;
  price: number;
  quantity: number;
  color: string;
  category: string;
};
