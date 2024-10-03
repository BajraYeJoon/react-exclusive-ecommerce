import { selector, useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../../api/cartApi";
import { discountState } from "./cart";
export const useCalculateTotal = () => {
	const { data: cartItems } = useQuery({
		queryKey: ["cart"],
		queryFn: fetchCart,
	});

	const calculateTotal = selector({
		key: "CalculateTotal",
		get: ({ get }) => {
			const discountInfo = get(discountState);

			const subTotal = Array.isArray(cartItems)
				? cartItems.reduce((acc, item) => {
						if (item.product && item.product.price && item.quantity) {
							return acc + item.product.price * item.quantity;
						} else {
							console.warn("Item structure is not as expected:", item);
							return acc;
						}
					}, 0)
				: 0;

			const charge = 45;
			let discountAmount = 0;

			if (discountInfo.type === "fixed_amount") {
				discountAmount = discountInfo.value;
			} else if (discountInfo.type === "percentage") {
				discountAmount = subTotal * (discountInfo.value / 100);
			}

			return {
				subTotal,
				discountAmount,
				total: subTotal + charge - discountAmount,
			};
		},
	});

	return useRecoilValue(calculateTotal);
};
