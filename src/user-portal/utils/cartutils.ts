import { toast } from "sonner";
import {
  deleteAllCartItems,
  modifyQuantityInCart,
  removeItem,
} from "../api/cartApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAllCartItems(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Your cart has been cleared 😊");
    },
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.response?.data?.message}`);
      console.error("Error clearing cart:", error);
    },
  });
};

export const useIncreaseQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: { id: number; type: string }) =>
      modifyQuantityInCart(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product quantity increased by 1");
    },
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.response?.data?.message}`);
      console.error("Error increasing product quantity:", error);
    },
  });
};

export const useDecreaseQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: { id: number; type: string }) =>
      modifyQuantityInCart(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product quantity decreased by 1");
    },
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.response?.data?.message}`);

      console.error("Error increasing product quantity:", error);
    },
  });
};

export const useRemoveItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => removeItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product removed from cart");
    },

    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.response?.data?.message}`);
      console.error("Error removing product from cart:", error);
    },
  });
};