import { ChevronDown, ChevronUp } from "lucide-react";
import { CustomBreakcrumb } from "../../components";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { checkoutState } from "../../atoms/checkoutState";
import Cookies from "js-cookie";
import { useState } from "react";
import { fetchCart } from "../../api/cartApi";
import { cn } from "../../../common/lib/utils";
import {
  applyCoupon,
  useClearCart,
  useDecreaseQuantity,
  useIncreaseQuantity,
  useRemoveItem,
} from "../../utils/cartutils";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { Button } from "../../../common/ui/button";
import uuidv4 from "../../../common/lib/utils/uuid";
import { ProductCardSkeleton } from "../../../common/components";
import { ConfirmationDialog } from "../../../admin/components";

const cartHeaderData = [
  { label: "Price" },
  { label: "Quantity" },
  { label: "Total" },
  {
    label: "",
  },
];

const discountState = atom<number>({
  key: "discountState",
  default: 0,
});

const Cart = () => {
  const [, setCheckoutData] = useRecoilState(checkoutState);

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const handleQuantityChange = (id: number, type: "add" | "sub") => {
    if (type === "add") {
      increaseQuantity({ id, type });
    } else {
      decreaseQuantity({ id, type });
    }
  };

  const navigateToCheckout = (cartItems: any, total: number) => {
    const checkoutData = {
      id: uuid().toString().substring(2, 15),
      cartItems,
      total,
      couponCode,
      discount,
    };

    setCheckoutData(checkoutData);
    Cookies.set("checkoutData", checkoutData.id);

    navigate("/checkout");
  };

  const { mutate: increaseQuantity } = useIncreaseQuantity();
  const { mutate: decreaseQuantity } = useDecreaseQuantity();
  const { mutate: removeItem } = useRemoveItem();
  const { mutate: clearCart } = useClearCart();

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setCouponCode(code);
  };

  const calculateTotal = selector({
    key: "CalculateTotal",
    get: ({ get }) => {
      const discount = get(discountState);

      const subTotal = Array.isArray(cartItems)
        ? cartItems.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
          }, 0)
        : 0;

      const charge = 45;
      const discountAmount = subTotal * discount;

      return {
        subTotal,
        total: subTotal + charge - discountAmount,
      };
    },
  });

  const total = useRecoilValue(calculateTotal);

  if (cartItems === undefined && !cartItems) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 lg:h-[90vh]">
        <h1 className="flex flex-col text-3xl font-semibold text-gray-400">
          No items in cart
        </h1>
        <Link to="/products" className="underline">
          Add some products from here...
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <section className="relative mx-8 my-6 h-fit md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
      <div className="flex items-center justify-between">
        <CustomBreakcrumb
          breadcrumbTitle="Cart"
          breadcrumbValue={cartItems as []}
        />
        {/* <Button className="w-fit" onClick={() => clearCart()}>
          Clear All
        </Button> */}
        <ConfirmationDialog
          triggerText="Clear All"
          title="Clear Cart"
          description="Are you sure you want to clear all items from cart?"
          onConfirm={() => clearCart()}
          confirmText="Yes, Clear All"
          cancelText="No"
        />
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="w-[50%] px-2 py-4 text-left">Product</th>
            <th className="px-2 py-4 text-right">Price</th>
            <th className="px-2 py-4 text-center">Quantity</th>
            <th className="px-2 py-4 text-right">Total</th>
            <th className="px-2 py-4"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item: any) => (
            <tr
              key={item.product.id}
              className={`border-b transition-all duration-300 ease-in-out`}
            >
              <td className="px-2 py-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.title}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <span className="font-medium">{item.product.title}</span>
                </div>
              </td>
              <td className="px-2 py-4 text-right">
                ${item.product.price.toFixed(2)}
              </td>
              <td className="px-2 py-4">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    className={`rounded border p-1 ${
                      item.quantity <= 1
                        ? "cursor-not-allowed bg-gray-100"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => handleQuantityChange(item.product.id, "sub")}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 rounded border p-1 text-center"
                    aria-label={`Quantity of ${item.product.title}`}
                  />
                  <button
                    className={`rounded border p-1 ${
                      item.quantity >= item.product.stock
                        ? "cursor-not-allowed bg-gray-100"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => handleQuantityChange(item.product.id, "add")}
                    disabled={item.quantity >= item.product.stock}
                    aria-label="Increase quantity"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </div>
              </td>
              <td className="px-2 py-4 text-right font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </td>
              <td className="px-2 py-4 text-right">
                {/* <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-red-600 transition-colors duration-200 hover:text-red-800"
                  aria-label={`Remove ${item.product.title} from cart`}
                >
                  Remove
                </button> */}
                <ConfirmationDialog
                  triggerText="Remove"
                  title="Remove"
                  description="Are you sure?"
                  onConfirm={() => removeItem(item.product.id)}
                  confirmText="yes"
                  cancelText="NO"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
        <div className="mt-8 flex flex-col items-center justify-center gap-3">
          <input
            type="text"
            value={couponCode}
            onChange={handleCouponChange}
            placeholder="Enter Coupon Code"
            className="w-full rounded-md border p-2"
          />
          <Button
            className="w-full"
            onClick={() => applyCoupon(couponCode, setDiscount)}
          >
            Add Coupon Code
          </Button>
        </div>
        <div className="mb-8 w-full max-w-sm rounded-md border border-foreground/50 p-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <p className="text-base font-normal leading-8 text-gray-400 md:text-xl">
              Sub Total
            </p>
            <h6 className="text-base font-semibold leading-8 text-gray-900 md:text-xl">
              {total.subTotal.toFixed(2)}
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
          {discount > 0 && (
            <div className="flex w-full items-center justify-between py-6">
              <p className="text-base font-normal leading-8 text-green-500 md:text-xl">
                Coupon Code Applied
              </p>
              <h6 className="text-base font-semibold leading-8 text-green-500 md:text-xl">
                -{(total.subTotal * discount).toFixed(2)}
              </h6>
            </div>
          )}
          <div className="flex w-full items-center justify-between py-6">
            <p className="text-lg font-medium leading-9 text-gray-900 md:text-2xl">
              Total
            </p>
            <h6 className="text-lg font-medium leading-9 md:text-2xl">
              {total.total.toFixed(2)}
            </h6>
          </div>
          <Button
            className="w-full"
            onClick={() => navigateToCheckout(cartItems, total.total)}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Cart };
