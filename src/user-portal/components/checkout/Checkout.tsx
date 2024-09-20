import React from "react";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { Button } from "../../../common/ui/button";
import { Axios } from "../../../common/lib/axiosInstance";
import { checkoutState } from "../../atoms/checkoutState";
import { orderplaceState } from "../../atoms/orderplaceState";
import { cartState } from "../../atoms/cartState";
import { couponState } from "../../site";
import { deleteAllCartItems } from "../../api/cartApi";
import { Input } from "../../../common/ui/input";

type FormValues = {
  fullName: string;
  streetaddress: string;
  country: string;
  postalcode: string;
  phone: string;
  email: string;
  paymentMethod: "bank" | "cash" | "khalti";
};

const Checkout: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const checkoutValues = useRecoilValue(checkoutState);
  const resetCartAfterOrderPlace = useSetRecoilState(cartState);
  const resetCheckoutCartAfterOrderPlace = useSetRecoilState(checkoutState);
  const navigate = useNavigate();
  const [, setOrderPlaceData] = useRecoilState(orderplaceState);
  const couponCode = useRecoilValue(couponState);
  const queryClient = useQueryClient();

  const removeCartAfterOrderPlace = useMutation({
    mutationFn: deleteAllCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const paymentMutation = useMutation({
    mutationFn: (orderData: any) =>
      Axios.post("/payment/intialize-payment", orderData),
    onSuccess: () => {
      toast.success("Payment successful");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const generateInvoice = (orderData: any) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Invoice", 10, 10);

    doc.setFontSize(12);
    doc.text(`Order ID: ${orderData.id}`, 10, 20);
    doc.text(`Total: $${orderData.total}`, 10, 30);
    doc.text(`Shipping: $${orderData.shipping}`, 10, 40);
    doc.text(`Payment Method: ${orderData.paymentMethod}`, 10, 50);

    const products = orderData.products.map((item: any) => [
      item.title,
      `$${item.price}`,
    ]);

    autoTable(doc, {
      head: [["Product", "Price"]],
      body: products,
      startY: 60,
    });

    doc.save(`invoice_${orderData.id}.pdf`);
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const orderData = {
      itemId: productData.map((item) => item.id),
      totalPrice: checkoutValues.total,
      billingInfo: {
        firstname: data.fullName.split(" ")[0],
        lastname: data.fullName.split(" ")[1] || "",
        country: data.country || "Nepal",
        streetaddress: data.streetaddress,
        postalcode: data.postalcode,
        phone: data.phone,
        email: data.email,
      },
    };

    try {
      if (data.paymentMethod === "khalti") {
        await paymentMutation.mutateAsync(orderData);
      }

      if (couponCode) {
        await Axios.post("/coupon/apply", { couponCode: couponCode });
      }

      toast.success("Order placed successfully");
      setOrderPlaceData(orderData);
      reset();
      resetCheckoutCartAfterOrderPlace({ cartItems: [], total: 0 });
      Cookies.remove("checkoutData");
      await removeCartAfterOrderPlace.mutateAsync();
      resetCartAfterOrderPlace([]);
      Cookies.set("order-placed", "true");
      navigate("/order-placed", {
        replace: true,
      });

      generateInvoice(orderData);
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  const productData = checkoutValues.cartItems.map((item: any) => item.product);

  return (
    <section className="mx-64 mb-28 mt-12 max-2xl:mx-6 lg:mt-32">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col-reverse justify-between gap-12 md:flex-row md:gap-8"
      >
        <div className="flex w-full flex-col gap-8">
          <h2 className="text-sm md:text-lg lg:text-3xl">Billing Details</h2>

          <div className="checkout-info-content flex flex-col space-y-4">
            <div className="flex w-full flex-col gap-12">
              <Input
                type="text"
                placeholder="Full Name"
                {...register("fullName", { required: "Full Name is required" })}
              />
              <Input
                type="text"
                placeholder="Street Address"
                {...register("streetaddress", {
                  required: "Street Address is required",
                })}
              />
              <Input
                type="text"
                placeholder="Country"
                {...register("country", { required: "Country is required" })}
              />
              <Input
                type="text"
                placeholder="Postal Code"
                {...register("postalcode", {
                  required: "Postal Code is required",
                })}
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                {...register("phone", { required: "Phone Number is required" })}
              />
              <Input
                type="email"
                placeholder="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-4 md:gap-7 lg:gap-8">
          {/* Product list rendering */}
          {productData.map((cartData, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2 lg:gap-5">
                <img
                  src={cartData.image[0]}
                  alt="cart images"
                  className="h-10 w-10 md:h-12 md:w-12"
                />
                <h4 className="text-xs md:text-lg lg:text-base">
                  {cartData.title}
                </h4>
              </div>
              <p className="text-sm md:text-lg lg:text-xl">${cartData.price}</p>
            </div>
          ))}

          <div className="flex items-center justify-between border-b pb-3 text-sm lg:text-base">
            <h3>Shipping:</h3>
            <p>$45</p>
          </div>

          <div className="flex items-center justify-between text-sm lg:text-base">
            <h4>Total:</h4>
            <p>${checkoutValues.total}</p>
          </div>

          <div
            className="flex flex-col gap-4 text-sm lg:gap-4 lg:text-xl"
            id="group"
          >
            <div className="flex items-center justify-between">
              <div className="space-x-3">
                <input
                  type="radio"
                  value="bank"
                  {...register("paymentMethod", { required: true })}
                />
                <label htmlFor="bank">Bank</label>
              </div>
              <img
                src="/card.png"
                alt="payment card images"
                className="h-4 lg:h-6"
              />
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                value="cash"
                {...register("paymentMethod", { required: true })}
              />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                value="khalti"
                {...register("paymentMethod", { required: true })}
              />
              <label htmlFor="khalti">Pay with Khalti</label>
            </div>
          </div>

          <Button type="submit" className="w-full md:w-fit">
            Place Order
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
