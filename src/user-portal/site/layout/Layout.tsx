import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { Banner, Navbar, Footer } from "../../pages";
import { LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";
import { fetchAllProducts } from "../../../common/api/productApi";

export const Loading = () => {
  return (
    <div role="status" className="flex h-fit items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

// const EnhancedLoadingScreen = () => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
//     >
//       <div className="text-center">
//         <motion.h1
//           className="mx-auto mb-8 text-4xl"
//           transition={{ repeat: Infinity, duration: 2 }}
//         >
//           Exclusive
//         </motion.h1>
//         <motion.h2
//           className="text-backgrund mb-4 text-2xl font-light"
//           animate={{ opacity: [1, 0.5, 1] }}
//           transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
//         >
//           Loading Amazing Deals...
//         </motion.h2>
//         <motion.div className="mx-auto h-2 w-48 overflow-hidden rounded-full bg-background bg-opacity-20">
//           <motion.div
//             className="h-full bg-background"
//             animate={{ x: ["-100%", "100%"] }}
//             transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
//           />
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

const Layout = () => {
  // const { isLoading, isError, error } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: fetchAllProducts,
  // });

  // if (isLoading) {
  //   return <EnhancedLoadingScreen />;
  // }

  // if (isError) {
  //   console.error("Error fetching data:", error);
  //   return (
  //     <div className="flex h-full items-center justify-center">
  //       <h2 className="text-xl font-bold text-red-500">
  //         Something went wrong. Please try again later.
  //       </h2>
  //     </div>
  //   );
  // }

  return (
    // <Suspense fallback={<EnhancedLoadingScreen />}>
    <>
      <Banner />
      <Navbar />
      <Outlet />
      <Footer />
    </>
    // </Suspense>
  );
};

export { Layout };
