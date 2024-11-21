import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

export const ProjectCard = ({ title, description, image, link }: ProjectCardProps) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl bg-gray-900/50 p-6 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.a>
  );
};