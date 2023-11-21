import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import order from "@/public/order.json";

export default function OrderAnimation() {
  return (
    <div className="flex flex-col items-center justify-normal p-12">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Preparing Your Order ✨
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Player autoplay loop src={order} />
      </motion.div>
    </div>
  );
}
