import { toast } from "sonner";
import {
  addProductToCart,
  deleteAllCartItems,
  deleteProductFromCart,
} from "../api/cartApi";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../common/lib/reactQueryClient";

export const handleCouponChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setCouponCode: React.Dispatch<React.SetStateAction<string>>,
) => {
  const code: string = e.target.value;
  setCouponCode(code);
};

export const applyCoupon = (
  couponCode: string,
  setDiscount: React.Dispatch<React.SetStateAction<number>>,
) => {
  if (couponCode === "DISCOUNT10") {
    setDiscount(0.1);
    toast.success("Coupon code DISCOUNT10 applied. 10% discount added.");
  } else {
    setDiscount(0);
    toast.error("Invalid coupon code");
  }
};

export const clearCart = async () => {
  await deleteAllCartItems();
  queryClient.invalidateQueries({ queryKey: ["cart"] });
  toast.success("All items have been removed from the cart");
};

export const useIncreaseQuantity = () => {
  return useMutation({
    mutationFn: addProductToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product quantity increased");
    },
    onError: (error) => {
      toast.error("Error increasing product quantity");
      console.error("Error increasing product quantity:", error);
    },
  });
};

export const useDecreaseQuantity = () => {
  return useMutation({
    mutationFn: deleteProductFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product quantity decreased");
    },
    onError: (error) => {
      toast.error("Error decreasing product quantity");
      console.error("Error decreasing product quantity:", error);
    },
  });
};
