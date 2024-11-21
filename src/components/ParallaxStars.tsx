import { motion } from 'framer-motion';

export const ParallaxStars = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Dynamic stars */}
      {[...Array(100)].map((_, i) => {
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            initial={{
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
            }}
            animate={{
              x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
              y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: duration * 10,
              delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            style={{
              width: size,
              height: size,
              backgroundColor: `hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
              boxShadow: `0 0 ${size * 2}px ${size}px hsl(${Math.random() * 60 + 200}, 100%, 70%)`,
            }}
          />
        );
      })}
    </div>
  );
};