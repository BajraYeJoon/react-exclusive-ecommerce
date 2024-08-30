import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";

export function NotFoundPage() {
  const router = useNavigate();

  const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
  };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="my-20 flex h-fit flex-col items-center justify-center md:my-32 lg:my-44"
    >
      <Player
        src={
          "https://lottie.host/01a5b89e-3b34-4b13-8ea2-ab8f97dab8a6/74mTSH4kVd.json"
        }
        className="player h-12 w-12 text-primary md:h-20 md:w-20 lg:h-32 lg:w-32"
        loop
        autoplay
      />
      <motion.h1
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        404 Not Found
      </motion.h1>
      <motion.p
        className="mt-6 text-center md:text-2xl"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        You just came to a place in void.
      </motion.p>

      <Button onClick={() => router("/")} className="mt-4">
        Go back to Home
        <HomeIcon className="ml-2" />
      </Button>
    </motion.div>
  );
}
