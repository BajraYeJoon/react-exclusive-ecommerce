import { atom } from "recoil";

export const orderplaceState = atom({
  key: "orderplaceState",
  default: {
    total: 0,
  },
});
