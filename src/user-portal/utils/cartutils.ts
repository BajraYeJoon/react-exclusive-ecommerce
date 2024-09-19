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



export const useClearCart = ({ setIsDialogOpen }: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAllCartItems(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Your cart has been cleared 😊");
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.response?.data?.message}`);
      console.error("Error clearing cart:", error);
      setIsDialogOpen(false);
    },
  });
};

export const useIncreaseQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: { id: number; type: string }) =>
      modifyQuantityInCart(id, type),
    onSuccess: (_, { id }) => {
      const cartItems = queryClient.getQueryData<any[]>(["cart"]);
      const isProductInCart = cartItems?.some((item) => item.product.id === id);

      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (isProductInCart) {
        toast.success("Product quantity increased by 1");
      } else {
        toast.success("Product added successfully");
      }
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

export const useRemoveItem = ({ setIsDialogOpen }: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => removeItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Product removed from cart");
      setIsDialogOpen(false);
    },

    onError: (error: any) => {
      toast.error(`Something went wrong: ${error.response?.data?.message}`);
      console.error("Error removing product from cart:", error);
      setIsDialogOpen(false);
    },
  });
};