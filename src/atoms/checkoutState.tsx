import { atom } from "recoil";

export const checkoutState = atom({
  key: "checkoutState",
  default: {
    cartItems: [],
    total: 0,
  },
});
