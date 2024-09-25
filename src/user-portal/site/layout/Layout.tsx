import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Banner, Navbar, Footer } from "../../pages";
import { LoaderCircle, Gift, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";

export const Loading = () => {
  return (
    <div className="flex h-fit items-center justify-center">
      <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
      <span className="sr-only">Loading...</span>
    </div>
  );
};

const FloatingCard = () => {
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => setIsVisible(true), 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed right-4 top-4 z-50"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <div className="relative">
            <motion.div
              className="absolute left-1/2 w-0.5 -translate-x-1/2 transform bg-gray-400"
              initial={{ height: 0 }}
              animate={{ height: 60 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
            />
            <motion.div
              className="mt-[60px] rounded-lg border border-primary bg-white p-4 shadow-lg"
              initial={{ rotateZ: -10 }}
              animate={{ rotateZ: 0 }}
              transition={{
                delay: 0.4,
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
            >
              <button
                onClick={() => setIsVisible(false)}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white transition-colors hover:bg-red-600"
              >
                <X size={16} />
              </button>
              <div className="flex items-center space-x-2">
                <Gift className="text-primary" />
                <span className="font-bold text-primary">Dashain Offers!</span>
              </div>
              <p className="mt-2 text-sm">
                Special discounts for Dashain festival!
              </p>
              <button className="mt-2 rounded-md bg-primary px-3 py-1 text-sm text-white transition-colors hover:bg-primary/90">
                View Offers
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const PopupBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenBanner = Cookies.get("hasSeenBanner");
    if (!hasSeenBanner) {
      setIsVisible(true);
      Cookies.set("hasSeenBanner", "true", { expires: 1 });
    }
  }, []);

  const closeBanner = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden bg-black bg-opacity-70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative m-4 w-full max-w-xl rounded-lg bg-white p-6 shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <X
              size={24}
              onClick={closeBanner}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            />

            <div className="mb-4 flex justify-center">
              <img
                src="https://pbs.twimg.com/media/F8Z83E3XcAA0Hsm?format=jpg&name=large"
                alt="Special discount offer"
                className="h-[500px] w-[500px] rounded-md"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Layout = () => {
  return (
    <>
      <Banner />
      <Navbar />
      <FloatingCard />
      <PopupBanner />
      <Outlet />
      <Footer />
    </>
  );
};

export { Layout };
