import { useRecoilValue, useSetRecoilState } from "recoil";
import { checkoutState } from "../../atoms/checkoutState";
import { Button } from "../../../common/ui/button";
import { Fragment } from "react/jsx-runtime";
import { FieldValues, useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { orderplaceState } from "../../atoms/orderplaceState";
import { useRecoilState } from "recoil";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cartState } from "../../atoms/cartState";
import Cookies from "js-cookie";
import axios from "axios";
import { v4 as uuid } from "uuid";

const Checkout = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const checkoutValues = useRecoilValue(checkoutState);
  const resetCartAfterORderPlace = useSetRecoilState(cartState);
  const resetCheckoutCartAfterOrderPlace = useSetRecoilState(checkoutState);
  const Navigate = useNavigate();
  const [, setOrderPlaceData] = useRecoilState(orderplaceState);

  const onSubmit = (data: FieldValues) => {
    if (data.paymentMethod === "khalti") {
      const payload = {
        return_url: "http://localhost:5173/order-placed",
        website_url: "http://localhost:5173",
        amount: checkoutValues.total,
        purchase_order_id: uuid().toString().substring(2, 15),
        purchase_order_name: "Order",
        customer_info: {
          name: data.fullName,
          email: data.email,
          phone: data.phoneNumber,
        },
      };

      const sendData = async () => {
        const res = await axios.post("/epayment/initiate/", payload, {
          headers: {
            Authorization: "Key c41315ed137f4f29be00330b856b3cf7",
          },
        });
        console.log(res);
      };
      sendData();
    }

    const orderData = {
      id: uuid().toString().substring(2, 15),
      billingInfo: data,
      products: checkoutValues.cartItems,
      shipping: 45,
      total: checkoutValues.total,
      paymentMethod: data.paymentMethod,
    };

    toast.success("Order placed successfully");
    setOrderPlaceData(orderData);
    reset();
    resetCheckoutCartAfterOrderPlace({ cartItems: [], total: 0 });
    Cookies.remove("checkoutData");
    resetCartAfterORderPlace([]);
    Cookies.set("order-placed", "true");
    Navigate("/order-placed");
  };

  return (
    <section className="mx-8 mb-28 mt-12 md:mx-12 lg:mx-72 lg:mt-32">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 items-start justify-between gap-24 md:grid-cols-2"
      >
        <div className="order-1 flex flex-col gap-8 md:order-2">
          <h2 className="text-sm md:text-lg lg:text-3xl">Billing Details</h2>

          <div className="checkout-info-content flex flex-col space-y-4">
            {" "}
            <div className="flex w-full flex-col gap-12">
              <FormInput
                type="text"
                placeholder="Name"
                name="fullName"
                register={register}
                error={errors.fullName}
              />
              <FormInput
                type="text"
                placeholder="Company Name"
                name="companyName"
                register={register}
                error={errors.companyName}
              />
              <FormInput
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                register={register}
                error={errors.streetAddress}
              />
              <FormInput
                type="text"
                placeholder="Apartment, suite, unit etc. (optional)"
                name="apartment"
                register={register}
                error={errors.apartment}
              />
              <FormInput
                type="text"
                placeholder="Town / City"
                name="city"
                register={register}
                error={errors.city}
              />

              <FormInput
                type="number"
                placeholder="Phone Number"
                name="phoneNumber"
                register={register}
                error={errors.phoneNumber}
              />
              <FormInput
                type="email"
                placeholder="Email Address"
                name="email"
                register={register}
                error={errors.email}
              />
            </div>
            <div>
              <input type="checkbox" name="save" id="save" />
              <label htmlFor="save">Save this information for next time</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-7 lg:gap-8">
          {checkoutValues.cartItems.map(
            (
              cartData: { image: string; title: string; price: number },
              index,
            ) => (
              <Fragment key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 lg:gap-5">
                    <img
                      src={cartData.image}
                      alt=""
                      className="h-10 w-10 md:h-12 md:w-12"
                    />
                    <h4 className="text-xs md:text-lg lg:text-xl">
                      {cartData.title}
                    </h4>
                  </div>

                  <p className="text-sm md:text-lg lg:text-xl">
                    ${cartData.price}
                  </p>
                </div>
              </Fragment>
            ),
          )}

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
                  {...register("paymentMethod")}
                />
                <label htmlFor="bank">Bank</label>
              </div>
              <img src={"/card.png"} alt="" className="h-4 lg:h-6" />
            </div>
            <div className="space-x-3">
              <input type="radio" value="cash" {...register("paymentMethod")} />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            <div className="space-x-3">
              <input
                type="radio"
                value="khalti"
                {...register("paymentMethod")}
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
