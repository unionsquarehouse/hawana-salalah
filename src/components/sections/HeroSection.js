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
    <section className="relative aspect-video ">
      {/* Background Video (desktop/tablet) */}
      <video
        src="/assets/hawana/hawana.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/hawana/hawana.webp"
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
      />

      {/* Mobile fallback image */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="/assets/hawana/hawana.webp"
          alt="Hawana Salalah"
          fill
          className="object-cover"
        />
      </div>

      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {/* CTAs: bottom-center on mobile/tablet, bottom-right on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row gap-3 sm:gap-4 lg:bottom-8 lg:right-8 lg:left-auto lg:translate-x-0"
        >
          <motion.div variants={itemVariants} className="flex-1">
            <Button
              href="/properties"
              variant="solid"
              size="lg"
              className="bg-brand hidden md:block text-white hover:bg-brand/90 px-6 py-3 rounded-lg text-base font-sans w-[88vw] sm:w-auto sm:min-w-[200px]"
              aria-label="Explore Amazi Properties"
            >
              Explore Properties
            </Button>
          </motion.div>
          {/* Optional: add a second CTA if needed */}
        </motion.div>
      </div>
    </section>
  );
}
