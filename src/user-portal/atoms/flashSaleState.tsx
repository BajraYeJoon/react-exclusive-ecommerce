import { atom } from "recoil";

export const flashSaleState = atom<number[]>({
  key: "flashSaleState",
  default: [],
});
