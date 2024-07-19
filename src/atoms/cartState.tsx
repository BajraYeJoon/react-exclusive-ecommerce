import { atom } from "recoil";

export const cartState = atom<{ [key: number]: number }>({
  key: "cartState",

  default: {},
});
