export enum UserRoutes {
  Home = "",
  About = "about",
  Contact = "contact",
  SignUp = "sign-up",
  SignIn = "sign-in",
  ForgotPassword = "forgot-password",
  EmailVerification = "/auth/verify-email",
  VerifyOtp = "verify-otp",
  Profile = "profile",
  Cart = "cart",
  Products = "products",
  NewArrivals = "new-arrivals",
  Favorites = "favorites",
  Checkout = "checkout",
  OrderPlaced = "order-placed",
  SingleProduct = ":productName/:productId",
  SingleCategory = "category/:categoryName/:categoryId",
  NotFound = "*",
}
