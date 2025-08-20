import { motion } from "framer-motion";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

export default function HeroSection({ property, details, heroScale, heroOpacity }) {
  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: heroScale }}
      >
        <Image 
          src={details.image} 
          alt={property.name} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
      </motion.div>
      
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-20">
        <motion.div 
          className=""
          style={{ opacity: heroOpacity }}
        >
          <h1 className="text-5xl md:text-7xl font-ivy font-light text-white mb-6">
            {property.name}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            {details.description}
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
            <span className="text-white text-sm font-medium">{details.specs}</span>
          </div>
        </motion.div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div 
            className="flex flex-col items-center text-white/70"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <span className="text-xs uppercase tracking-widest mb-2">Scroll to explore</span>
            <FaChevronDown />
          </motion.div>
        </div>
      </div>
    </div>
  );
}