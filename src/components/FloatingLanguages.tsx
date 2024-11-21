import { motion } from 'framer-motion';

const languages = [
  {
    name: 'JavaScript',
    icon: '⚡',
    color: '#F7DF1E',
  },
  {
    name: 'Python',
    icon: '🐍',
    color: '#3776AB',
  },
  {
    name: 'Java',
    icon: '☕',
    color: '#007396',
  },
  {
    name: 'TypeScript',
    icon: '📘',
    color: '#3178C6',
  },
  {
    name: 'React',
    icon: '⚛️',
    color: '#61DAFB',
  },
];

export const FloatingLanguages = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {languages.map((lang, index) => {
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.2;
        const angle = (index / languages.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={lang.name}
            className="absolute left-1/2 top-1/2 flex items-center justify-center"
            animate={{
              x: [x, x + 30, x],
              y: [y, y + 30, y],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          >
            <motion.div
              className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-3 shadow-lg"
              whileHover={{ scale: 1.2 }}
              animate={{
                boxShadow: [
                  `0 0 20px ${lang.color}33`,
                  `0 0 40px ${lang.color}66`,
                  `0 0 20px ${lang.color}33`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-2xl sm:text-3xl md:text-4xl mb-1">{lang.icon}</span>
              <span className="text-xs sm:text-sm text-white/80">{lang.name}</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};