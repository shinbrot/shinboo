import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Star } from 'lucide-react';
import { ParallaxStars } from './components/ParallaxStars';
import { FloatingAstronaut } from './components/FloatingAstronaut';
import { ProjectCard } from './components/ProjectCard';
import { OrbitingPlanets } from './components/OrbitingPlanets';
import { FloatingLanguages } from './components/FloatingLanguages';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1026] to-[#2B0548] text-white overflow-hidden">
      <ParallaxStars />
      <OrbitingPlanets />
      <FloatingLanguages />
      <FloatingAstronaut />
      
      {/* Hero Section */}
      <motion.header 
        className="min-h-screen flex items-center justify-center relative px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="text-center z-10 max-w-4xl mx-auto">
          {/* Profile Picture */}
          <motion.div
            className="mb-8 relative inline-block"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 1, delay: 0.2 }}
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-md"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://files.catbox.moe/96xjo5.jpeg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 relative"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Shinbo
            </motion.h1>
          </motion.div>
          <motion.p 
            className="text-xl sm:text-2xl text-gray-300 mb-8"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Full Stack Developer & Student
          </motion.p>
          
          <motion.div 
            className="flex gap-4 sm:gap-6 justify-center mt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { icon: Github, href: "https://github.com/shinbrot/" },
              { icon: Linkedin, href: "https://linkedin.com" },
              { icon: Mail, href: "mailto:yndazhangg@gmail.com" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="relative p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <item.icon className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
        </motion.div>
      </motion.header>

      {/* Projects Section */}
      <motion.section 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <ProjectCard
            title="Shenlle Ai"
            description="A Whatsapp-based interactive solar system keeper"
            image="https://files.catbox.moe/30zmdf.jpeg"
            link="https://wa.me/628319718038"
          />
          <ProjectCard
            title="Chizzy Chat"
            description="Real-time chat application with whatsappchat-based UI"
            image="https://files.catbox.moe/yixecq.jpeg"
            link="https://wa.me/6287780083832"
          />
          <ProjectCard
            title="Machine Learning"
            description="Still learning analytics dataset with python notebook"
            image="https://files.catbox.moe/699rls.png"
            link="#"
          />
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-gray-300 mb-8">
            Ready to embark on an interstellar journey together? Drop me a message!
          </p>
          
          {/* Wrap the button with an anchor tag to redirect to Instagram */}
          <a 
            href="https://www.instagram.com/yanda.ee"  // Replace with your Instagram URL
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // Security best practice
          >
            <motion.button
              className="relative px-6 sm:px-8 py-3 bg-purple-600 rounded-full font-semibold hover:bg-purple-700 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-400/50 to-pink-400/50 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <span className="relative z-10">Send Message</span>
            </motion.button>
          </a>
          
        </div>
      </motion.section>
    </div>
  );
}

export default App;
