// export const increaseQuantity = (id: number) => {
//   const newCartvalue = cartItems.map((cart) => {
//     if (cart.id === id) {
//       return { ...cart, quantity: cart.quantity + 1 };
//     }
//     return cart;
//   });
//   setCartItems(newCartvalue);
// };

// export const decreaseQuantity = (id: number) => {
//   let itemremoved = false;

//   const newCartValue = cartItems
//     .map((cart) => {
//       if (cart.id === id) {
//         if (cart.quantity === 1 && !itemremoved) {
//           itemremoved = true;
//           toast.error(`Your ${cart.title} has been removed from the cart`);
//         }
//         return { ...cart, quantity: cart.quantity - 1 };
//       }
//       return cart;
//     })
//     .filter((cart) => cart.quantity > 0);

//   if (newCartValue.length === 0) {
//     toast.error("Your cart is empty now");
//   }

//   setCartItems(newCartValue);
// };

// export const clearCart = async () => {
//   await deleteAllCartItems();
//   // setCartItems([]);
//   toast.success("All items have been removed from the cart");
// };
// export const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const code = e.target.value;
//   setCouponCode(code);
// };

// export const applyCoupon = () => {
//   if (couponCode === "DISCOUNT10") {
//     setDiscount(0.1);
//     toast.success("Coupon code DISCOUNT10 applied. 10% discount added.");
//   } else {
//     setDiscount(0);
//     toast.error("Invalid coupon code");
//   }
// };
// export const calculateTotal = selector({
//   key: "CalculateTotal",
//   get: ({ get }) => {
//     const cartItems = get(cartState);
//     const discount = get(discountState);

//     const subTotal = cartItems.reduce((acc, item) => {
//       return acc + item.price * item.quantity;
//     }, 0);

//     const charge = 45;
//     const discountAmount = subTotal * discount;

//     return {
//       subTotal,
//       total: subTotal + charge - discountAmount,
//     };
//   },
// });
