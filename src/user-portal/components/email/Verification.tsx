import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Axios } from "../../../common/lib/axiosInstance";
import { toast } from "sonner";
import axios from "axios";

const EmailVerification: React.FC = () => {
  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");

      console.log(token, "token");

      if (!token) {
        setVerificationStatus("error");
        toast.error("Token is missing or invalid.");
        return;
      }

      // const numericToken = Number(token).toString();

      try {
        const response = await axios.post(
          `https://react-exclusive-ecommerce.vercel.app/auth/verify-email/${token}`,
        );
        if (response.status === 200) {
          setVerificationStatus("success");
          toast.success("Email verified successfully!");
        } else {
          setVerificationStatus("error");
          toast.error("Email verification failed.");
        }
      } catch (error) {
        console.error("Email verification failed:", error);
        setVerificationStatus("error");

        toast.error("Validation failed: numeric string is expected.");
      }
    };

    verifyEmail();
  }, [location]);

  const handleContinue = () => {
    navigate("/login");
  };

  if (verificationStatus === "loading") {
    return <div>Verifying your email...</div>;
  }

  if (verificationStatus === "success") {
    return (
      <div>
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <button onClick={handleContinue}>Continue to Login</button>
      </div>
    );
  }

  if (verificationStatus === "error") {
    return (
      <div>
        <h1>Email Verification Failed</h1>
        <p>
          There was an error verifying your email. The link may have expired or
          is invalid.
        </p>
        <button onClick={() => navigate("/sign-up")}>Return to Sign Up</button>
      </div>
    );
  }

  return null;
};

export default EmailVerification;