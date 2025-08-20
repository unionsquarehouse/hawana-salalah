"use client";
import Button from "../Button";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaCalendarAlt, FaFileDownload } from "react-icons/fa";

export default function CTASection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-brand text-white relative overflow-hidden"
    >
      {/* Background overlay */}

      <div className="w-[95vw] xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6 font-ivy"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Own Your Piece of Hawana Salalah
        </motion.h2>

        <motion.div
          className="h-0.5 w-32 bg-white mx-auto mb-8"
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.p
          className="text-white text-lg md:text-2xl font-sans mx-auto mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Book a private tour to explore Hawana Salalah’s luxurious freehold properties, from oceanfront villas to marina apartments, or download our brochure to discover Oman’s premier coastal destination.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand hover:border-white flex items-center px-6 py-3 text-lg rounded-lg"
              aria-label="Schedule a private tour of Hawana Salalah"
            >
              <FaCalendarAlt className="mr-2 text-lg" /> Schedule a Tour
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              href="/brochure"
              variant="solid"
              size="lg"
              className="bg-white text-brand hover:bg-brand hover:text-white hover:border hover:border-white flex items-center px-6 py-3 text-lg rounded-lg"
              aria-label="Download Hawana Salalah brochure"
            >
              <FaFileDownload className="mr-2 text-lg" /> Get Brochure
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}