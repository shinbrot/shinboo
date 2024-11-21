import { motion } from 'framer-motion';

export const OrbitingPlanets = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute rounded-full border border-white/10"
          style={{
            width: `${(i + 1) * 300}px`,
            height: `${(i + 1) * 300}px`,
            left: '50%',
            top: '50%',
            marginLeft: `-${((i + 1) * 300) / 2}px`,
            marginTop: `-${((i + 1) * 300) / 2}px`,
          }}
        >
          <motion.div
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: `hsl(${i * 100}, 70%, 50%)`,
              boxShadow: `0 0 20px 2px hsl(${i * 100}, 70%, 50%)`,
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: (i + 1) * 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};