import { atom } from "recoil";

export const orderplaceState = atom<{
	itemId: any[];
	totalPrice: number;
	billingInfo: {
		firstname: string;

		lastname: string;

		country: string;

		streetaddress: string;

		postalcode: string;

		phone: string;

		email: string;
	};
}>({
	key: "orderplaceState",

	default: {
		itemId: [],

		totalPrice: 0,

		billingInfo: {
			firstname: "",

			lastname: "",

			country: "",

			streetaddress: "",

			postalcode: "",

			phone: "",

			email: "",
		},
	},
});
