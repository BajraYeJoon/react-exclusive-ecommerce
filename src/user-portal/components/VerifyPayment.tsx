import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Axios } from "../../common/lib/axiosInstance";

const VerifyPayment = () => {
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const data = queryParams.get("data");

        if (!data) {
          throw new Error("Missing payment data.");
        }

        const response = await Axios.post("/payment/verify", { data });

        if (response.data.success) {
          toast.success("Payment verified successfully!");
          navigate("/order-placed", { replace: true });
        } else {
          throw new Error(
            "Payment verification failed. Please contact support.",
          );
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
        toast.error(
          error instanceof Error
            ? error.message
            : "An error occurred during payment verification.",
        );
        // Delay navigation to allow the user to see the error message
        setTimeout(() => navigate("/checkout", { replace: true }), 3000);
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  if (verifying) {
    return <div>Verifying payment... Please wait.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null; // Component will unmount after successful verification
};

export default VerifyPayment;