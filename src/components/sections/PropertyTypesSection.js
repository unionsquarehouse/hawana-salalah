"use client";
import Image from "next/image";
import Button from "../Button";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { FaUmbrellaBeach, FaWater, FaShip, FaArrowRight } from "react-icons/fa";

export default function   PropertyTypesSection() {
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

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveDistrict((prev) => (prev + 1) % properties.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, properties.length]);

  return (
    <section ref={sectionRef} className="pt-24 md:pt-32 bg-white">
      <div className="w-[95vw] xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-ivy font-bold text-brand mb-8 leading-tight">
            Hawana Salalah’s Premier Residences
          </h2>
          <div className="h-0.5 w-24 bg-brand mx-auto mb-8" />
          <p className="text-brand w-[45vw] text-lg md:text-xl font-sans mx-auto">
            Discover Hawana Salalah’s exclusive freehold properties, from
            oceanfront villas to lagoon-front homes, offering luxury, Omani
            residency, and vibrant coastal living.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left side - Image */}
          <motion.div
            className="relative h-[500px] rounded-2xl overflow-hidden"
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

                <div className="absolute bottom-0 left-0 p-8">
                  <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-4">
                    <span className="text-white text-sm md:text-base font-medium">
                      {property.specs}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 font-ivy">
                    {property.title}
                  </h3>
                  <p className="text-white/80 text-lg md:text-xl">
                    {property.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            className="relative flex flex-col font-sans"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gray-50 rounded-2xl h-full flex flex-col">
              {/* Property tabs - 4 in a row */}
              <div className="grid grid-cols-4 gap-1 mb-6">
                {properties.map((district, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveDistrict(index)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                      activeDistrict === index
                        ? "bg-brand text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-label={`View ${district.title} details`}
                  >
                    <span className="text-xs md:text-lg">{district.title}</span>
                  </button>
                ))}
                {/* Empty tab to maintain 4-column layout */}
                <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-gray-200"></div>
              </div>

              {/* District content */}
              <div className="relative flex-grow">
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
                    <p className="text-gray-600 mb-6 text-sm md:text-lg">
                      {district.description}
                    </p>

                    <div className="mb-8 flex-grow">
                      <h4 className="text-gray-900 font-medium mb-4 text-md md:text-xl">
                        Key Features:
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm md:text-lg">
                        {district.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <div className="w-2 h-2 rounded-full bg-brand"></div>
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
                        className="bg-brand text-white hover:bg-brand/90 flex items-center gap-2 w-full justify-center md:text-lg"
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
