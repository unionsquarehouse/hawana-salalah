"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { FaWater } from "react-icons/fa";

export default function OceanfrontBeautySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);

  const natureTabs = [
    {
      title: "Pristine Beaches",
      description:
        "Unwind on 7km of white sandy beaches along the Arabian Sea, where luxury meets natural serenity.",
      image: "/assets/hawana/beach.webp",
    },
    {
      title: "Turquoise Lagoons",
      description:
        "Explore tranquil lagoons winding through vibrant communities, offering stunning waterfront views.",
      image: "/assets/hawana/7.jpg",
    },
    {
      title: "World-Class Marina",
      description:
        "Experience vibrant living at Hawana’s marina, with boating, dining, and breathtaking coastal vistas.",
      image: "/assets/hawana/24.jpg",
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
      className="pt-24 md:pt-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
    >
      {/* Background decorative elements */}

      <div className="w-[95vw] xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaWater className="text-brand text-xl md:text-2xl" />
            <h3 className="text-brand font-medium uppercase tracking-wider text-sm md:text-xl">
              Residences Amidst Pristine Beaches and Lagoons
            </h3>
          </div>

          <h2 className="text-4xl md:text-6xl font-ivy font-bold text-brand mb-6">
            Discover Hawana Salalah’s Coastal Splendor
          </h2>

          <div className="h-0.5 w-24 bg-brand mx-auto mb-8" />

          <p className="w-[45vw] text-lg md:text-xl font-sans text-brand max-w-3xl mx-auto">
            Immerse yourself in Hawana Salalah’s luxurious residences,
            surrounded by pristine beaches, turquoise lagoons, and a vibrant
            marina, all within Oman’s fastest-growing destination.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left side - Image with overlay */}
          <motion.div
            className="lg:col-span-7 relative h-[500px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatedImage
              isVisible={isVisible}
              src={natureTabs[activeTab].image}
              alt={`${natureTabs[activeTab].title} at Hawana Salalah`}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8">
              <motion.div
                key={`tab-content-${activeTab}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white"
              >
                <h3 className="text-2xl font-ivy font-bold mb-4">
                  {natureTabs[activeTab].title}
                </h3>
                <p className="text-white/90">
                  {natureTabs[activeTab].description}
                </p>
              </motion.div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-8 right-8">
              <FaWater className="text-white/30 text-5xl" />
            </div>
          </motion.div>

          {/* Right side - Tabs and CTA */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="bg-white text-brand rounded-xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-ivy mb-6 font-semibold">
                Explore Coastal Features
              </h3>

              <div className="space-y-4 mb-8 font-semibold md:text-lg">
                {natureTabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center ${
                      activeTab === index
                        ? "bg-brand/10 border-l-4 border-brand"
                        : "bg-gray-50 hover:bg-gray-100 border-l-4 border-transparent"
                    }`}
                    aria-label={`View ${tab.title} details`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        activeTab === index ? "bg-brand" : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`${
                        activeTab === index ? "text-brand" : "text-gray-700"
                      }`}
                    >
                      {tab.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-6 border-t border-gray-200 font-sans">
                <p className="text-brand mb-6 text-sm md:text-lg">
                  Discover the perfect blend of luxury and nature. Explore
                  Hawana Salalah’s exclusive residences today.
                </p>

                <Button
                  href="/properties"
                  variant="solid"
                  className="w-full font-sans bg-brand text-white hover:bg-brand/90 md:text-lg"
                  aria-label="Explore Hawana Salalah residences"
                >
                  Explore Residences
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Helper component for animated image transitions
function AnimatedImage({ isVisible, src, alt }) {
  return (
    <motion.div
      key={src}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0"
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </motion.div>
  );
}
