import { toast } from "sonner";
import { Axios } from "../lib/axiosInstance";
import { handleRequest } from "./handleRequest";
export const sendOtp = async (email: string) => {
  return handleRequest(
    () => Axios.post("/profile/forgotpassword", { email }),
    "Something went wrong sending the otp",
  );
};

export const verifyOtp = async (data: any) => {
  try {
    const response = await handleRequest(
      () => Axios.post("/profile/resetpassword", data),
      "Something went wrong verifying the otp",
    );

    if (response.status === 200) {
      toast.success("Password reset successfully");
      return response.data;
    } else {
      toast.error("Failed to reset password");

      return null;
    }
  } catch (error) {
    toast.error("Failed to reset password");
    console.error(error);
    return null;
  }
};
