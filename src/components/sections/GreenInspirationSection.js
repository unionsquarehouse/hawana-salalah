"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import Button from "../Button";

export default function InspirationSection() {
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
      className="pt-24 md:pt-32 bg-white relative overflow-hidden"
    >
      {/* Background pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/wave-pattern.png')] bg-repeat opacity-10"></div>
      </div> */}

      <div className="w-[95vw] xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Title and description */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <FaHome className="text-brand text-xl md:text-2xl" />
              <h3 className="text-brand font-medium uppercase tracking-wider text-sm md:text-xl">
                Investment Excellence
              </h3>
            </div>

            <h2 className="text-4xl md:text-6xl text-brand font-ivy font-bold mb-8 leading-tight">
              Invest in Hawana Salalah’s Coastal Paradise
            </h2>

            <div className="h-0.5 w-24 bg-brand mb-8" />

            <p className="text-brand text-sm md:text-lg mb-6 font-sans">
              Discover freehold properties at Hawana Salalah, Oman’s largest
              resort, with 7km of pristine beaches and vibrant communities like
              Amazi, Fanar Views, and Laguna Gardens. Enjoy Omani residency for
              all nationalities, 100% foreign ownership, and 0% personal income
              tax.
            </p>

            <p className="text-brand mb-8 text-sm md:text-lg font-sans">
              Backed by Muriya’s architectural excellence and Oman Vision 2040,
              Hawana Salalah offers a secure investment in the region’s
              fastest-growing tourism destination, blending luxury with
              sustainable living.
            </p>

            <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              <Button
                href="/properties"
                variant="solid"
                size="lg"
                className="bg-brand text-white hover:bg-brand/90 px-6 py-3 rounded-lg text-sm md:text-lg font-sans"
                aria-label="Explore Hawana Salalah properties"
              >
                Explore Properties
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column - Images */}
          <motion.div
            className="lg:col-span-7 relative"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-12 grid-rows-6 gap-3 h-[500px]">
              {/* Main large image */}
              <motion.div
                className="col-span-8 row-span-6 relative rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Image
                  src="/assets/hawana/23.jpg"
                  alt="Amazi oceanfront villas at Hawana Salalah"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white md:text-md font-sans font-medium">
                    Oceanfront villas and lagoon-front homes in vibrant
                    communities
                  </p>
                </div>
              </motion.div>

              {/* Top small image */}
              <motion.div
                className="col-span-4 row-span-3 relative rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Image
                  src="/assets/hawana/fanar-views.webp"
                  alt="Fanar Views lagoon-front homes"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Bottom small image */}
              <motion.div
                className="col-span-4 row-span-3 relative rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Image
                  src="/assets/hawana/22.jpg"
                  alt="Marina Bay apartments with marina views"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Decorative elements */}
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
