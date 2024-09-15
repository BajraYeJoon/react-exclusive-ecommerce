'use client'

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { atom, selector, useRecoilState, useRecoilValue } from "recoil"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { v4 as uuid } from "uuid"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { CustomBreakcrumb } from "../../components"
import { checkoutState } from "../../atoms/checkoutState"
import { fetchCart } from "../../api/cartApi"
import { useClearCart, useDecreaseQuantity, useIncreaseQuantity, useRemoveItem } from "../../utils/cartutils"
import { ProductCardSkeleton } from "../../../common/components"
import { ConfirmationDialog } from "../../../admin/components"
import { Axios } from "../../../common/lib/axiosInstance"
import { toast } from "sonner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../common/ui/table"
import { Button } from "../../../common/ui/button"
import { Input } from "../../../common/ui/input"

// Define discountState atom
const discountState = atom<{ type: 'fixed' | 'percentage', value: number }>({
  key: "discountState",
  default: { type: 'fixed', value: 0 },
})

const Cart = () => {
  const [, setCheckoutData] = useRecoilState(checkoutState)
  const [discount, setDiscount] = useRecoilState(discountState)
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState("")

  // Fetch cart items
  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  })

  // Fetch available coupons
  const { data: coupons, isLoading: loadingCoupons } = useQuery({
    queryKey: ["coupons"],
    queryFn: () => Axios.get("/coupon").then((res) => res.data),
  })

  console.log(coupons, 'coupons')


  // Mutation hooks for cart operations
  const { mutate: increaseQuantity } = useIncreaseQuantity()
  const { mutate: decreaseQuantity } = useDecreaseQuantity()
  const { mutate: removeItem } = useRemoveItem()
  const { mutate: clearCart } = useClearCart()

  const handleQuantityChange = (id: number, type: "add" | "sub") => {
    if (type === "add") {
      increaseQuantity({ id, type })
    } else {
      decreaseQuantity({ id, type })
    }
  }

  const navigateToCheckout = (cartItems: any, total: number) => {
    const checkoutData = {
      id: uuid().toString().substring(2, 15),
      cartItems,
      total,
      couponCode,
      discount: discount.value,
    }

    setCheckoutData(checkoutData)
    Cookies.set("checkoutData", checkoutData.id)

    navigate("/checkout")
  }

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value)
  }

  const validateCoupon = (code: string) => {
    const coupon = coupons?.find((coupon) => coupon.code === code)
    if (coupon) {
      setDiscount({ type: coupon.type, value: coupon.value })
      return true
    }
    return false
  }

  const handleApplyCoupon = () => {
    if (validateCoupon(couponCode)) {
      toast.success(
        "Coupon applied successfully"
      )
    } else {
      toast.error(
        "Invalid coupon code"
      )
    }
  }

  const calculateTotal = selector({
    key: "CalculateTotal",
    get: ({ get }) => {
      const discountInfo = get(discountState)
      const subTotal = Array.isArray(cartItems)
        ? cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
        : 0
      const charge = 45
      let discountAmount = 0
      
      if (discountInfo.type === 'fixed') {
        discountAmount = discountInfo.value
      } else if (discountInfo.type === 'percentage') {
        discountAmount = subTotal * (discountInfo.value / 100)
      }

      return {
        subTotal,
        discountAmount,
        total: subTotal + charge - discountAmount,
      }
    },
  })

  const total = useRecoilValue(calculateTotal)

  if (cartItems === undefined || cartItems.length === 0) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 lg:h-[90vh]">
        <h1 className="flex flex-col text-3xl font-semibold text-gray-400">
          No items in cart
        </h1>
        <Link to="/products" className="underline">
          Add some products from here...
        </Link>
      </div>
    )
  }

  if (isLoading || loadingCoupons) {
    return <ProductCardSkeleton />
  }

  return (
    <section className="relative mx-8 my-6 h-fit md:mx-12 md:my-12 lg:mx-auto lg:max-w-7xl">
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
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image[0]}
                    alt={item.product.title}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <span className="font-medium">{item.product.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                ${item.product.price.toFixed(2)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.product.id, "sub")}
                    disabled={item.quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Input
                    type="text"
                    value={item.quantity}
                    readOnly
                    className="w-12 text-center"
                    aria-label={`Quantity of ${item.product.title}`}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(item.product.id, "add")}
                    disabled={item.quantity >= item.product.stock}
                    aria-label="Increase quantity"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
              </TableCell>
              <TableCell>
                <ConfirmationDialog
                  triggerText={<Trash2 className="h-4 w-4" />}
                  title="Remove Item"
                  description="Are you sure you want to remove this item from your cart?"
                  onConfirm={() => removeItem(item.product.id)}
                  confirmText="Remove"
                  cancelText="Cancel"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-8 flex flex-col items-center justify-between gap-12 md:flex-row md:items-start">
        <div className="flex flex-col items-center justify-center gap-3">
          <Input
            type="text"
            value={couponCode}
            onChange={handleCouponChange}
            placeholder="Enter Coupon Code"
            className="w-full"
          />
          <Button
            className="w-full"
            onClick={handleApplyCoupon}
          >
            Apply Coupon
          </Button>
        </div>
        <div className="mb-8 w-full max-w-sm rounded-md border border-foreground/50 p-6">
          <div className="mb-6 flex w-full items-center justify-between">
            <p className="text-base font-normal leading-8 text-gray-400 md:text-xl">
              Sub Total
            </p>
            <h6 className="text-base font-semibold leading-8 text-gray-900 md:text-xl">
              ${total.subTotal.toFixed(2)}
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
          {total.discountAmount > 0 && (
            <div className="flex w-full items-center justify-between py-6">
              <p className="text-base font-normal leading-8 text-green-500 md:text-xl">
                Discount Applied
              </p>
              <h6 className="text-base font-semibold leading-8 text-green-500 md:text-xl">
                -${total.discountAmount.toFixed(2)}
              </h6>
            </div>
          )}
          <div className="flex w-full items-center justify-between py-6">
            <p className="text-lg font-medium leading-9 text-gray-900 md:text-2xl">
              Total
            </p>
            <h6 className="text-lg font-medium leading-9 md:text-2xl">
              ${total.total.toFixed(2)}
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
  )
}

export { Cart }