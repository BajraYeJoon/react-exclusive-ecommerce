import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Axios } from "../../../common/lib/axiosInstance";
import { deleteAllCartItems } from "../../api/cartApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../common/ui/card";
import { Input } from "../../../common/ui/input";
import { Label } from "../../../common/ui/label";
import { checkoutState } from "../../atoms/checkoutState";
import { cartState } from "../../atoms/cartState";
import { orderplaceState } from "../../atoms/orderplaceState";
import { couponState } from "../../site";
import { generateInvoice } from "./generateInvoice";
// import { submitKhaltiPayment } from "./khalitPayment";
import { OrderSummary } from "./orderSummary";

type FormValues = {
  fullName: string;
  streetAddress: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  paymentMethod: "bank" | "cash" | "khalti";
};

export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
  total: number;
};

export type OrderData = {
  id: string | undefined;
  itemId: CartItem[];
  totalPrice: number;
  billingInfo: {
    firstname: string;
    lastname: string;
    country: string;
    streetaddress: string;
    postalcode: string;
    phone: string;
    email: string;
  };
  paymentMethod: string;
  discount: number;
};

type KhaltiOrderData = {
  itemId: string[];
  totalPrice: number;
  billingInfo: {
    firstname: string;
    lastname: string;
    country: string;
    streetaddress: string;
    postalcode: string;
    phone: string;
    email: string;
  };
};

export default function Checkout() {
  const { register, handleSubmit } = useForm<FormValues>();
  const checkoutValues = useRecoilValue(checkoutState);
  const resetCartAfterOrderPlace = useSetRecoilState(cartState);
  const resetCheckoutCartAfterOrderPlace = useSetRecoilState(checkoutState);
  const navigate = useNavigate();
  const [, setOrderPlaceData] = useRecoilState(orderplaceState);
  const couponCode = useRecoilValue(couponState);
  const queryClient = useQueryClient();

  const setCheckoutData = useSetRecoilState(checkoutState);

  useEffect(() => {
    const storedData = Cookies.get("checkoutData");
    if (storedData) {
      setCheckoutData(JSON.parse(storedData));
    }
  }, [setCheckoutData]);

  const removeCartAfterOrderPlace = useMutation({
    mutationFn: deleteAllCartItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  const paymentMutation = useMutation<any, any, KhaltiOrderData>({
    mutationFn: (orderData: KhaltiOrderData) =>
      Axios.post("/payment/initialize-payment", orderData),
    onSuccess: () => {
      toast.success("Payment successful");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again later.");
    },
  });

  function extractKhaltiOrderData(orderData: OrderData): KhaltiOrderData {
    const { itemId, totalPrice, billingInfo } = orderData;
    return {
      itemId: itemId.map((item) => item.id),
      totalPrice,
      billingInfo,
    };
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const orderData: OrderData = {
        id: Date.now().toString(),
        itemId: checkoutValues.cartItems,
        totalPrice: checkoutValues.cartTotal,
        billingInfo: {
          firstname: data.fullName.split(" ")[0],
          lastname: data.fullName.split(" ")[1] || "",
          country: data.country || "Nepal",
          streetaddress: data.streetAddress,
          postalcode: data.postalCode,
          phone: data.phone,
          email: data.email,
        },
        paymentMethod: data.paymentMethod,
        discount: couponCode ? 10 : 0,
      };

      console.log(orderData, "orderdatatatatata");

      if (data.paymentMethod === "khalti") {
        const khaltiOrderData = extractKhaltiOrderData(orderData);
        try {
          const initializePaymentResponse =
            await paymentMutation.mutateAsync(khaltiOrderData);
          console.log(
            "Payment initialization response:",
            initializePaymentResponse,
          );

          if (initializePaymentResponse.data) {
            const { signature, signed_field_names } =
              initializePaymentResponse.data.paymentInitiate;
            const { transaction_uuid } = initializePaymentResponse.data;
            const total_amount =
              initializePaymentResponse.data.purchasedProduct.totalPrice;

            // Create and submit the form
            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
            form.style.display = "none";

            const fields = {
              amount: total_amount.toString(),
              tax_amount: "0",
              total_amount: total_amount.toString(),
              transaction_uuid: transaction_uuid,
              product_code: "EPAYTEST",
              product_service_charge: "0",
              product_delivery_charge: "0",
              success_url: "https://exlusivenp.vercel.app/verifyPayment",
              failure_url: "https://developer.esewa.com.np/failure",
              signed_field_names: signed_field_names,
              signature: signature,
            };

            Object.entries(fields).forEach(([key, value]) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = value;
              form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
            console.log("Khalti payment form submitted");

            return;
          }
        } catch (khaltiError) {
          console.error("Khalti payment initialization error:", khaltiError);
          toast.error("Failed to initialize Khalti payment. Please try again.");
          return;
        }
      } else {
        generateInvoice(orderData);
      }

      setOrderPlaceData(orderData);
      resetCheckoutCartAfterOrderPlace({
        cartItems: [],
        cartTotal: 0,
        subTotal: 0,
      });
      Cookies.remove("checkoutData");
      await removeCartAfterOrderPlace.mutateAsync();
      resetCartAfterOrderPlace([]);
      Cookies.set("order-placed", "true");

      navigate("/order-placed", { replace: true });
      toast.success("Thank you for shopping with us!");
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <section className="mx-64 my-12 max-2xl:mx-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 md:grid-cols-2"
      >
        <BillingDetailsForm register={register} />
        <OrderSummary
          checkoutValues={checkoutValues}
          couponCode={couponCode}
          register={register}
        />
      </form>
    </section>
  );
}

const BillingDetailsForm = ({ register }: any) => (
  <Card className="order-2 grid border-none bg-background shadow-none md:order-1">
    <CardHeader className="p-0 px-6 pb-4">
      <CardTitle className="font-light tracking-wider">
        Billing Details
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {[
        "fullName",
        "streetAddress",
        "country",
        "postalCode",
        "phone",
        "email",
      ].map((field) => (
        <div key={field} className="space-y-2">
          <Label
            htmlFor={field}
            className="font-ember text-sm text-foreground/40"
          >
            {field.charAt(0).toUpperCase() +
              field.slice(1).replace(/([A-Z])/g, " $1")}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id={field}
            {...register(field, { required: `${field} is required` })}
            className="bg-gray-50"
            type={
              field === "email" ? "email" : field === "phone" ? "tel" : "text"
            }
          />
        </div>
      ))}
    </CardContent>
  </Card>
);
