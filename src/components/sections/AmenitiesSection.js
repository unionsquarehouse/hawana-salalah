"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaUmbrellaBeach, FaShip, FaWater, FaUtensils } from "react-icons/fa";

const amenitiesData = [
  {
    name: "Pristine Beaches",
    icon: <FaUmbrellaBeach />,
    description:
      "Relax on over 7km of pristine white sandy beaches along the Arabian Sea, offering serene beauty and endless leisure.",
    image: "/assets/hawana/6.jpg",
  },
  {
    name: "Hawana Marina",
    icon: <FaShip />,
    description:
      "Experience vibrant waterfront living at our world-class marina, perfect for boating, dining, and stunning views.",
    image: "/assets/hawana/8.jpg",
  },
  {
    name: "Hawana Aqua Park",
    icon: <FaWater />,
    description:
      "Dive into fun at the 65,000 sqm Hawana Aqua Park, featuring thrilling slides, pools, and family-friendly attractions.",
    image: "/assets/hawana/aqua-park.jpg",
  },
  {
    name: "Restaurants & Dining",
    icon: <FaUtensils />,
    description:
      "Savor diverse culinary experiences at our restaurants and cafes, with exclusive discounts via the Hawana Benefit Card.",
    image: "/assets/hawana/dining.webp",
  },
];

export default function AmenitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate images
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % amenitiesData.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-brand/5 to-white text-brand pt-16 md:py-20 xl:py-28 overflow-hidden relative"
    >
      <div className="w-[95vw] 2xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-left lg:text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl 2xl:text-6xl font-ivy font-bold mb-4 text-brand">
            Discover Hawana Salalah’s World-Class Amenities
          </h2>
          <div className="h-0.5 w-24 bg-brand mb-6 lg:mx-auto" />
          <p className="w-[90vw] lg:w-[65vw] xl:w-[45vw] text-base md:text-lg xl:text-xl font-sans text-brand lg:mx-auto">
            Indulge in luxury and leisure with pristine beaches, a vibrant
            marina, thrilling water adventures, and exquisite dining, all within
            Oman’s fastest-growing destination.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 mx-auto items-stretch">
          {/* Left side - Image display */}
          <motion.div
            className="lg:col-span-6 relative rounded-lg overflow-hidden shadow-md h-full min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[520px]"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {amenitiesData.map((amenity, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  scale: activeIndex === index ? 1 : 1.05,
                }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src={amenity.image}
                  alt={amenity.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      activeIndex === index
                        ? { opacity: 1, y: 0 }
                        : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h3 className="text-white text-xl md:text-2xl xl:text-3xl font-ivy mb-2">
                      {amenity.name}
                    </h3>
                    <div className="h-0.5 w-12 bg-white/70 mb-4" />
                    <p className="text-white/90 text-sm md:text-base xl:text-base font-sans">
                      {amenity.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Image indicators */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              {amenitiesData.map((amenity, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                    activeIndex === index ? "bg-brand" : "bg-white/40"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.5 }}
                  aria-label={`Select ${amenity.name}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right side - Amenities list */}
          <motion.div
            className="hidden lg:block lg:col-span-6 h-full min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[520px]"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-lg shadow-md border border-brand/20 h-full flex flex-col">
              <h3 className="text-lg md:text-xl xl:text-2xl font-ivy mb-4 md:mb-6 font-semibold text-brand">
                Hawana Salalah Amenities
              </h3>
              <div className="space-y-4 flex-1 overflow-auto pr-1">
                {amenitiesData.map((amenity, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 md:p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-brand text-white"
                        : "bg-brand/5 hover:bg-brand/10 hover:shadow-md"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: 1.02 }}
                    aria-label={`View ${amenity.name} details`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-xl md:text-2xl ${
                          activeIndex === index ? "text-white" : "text-brand"
                        }`}
                      >
                        {amenity.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm md:text-base 2xl:text-lg">
                          {amenity.name}
                        </h4>
                        {activeIndex === index && (
                          <motion.p
                            className="text-sm md:text-base xl:text-base font-sans mt-2 text-white/80"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.3 }}
                          >
                            {amenity.description}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
