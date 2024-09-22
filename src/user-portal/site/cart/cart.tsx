import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { atom, useRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { v4 as uuid } from "uuid";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { CustomBreakcrumb } from "../../components";
import { checkoutState } from "../../atoms/checkoutState";
import { fetchCart } from "../../api/cartApi";
import {
  useClearCart,
  useDecreaseQuantity,
  useIncreaseQuantity,
  useRemoveItem,
} from "../../utils/cartutils";
import { ConfirmationDialog } from "../../../admin/components";
import { Axios } from "../../../common/lib/axiosInstance";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../common/ui/table";
import { Button } from "../../../common/ui/button";
import { Input } from "../../../common/ui/input";
import { Loading } from "../layout/Layout";

export const discountState = atom<{
  type: "fixed_amount" | "percentage";
  value: number;
}>({
  key: "discountState",
  default: { type: "fixed_amount", value: 0 },
});

export const couponState = atom<string>({
  key: "couponState",
  default: "",
});

const Cart = () => {
  const [, setCheckoutData] = useRecoilState(checkoutState);
  const [discount, setDiscount] = useRecoilState(discountState);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useRecoilState(couponState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  const { data: coupons, isLoading: loadingCoupons } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => Axios.get("/coupon").then((res) => res.data),
  });

  const { mutate: increaseQuantity } = useIncreaseQuantity();
  const { mutate: decreaseQuantity } = useDecreaseQuantity();
  const { mutate: removeItem } = useRemoveItem({ setIsDialogOpen });
  const { mutate: clearCart } = useClearCart({ setIsDialogOpen });

  const handleQuantityChange = (id: number, type: "add" | "sub") => {
    if (type === "add") {
      increaseQuantity({ id, type });
    } else {
      decreaseQuantity({ id, type });
    }
  };

  const { subTotal, total, discountAmount } = useMemo(() => {
    if (!Array.isArray(cartItems))
      return { subTotal: 0, total: 0, discountAmount: 0 };

    const subTotal = cartItems.reduce((acc, item) => {
      if (item.product && item.product.price && item.quantity) {
        return acc + item.product.price * item.quantity;
      }
      return acc;
    }, 0);

    const charge = 45;
    let discountAmount = 0;

    if (discount.type === "fixed_amount") {
      discountAmount = discount.value;
    } else if (discount.type === "percentage") {
      discountAmount = subTotal * (discount.value / 100);
    }

    const total = subTotal + charge - discountAmount;

    return { subTotal, total, discountAmount };
  }, [cartItems, discount]);

  const navigateToCheckout = () => {
    const cartTotal = total;

    const checkoutData = {
      id: uuid().toString().substring(2, 15),
      cartItems: cartItems.map((item: any) => ({
        id: item.product.id,
        title: item.product.title,
        image: item.product.image[0],
        total: item.product.price * item.quantity,
        quantity: item.quantity,
      })),
      subTotal,
      cartTotal,
      couponCode,
      discount: discount.value,
    };

    setCheckoutData(checkoutData);
    Cookies.set("checkoutData", JSON.stringify(checkoutData), { expires: 1 });

    navigate("/checkout");
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const validateCoupon = (code: string) => {
    const coupon = coupons?.find((coupon: any) => {
      const startDate = new Date(coupon.startDate);
      return coupon.code === code && startDate <= new Date();
    });
    if (coupon) {
      setDiscount({ type: coupon.type, value: coupon.value });
      return true;
    }
    return false;
  };

  const handleApplyCoupon = () => {
    if (validateCoupon(couponCode)) {
      toast.success("Coupon applied successfully");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  if (!cartItems || cartItems.length === 0) {
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

  if (isLoading || loadingCoupons) {
    return (
      <div className="flex h-[30vh] items-center justify-center lg:h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <section className="relative mx-72 my-6 h-fit max-2xl:mx-6 md:my-12">
      <div className="flex items-center justify-between">
        <CustomBreakcrumb
          breadcrumbTitle="Cart"
          breadcrumbValue={cartItems as []}
        />
        <ConfirmationDialog
          triggerText="Clear All"
          title="Clear Cart"
          description="Are you sure you want to clear all items from cart?"
          onConfirm={() => clearCart()}
          confirmText="Yes, Clear All"
          cancelText="No"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Product</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item: any) => (
            <TableRow key={item.product.id}>
              <TableCell>
                <div className="flex flex-col items-start md:flex-row md:space-x-4">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.title}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <span className="text-xs font-medium md:text-base">
                    {item.product.title}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                ${item.product.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-2">
                  <Input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center"
                  />
                  <div className="flex flex-col">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, "add")
                      }
                      disabled={item.quantity >= item.product.stock}
                      className="disabled:cursor-not-allowed"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.product.id, "sub")
                      }
                      disabled={item.quantity <= 1}
                      className="disabled:cursor-not-allowed"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell>
                <ConfirmationDialog
                  triggerComponent={<Trash2 className="h-4 w-4" />}
                  title="Remove Item"
                  description="Are you sure you want to remove this item from your cart?"
                  onConfirm={() => removeItem(item.product.id)}
                  confirmText="Remove"
                  cancelText="Cancel"
                  isOpen={isDialogOpen}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-8 flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
        <div className="flex min-w-72 flex-col items-center justify-center gap-3">
          <Input
            type="text"
            value={couponCode}
            onChange={handleCouponChange}
            placeholder="Enter Coupon Code"
            className="w-full"
          />
          <Button className="w-full" onClick={handleApplyCoupon}>
            Apply Coupon
          </Button>
        </div>
        <div className="mb-8 w-full max-w-sm rounded-md border border-foreground/50 p-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <p className="text-base font-normal leading-8 text-gray-400 md:text-xl">
              Sub Total
            </p>
            <h6 className="text-base font-semibold leading-8 text-gray-900 md:text-xl">
              ${subTotal.toFixed(2)}
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
          {discountAmount > 0 && (
            <div className="flex w-full items-center justify-between py-6">
              <p className="text-base font-normal leading-8 text-green-500 md:text-xl">
                Discount Applied
              </p>
              <h6 className="text-base font-semibold leading-8 text-green-500 md:text-xl">
                -${discountAmount.toFixed(2)}
              </h6>
            </div>
          )}
          <div className="flex w-full items-center justify-between py-6">
            <p className="text-lg font-medium leading-9 text-gray-900 md:text-2xl">
              Total
            </p>
            <h6 className="text-lg font-medium leading-9 md:text-2xl">
              ${total.toFixed(2)}
            </h6>
          </div>
          <Button className="w-full" onClick={navigateToCheckout}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};

export { Cart };
