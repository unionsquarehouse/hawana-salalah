"use client";
import Image from "next/image";
import Button from "../Button";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center">
      {/* Background Video */}
      <video
        src="/assets/hawana/hawana.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/hawana/hero-fallback.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay */}

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        

        {/* CTAs in Bottom-Right */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-8 right-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <motion.div variants={itemVariants}>
            <Button
              href="/properties"
              variant="solid"
              size="lg"
              className="bg-brand text-white hover:bg-brand/90 px-6 py-3 rounded-lg text-base font-sans"
              aria-label="Explore Amazi Properties"
            >
              Explore Properties
            </Button>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand px-6 py-3 rounded-lg text-base font-sans"
              aria-label="Book a Tour"
            >
              Book a Tour
            </Button>
          </motion.div>
        </motion.div>

       
      </div>
    </section>
  );
}