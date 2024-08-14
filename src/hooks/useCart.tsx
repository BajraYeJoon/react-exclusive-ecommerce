import { toast } from "sonner";
import { CartItem, cartState } from "../atoms/cartState";
import { useRecoilState } from "recoil";

const useCart = () => {
  const [cart, setCart] = useRecoilState(cartState);

  const handleAddToCart = (product: Omit<CartItem, "quantity">) => {
    setCart((currentCart) => {
      const productIndex = currentCart.findIndex(
        (item) => item.id === product.id,
      );
      if (productIndex !== -1) {
        toast.success(
          `Your ${product.title} has been added to the cart ${
            currentCart[productIndex].quantity + 1
          } times`,
        );
        return currentCart.map((item, index) =>
          index === productIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        toast.success(`Your ${product.title} has been added to the cart`);
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  };

  return { cart, handleAddToCart };
};

export default useCart;
