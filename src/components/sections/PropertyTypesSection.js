"use client";
import Image from "next/image";
import Button from "../Button";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaUmbrellaBeach, FaWater, FaShip, FaArrowRight } from "react-icons/fa";

export default function PropertyTypesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState(0);
  const sectionRef = useRef(null);

  const properties = [
    {
      image: "/assets/hawana/amazi.webp",
      icon: <FaUmbrellaBeach className="text-brand" />,
      title: "Amazi",
      specs: "Oceanfront Villas • 2-4 Bedrooms",
      price: "Contact for Pricing",
      description:
        "Oceanfront villas with direct access to 7km of pristine beaches, blending luxury with serene coastal views.",
      features: [
        "Direct Beach Access",
        "Panoramic Ocean Views",
        "Private Terraces",
        "Luxury Finishes",
      ],
    },
    {
      image: "/assets/hawana/fanar.webp",
      icon: <FaWater className="text-brand" />,
      title: "Fanar Views",
      specs: "Lagoon-Front Homes • 2-3 Bedrooms",
      price: "Contact for Pricing",
      description:
        "Lagoon-front homes with views of Fanar Hotel, offering elegant designs and vibrant community living.",
      features: [
        "Lagoon Views",
        "Modern Architecture",
        "Community Amenities",
        "Spacious Interiors",
      ],
    },
    {
      image: "/assets/hawana/marina.webp",
      icon: <FaShip className="text-brand" />,
      title: "Marina Bay",
      specs: "Marina Apartments • 1-3 Bedrooms",
      price: "Contact for Pricing",
      description:
        "Modern apartments with terraces overlooking the world-class Hawana Marina, perfect for dynamic coastal lifestyles.",
      features: [
        "Marina Views",
        "Private Terraces",
        "Vibrant Community",
        "Proximity to Dining",
      ],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Mobile-only auto-rotate (keeps desktop behavior unchanged)
  useEffect(() => {
    if (!isVisible) return;
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop) return;

    const interval = setInterval(() => {
      setActiveDistrict((prev) => (prev + 1) % properties.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, properties.length]);

  return (
    <section ref={sectionRef} className="pt-16 md:py-20 xl:py-28 bg-white">
      <div className="w-[95vw] 2xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-left lg:text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-ivy font-bold text-brand mb-8 leading-tight">
            Hawana Salalah’s Premier Residences
          </h2>
          <div className="h-0.5 w-24 bg-brand mb-8 lg:mx-auto" />
          {/* Responsive width: full on mobile, tight on xl */}
          <p className="text-brand w-full xl:w-[45vw] text-base sm:text-lg md:text-xl font-sans lg:mx-auto">
            Discover Hawana Salalah’s exclusive freehold properties, from
            oceanfront villas to lagoon-front homes, offering luxury, Omani
            residency, and vibrant coastal living.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Left side - Image */}
          <motion.div
            className="relative h-[320px] sm:h-[420px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {properties.map((property, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeDistrict === index ? 1 : 0,
                  scale: activeDistrict === index ? 1 : 1.1,
                }}
                transition={{ duration: 1 }}
              >
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 p-4 sm:p-6 lg:p-8">
                  <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full mb-3 sm:mb-4">
                    <span className="text-white text-xs sm:text-sm md:text-base font-medium">
                      {property.specs}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 font-ivy">
                    {property.title}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base md:text-xl">
                    {property.price}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Mobile indicators (hidden on lg+) */}
            <div className="absolute bottom-3 right-3 flex gap-2 lg:hidden">
              {properties.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => setActiveDistrict(i)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    activeDistrict === i ? "bg-brand" : "bg-white/50"
                  }`}
                  aria-label={`Show ${p.title}`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="relative flex flex-col font-sans"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gray-50 rounded-2xl h-full flex flex-col p-4 sm:p-6 lg:p-8">
              {/* Property tabs */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 mb-4 sm:mb-6">
                {properties.map((district, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveDistrict(index)}
                    className={`flex items-center justify-center px-2 py-2 sm:p-2 rounded-lg transition-colors text-xs sm:text-sm md:text-base ${
                      activeDistrict === index
                        ? "bg-brand text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-label={`View ${district.title} details`}
                  >
                    {district.title}
                  </button>
                ))}
                {/* spacer only on >=sm to preserve 4-col symmetry */}
                <div className="hidden sm:block p-2 rounded-lg bg-gray-200"></div>
              </div>

              {/* District content */}
              <div className="relative flex-grow h-[35vh]">
                {properties.map((district, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0 flex flex-col"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: activeDistrict === index ? 1 : 0,
                      y: activeDistrict === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                      pointerEvents: activeDistrict === index ? "auto" : "none",
                    }}
                  >
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg">
                      {district.description}
                    </p>

                    <div className="mb-6 sm:mb-8 flex-grow">
                      <h4 className="text-gray-900 font-medium mb-3 sm:mb-4 text-sm sm:text-base md:text-xl">
                        Key Features:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm sm:text-base md:text-lg">
                        {district.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <div className="w-2 h-2 rounded-full bg-brand" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto">
                      <Button
                        href={`/properties/${district.title
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        variant="solid"
                        className="bg-brand text-white hover:bg-brand/90 flex items-center gap-2 w-full justify-center text-sm sm:text-base md:text-lg"
                        aria-label={`Discover ${district.title}`}
                      >
                        Discover {district.title} <FaArrowRight />
                      </Button>
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
