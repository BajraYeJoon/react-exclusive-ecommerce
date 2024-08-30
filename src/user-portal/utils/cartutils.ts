import { toast } from "sonner";
import { deleteAllCartItems, modifyQuantityInCart } from "../api/cartApi";
import { useMutation } from "@tanstack/react-query";

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

export const clearCart = async (queryClient: any) => {
  try {
    await deleteAllCartItems();
    queryClient.invalidateQueries({ queryKey: ["cart"] });
    toast.success("All items have been removed from the cart");
  } catch (error: any) {
    toast.error(error.response?.data?.message);
  }
};

export const useIncreaseQuantity = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: { id: number; type: string }) =>
      modifyQuantityInCart(id, type),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product quantity increased by 1");
    },
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.response?.data?.message}`);
      console.error("Error increasing product quantity:", error);
    },
  });
};

export const useDecreaseQuantity = () => {
  // const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: { id: number; type: string }) =>
      modifyQuantityInCart(id, type),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product quantity decreased by 1");
    },
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.response?.data?.message}`);

      console.error("Error increasing product quantity:", error);
    },
  });
};