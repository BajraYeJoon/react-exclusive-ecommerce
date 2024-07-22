import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../../components";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import { cartState } from "../../atoms/cartState";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const cartHeaderData = [
  { label: "Price" },
  { label: "Quantity" },
  { label: "Total" },
];

const Cart = () => {
  const cartvalues = useRecoilValue(cartState);

  const [cartItems, setCartItems] = useRecoilState(cartState);

  const increaseQuantity = (id: number) => {
    const newCartvalue = cartItems.map((cart) => {
      if (cart.id === id) {
        return { ...cart, quantity: cart.quantity + 1 };
      }
      return cart;
    });
    setCartItems(newCartvalue);
  };

  const decreaseQuantity = (id: number) => {
    let itemremoved = false;

    const newCartValue = cartItems
      .map((cart) => {
        if (cart.id === id) {
          if (cart.quantity === 1 && !itemremoved) {
            itemremoved = true;
            toast.error(`Your ${cart.title} has been removed from the cart`);
            return { ...cart, quantity: cart.quantity - 1 };
          }
        }
        return cart;
      })
      .filter((cart) => cart.quantity > 0);

    if (newCartValue.length === 0) {
      toast.error("Your cart is empty now");
    }

    setCartItems(newCartValue);
  };

  const calculateTotal = selector({
    key: "calculateTotal",
    get: ({ get }) => {
      const subTotal = get(cartState).reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      const charge = 45;

      return {
        subTotal,
        total: subTotal + charge,
      };
    },
  });

  const total = useRecoilValue(calculateTotal);

  console.log(cartvalues, "iniitial cart values");
  console.log(cartItems, "after in or de");

  if (cartItems.length === 0) {
    return (
      <section className="flex h-screen flex-col items-center justify-center">
        <h1 className="flex flex-col text-3xl font-semibold text-gray-400">
          No items in cart
        </h1>
        <Link to={"/products"} className="underline">
          Add some products from here....
        </Link>
      </section>
    );
  }

  return (
    <section className="relative mx-8 my-6 md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <div className="grid grid-cols-2 py-6 text-foreground/40">
        <div className="text-xl font-normal leading-8">Product</div>
        <p className="hidden items-center justify-between text-xl font-normal leading-8 sm:flex">
          <span className={`w-full text-center`}>
            {cartHeaderData[0].label}
          </span>
          <span className={`w-full text-center`}>
            {cartHeaderData[1].label}
          </span>
          <span className={`w-full text-center`}>
            {cartHeaderData[2].label}
          </span>
        </p>
      </div>

      <div className="border-b-2 md:my-4">
        {cartItems.map((item) => (
          <div key={item.id} className="grid grid-cols-3 gap-6 md:grid-cols-2">
            <div className="col-span-2 flex w-full items-center gap-3 md:col-span-1">
              <img
                src={item.image}
                alt={item.title}
                className="h-16 w-16 rounded-md"
              />
              <h5 className="text-sm font-medium text-black md:text-base">
                {item.title}
              </h5>
            </div>
            <div className="flex w-fit flex-col items-center justify-around gap-2 sm:flex-row md:w-full">
              <h6 className="text-center text-sm font-medium leading-9 text-foreground md:text-base">
                {item.price}{" "}
              </h6>
              <div className="flex items-center justify-center rounded-md border p-1">
                <input
                  type="text"
                  className="max-w-12 px-4"
                  placeholder={item.quantity.toString()}
                />
                <div className="flex flex-col items-center justify-center">
                  <ChevronUp
                    size={14}
                    onClick={() => increaseQuantity(item.id)}
                  />
                  <ChevronDown
                    size={14}
                    onClick={() => decreaseQuantity(item.id)}
                  />
                </div>
              </div>
              <h6 className="text-center text-sm font-medium leading-9 md:text-lg">
                {item.price * item.quantity}
              </h6>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <Button className="w-full">Add Coupon Code</Button>
        </div>
        <div className="mb-8 w-full max-w-sm rounded-md border border-foreground/50 p-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <p className="text-base font-normal leading-8 text-gray-400 md:text-xl">
              Sub Total
            </p>
            <h6 className="text-base font-semibold leading-8 text-gray-900 md:text-xl">
              {total.subTotal}
            </h6>
          </div>

          <div className="flex w-full items-center justify-between border-b border-gray-200 pb-6">
            <p className="text-base font-normal leading-8 text-gray-400 md:text-xl">
              Shipping Charge
            </p>
            <h6 className="text-base font-semibold leading-8 text-gray-900 md:text-xl">
              $45.00
            </h6>
          </div>
          <div className="flex w-full items-center justify-between py-6">
            <p className="text-lg font-medium leading-9 text-gray-900 md:text-2xl">
              Total
            </p>
            <h6 className="text-lg font-medium leading-9 md:text-2xl">
              {total.total}
            </h6>
          </div>
          <Button className="w-full">Proceed to Checkout</Button>
        </div>
      </div>
    </section>
  );
};

export { Cart };
