import { atom } from "recoil";
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const cartState = atom<CartItem[]>({
  key: "cartState",
  default: [],
});

