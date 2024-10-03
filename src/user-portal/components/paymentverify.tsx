import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { atom, useSetRecoilState } from "recoil";
import { Axios } from "../../common/lib/axiosInstance";

const orderplaceState = atom({
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

const PaymentVerification: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(true);
	const setOrderPlaceData = useSetRecoilState(orderplaceState);

	useEffect(() => {
		const verifyPayment = async () => {
			const searchParams = new URLSearchParams(location.search);
			const data = searchParams.get("data");

			if (!data) {
				toast.error("Payment verification failed. Missing data.");
				navigate("/checkout");
				return;
			}

			try {
				const response = await Axios.get(`/payment/verify?data=${data}`);

				if (response.data.success) {
					setOrderPlaceData(response.data.invoiceData);
					toast.success("Payment verified successfully!");
					navigate("/order-placed");
				} else {
					toast.error("Payment verification failed. Please try again.");
					navigate("/checkout");
				}
			} catch (error) {
				console.error("Payment verification error:", error);
				toast.error(
					"An error occurred during payment verification. Please contact support.",
				);
				navigate("/checkout");
			} finally {
				setIsLoading(false);
			}
		};

		verifyPayment();
	}, [location, navigate, setOrderPlaceData]);

	if (isLoading) {
		return <div>Verifying payment... Please wait.</div>;
	}

	return null;
};

export default PaymentVerification;
