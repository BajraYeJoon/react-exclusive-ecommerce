import { atom } from "recoil";

export interface CartState {
  product: any;
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const cartState = atom<CartState[]>({
  key: "cartState",
  default: [],
});
