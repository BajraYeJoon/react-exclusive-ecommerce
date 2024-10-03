import { atom } from "recoil";
// import { recoilPersist } from "recoil-persist";

// const { persistAtom } = recoilPersist({
//   key: "recoil-persist", // this key is using to store data in local storage
//   storage: localStorage, // configure which storage will be used to store the data
//   converter: JSON, // configure how values will be serialized/deserialized in storage
// });

export const checkoutState = atom({
	key: "checkoutState",
	default: {
		cartItems: [],
		cartTotal: 0,
		subTotal: 0,
		// effects_UNSTABLE: [persistAtom],
	},
});
