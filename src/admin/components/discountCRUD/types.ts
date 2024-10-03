export interface Coupon {
	id: string;
	name: string;
	code: string;
	type: "fixed_amount" | "percentage";
	value: number;
	startDate: string;
	expirationDate: string;
	maxUsageCount: number;
	minPurchaseAmount: number;
	[key: string]: string | number;
}

export interface DiscountDisplayProps {
	coupons: Coupon[];
	handleEdit: (coupon: Coupon) => void;
}
