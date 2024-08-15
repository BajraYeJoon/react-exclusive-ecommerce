import { atom } from "recoil";

export interface favoriteItem {
  id: number;
}

export const favoriteState = atom<favoriteItem[]>({
  key: "favoriteState",
  default: [],
});
