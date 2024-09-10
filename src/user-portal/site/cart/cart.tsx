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
        <Button className="w-fit" onClick={() => clearCart()}>
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-2 py-6 text-foreground/40">
        <div className="text-xl font-normal leading-8">Product</div>
        <p className="hidden items-center justify-between text-xl font-normal leading-8 sm:flex">
          {cartHeaderData.map((header) => (
            <span
              key={`cart-header-${uuidv4()}`}
              className="w-full text-center"
            >
              {header.label}
            </span>
          ))}
        </p>
      </div>

      <div className="border-b-2 md:my-4">
        {isLoading ? (
          <div>it is isLoading</div>
        ) : (
          <>
            {cartItems.map((item: any) => (
              <div
                key={item.product.id}
                className="grid grid-cols-3 gap-6 md:grid-cols-2"
              >
                <div className="col-span-2 flex w-full items-center gap-3 md:col-span-1">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.title}
                    className="h-16 w-16 rounded-md"
                  />
                  <h5 className="text-sm font-medium text-black md:text-base">
                    {item.product.title}
                  </h5>
                </div>
                <div className="flex w-fit flex-col items-center justify-around gap-2 sm:flex-row md:w-full">
                  <h6 className="text-center text-sm font-medium leading-9 text-foreground md:text-base">
                    {item.product.price}{" "}
                  </h6>
                  <div className="flex items-center justify-center rounded-md border p-1">
                    <input
                      type="text"
                      className="max-w-16 px-4"
                      placeholder={item.quantity.toString()}
                      readOnly
                    />
                    <div className="flex flex-col items-center justify-center">
                      <ChevronUp
                        size={14}
                        className={cn(
                          "cursor-pointer",
                          item.quantity === item.product.stock &&
                            "cursor-not-allowed",
                        )}
                        onClick={() =>
                          increaseQuantity({
                            id: item.product.id,
                            type: "add",
                          })
                        }
                      />

                      <ChevronDown
                        size={14}
                        className={cn(
                          "cursor-pointer",
                          item.quantity <= 1 && "cursor-not-allowed",
                        )}
                        onClick={() =>
                          decreaseQuantity({
                            id: item.product.id,
                            type: "sub",
                          })
                        }
                      />
                    </div>
                  </div>
                  <h6 className="text-center text-sm font-medium leading-9 md:text-lg">
                    {(item.product.price * item.quantity).toFixed(2)}
                  </h6>
                  <Button onClick={() => removeItem(item.product.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

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
