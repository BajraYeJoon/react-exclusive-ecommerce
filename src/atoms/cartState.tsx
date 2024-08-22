import { atom } from "recoil";

export const cartState = atom({
  key: "cartState",
  default: [
    {
      product: {
        id: 0,
        title: "",
        price: 0,
        image: [""],
        discounttag: false,
        rating: 0,
        discountprice: null,
        sizes: null,
        returnpolicy: "",
        description: "",
        brand: "",
        availability: false,
        onSale: false,
        saleStart: null,
        saleEnd: null,
        createdAt: "",
        updatedAt: "",
        bannerId: null,
        availablequantity: 0,
        soldqunatity: 0,
      },
      quantity: 0,
    },
  ],
});
