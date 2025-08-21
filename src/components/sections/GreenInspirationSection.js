"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import Button from "../Button";

export default function InspirationSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const imageData = [
    {
      src: "/assets/hawana/23.jpg",
      alt: "Amazi oceanfront villas at Hawana Salalah",
      title: "Amazi",
      description:
        "Oceanfront villas and lagoon-front homes in vibrant communities",
    },
    {
      src: "/assets/hawana/fanar-views.webp",
      alt: "Fanar Views lagoon-front homes",
      title: "Fanar Views",
      description: "Lagoon-front homes with stunning water views",
    },
    {
      src: "/assets/hawana/22.jpg",
      alt: "Marina Bay apartments with marina views",
      title: "Marina Bay",
      description: "Apartments with spectacular marina and ocean views",
    },
  ];

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
      className="pt-16 md:py-20 xl:py-28 bg-white relative overflow-hidden"
    >
      {/* Background pattern */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/wave-pattern.png')] bg-repeat opacity-10"></div>
      </div> */}

      <div className="w-[95vw] xl:w-[85vw] 2xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile/Tablet heading at top */}
        <div className="lg:hidden mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <FaHome className="text-brand text-xl md:text-2xl" />
            <h3 className="text-brand font-medium uppercase tracking-wider text-sm md:text-xl">
              Investment Excellence
            </h3>
          </div>
          <h2 className="text-4xl xl:text-5xl text-brand font-ivy font-bold leading-tight text-left">
            Invest in Hawana Salalah's Coastal Paradise
          </h2>
          <div className="h-0.5 w-24 bg-brand mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Left column - Title and description */}
          <motion.div
            className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 h-full min-h-[280px] sm:min-h-[340px] md:min-h-[480px] lg:min-h-[520px] text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="hidden lg:flex items-center gap-3 mb-6">
              <FaHome className="text-brand text-xl md:text-2xl" />
              <h3 className="text-brand font-medium uppercase tracking-wider text-sm md:text-xl">
                Investment Excellence
              </h3>
            </div>

            <h2 className="hidden lg:block text-4xl 2xl:text-6xl text-brand font-ivy font-bold mb-4 leading-tight">
              Invest in Hawana Salalah's Coastal Paradise
            </h2>

            <div className="hidden lg:block h-0.5 w-24 bg-brand mb-8" />

            <p className="text-brand text-sm md:text-lg mb-6 font-sans">
              Discover freehold properties at Hawana Salalah, Oman's largest
              resort, with 7km of pristine beaches and vibrant communities like
              Amazi, Fanar Views, and Laguna Gardens. Enjoy Omani residency for
              all nationalities, 100% foreign ownership, and 0% personal income
              tax.
            </p>

            <p className="text-brand mb-8 text-sm md:text-lg font-sans">
              Backed by Muriya's architectural excellence and Oman Vision 2040,
              Hawana Salalah offers a secure investment in the region's
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
            className="lg:col-span-7 relative order-1 lg:order-2 h-full"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Mobile tabs */}
            <div className="lg:hidden flex gap-2 mb-4">
              {imageData.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all duration-300 ${
                    activeImageIndex === index
                      ? "bg-brand text-white"
                      : "bg-brand/10 text-brand hover:bg-brand/20"
                  }`}
                  aria-label={`View ${image.title}`}
                >
                  {image.title}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-12 md:grid-rows-6 gap-3 h-[280px] sm:h-[340px] md:h-[480px] lg:h-[520px]">
              {/* Main large image */}
              <motion.div
                className="md:col-span-8 md:row-span-6 col-span-1 row-span-1 relative rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Image
                  src={imageData[activeImageIndex].src}
                  alt={imageData[activeImageIndex].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white md:text-md font-sans font-medium text-left">
                    {imageData[activeImageIndex].description}
                  </p>
                </div>
              </motion.div>

              {/* Top small image */}
              <motion.div
                className="hidden md:block col-span-4 row-span-3 relative rounded-lg overflow-hidden shadow-lg"
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
                className="hidden md:block col-span-4 row-span-3 relative rounded-lg overflow-hidden shadow-lg"
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

            {/* Mobile CTA button */}
            <div className="lg:hidden mt-6">
              <Button
                href="/properties"
                variant="solid"
                size="lg"
                className="w-full bg-brand text-white hover:bg-brand/90 px-6 py-3 rounded-lg text-sm md:text-lg font-sans"
                aria-label="Explore Hawana Salalah properties"
              >
                Explore Properties
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
