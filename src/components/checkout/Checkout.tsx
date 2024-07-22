import { useRecoilValue } from "recoil";
import { checkoutState } from "../../atoms/checkoutState";
import { Button } from "../ui/button";
import { Fragment } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import { orderplaceState } from "../../atoms/orderplaceState";
import { useRecoilState } from "recoil";

const Checkout = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const checkoutValues = useRecoilValue(checkoutState);

  const [orderPlaceData, setOrderPlaceData] = useRecoilState(orderplaceState);

  // console.log(checkoutValues, "checkoutValues");

  const onSubmit = (data: any) => {
    setOrderPlaceData(data);
    console.log(data, "order data");
  };

  console.log(orderPlaceData, "orderPlaceData from recoil");

  return (
    <section className="mb-28 mt-32 lg:mx-72">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-2 items-start justify-between gap-24"
      >
        <div className="flex flex-col gap-8">
          <h2 className="text-lg lg:text-3xl">Billing Details</h2>

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
        <div className="flex flex-col gap-8">
          {checkoutValues.cartItems.map(
            (
              cartData: { image: string; title: string; price: number },
              index,
            ) => (
              <Fragment key={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <img src={cartData.image} alt="" className="h-12 w-12" />
                    <h4>{cartData.title}</h4>
                  </div>

                  <p>${cartData.price}</p>
                </div>
              </Fragment>
            ),
          )}

          <div className="flex items-center justify-between border-b pb-3">
            <h3>Shipping:</h3>
            <p>$45</p>
          </div>

          <div className="flex items-center justify-between">
            <h4>Total:</h4>
            <p>${checkoutValues.total}</p>
          </div>

          <div className="flex flex-col gap-4 space-y-4" id="group">
            <div className="flex items-center justify-between">
              <div className="space-x-3">
                <input type="radio" name="group" />
                <label htmlFor="bank">Bank</label>
              </div>
              <img src={"/card.png"} alt="" className="h-6" />
            </div>
            <div className="space-x-3">
              <input type="radio" name="group" />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
          </div>

          <Button type="submit">Place Order</Button>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
