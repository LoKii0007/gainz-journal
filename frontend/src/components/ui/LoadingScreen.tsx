import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <img src="/images/treadmill.gif" alt="loading" className="md:w-16 md:h-16 w-12 h-12" />
      </motion.div>
    </div>
  );
};

export default LoadingScreen; 