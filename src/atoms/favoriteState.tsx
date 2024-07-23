import { atom } from "recoil";

export interface favoriteItem {
  id: number;
  title: string;
  price: number;
  image: string;
}

export const favoriteState = atom<favoriteItem[]>({
  key: "favoriteState",
  default: [],
});
