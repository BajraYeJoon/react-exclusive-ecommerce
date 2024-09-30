import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Axios } from "../../common/lib/axiosInstance";

const VerifyPayment: React.FC = () => {
  const [verifying, setVerifying] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const response = await Axios.post("/payment/verify", queryParams);

        if (response.data.success) {
          toast.success("Payment verified successfully!");
          navigate("/order-placed", { replace: true });
        } else {
          toast.error("Payment verification failed. Please contact support.");
          navigate("/checkout", { replace: true });
        }
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("An error occurred during payment verification.");
        navigate("/checkout", { replace: true });
      } finally {
        setVerifying(false);
      }
    };

    verifyPayment();
  }, [location, navigate]);

  if (verifying) {
    return <div>Verifying payment... Please wait.</div>;
  }

  return null;
};

export default VerifyPayment;
