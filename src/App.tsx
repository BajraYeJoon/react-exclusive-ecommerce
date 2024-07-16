

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
    // <main className="mx-auto">
    //   <Banner />
    //   <Navbar />
    //   <div className="flex flex-col gap-40 max-3xl:gap-32 max-2xl:gap-28 mb-28 mx-72 max-3xl:mx-24 max-2xl:mx-14 ">
    //     <Hero />
    //     <SalesCard />
    //     <Category />
    //     <BestProducts />
    //   </div>
    // </main>
  );
}

export default App
