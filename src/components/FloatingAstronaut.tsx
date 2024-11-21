import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export const FloatingAstronaut = () => {
  return (
    <motion.div
      className="fixed bottom-10 right-10 text-white"
      animate={{
        y: [0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <Rocket size={48} className="transform rotate-45 relative" />
    </motion.div>
  );
};