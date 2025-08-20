"use client";
import Image from "next/image";
import Button from "../Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function PropertySlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Luxury property slides
  const slides = [
    {
      image: "/luxury-villa1.jpg",
      title: "Signature Villas",
      description: "Exclusive 5-bedroom villas with private pools and gardens",
    },
    {
      image: "/luxury-villa2.jpg",
      title: "Premium Townhouses",
      description: "Elegant 3 & 4-bedroom townhouses with modern finishes",
    },
    {
      image: "/luxury-villa3.jpg",
      title: "Sky Mansions",
      description: "Penthouse living with panoramic views of Dubai skyline",
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="py-24 bg-black text-white">
      <div className=" md:w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-6 font-ivy"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Exceptional Living Spaces
            </motion.h2>

            <motion.div
              className="h-0.5 w-24 bg-brand mb-8"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1 }}
            />

            <motion.p
              className="text-lg text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Ghaf Woods offers a collection of meticulously designed residences
              that redefine luxury living in Dubai. Each home is crafted with
              premium materials and attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                href="/properties"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black"
              >
                View All Properties
              </Button>
            </motion.div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative h-[500px] w-full overflow-hidden rounded-lg">
              {slides.map((slide, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: currentSlide === index ? 1 : 0,
                    scale: currentSlide === index ? 1 : 1.1,
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-gray-300">{slide.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Slide indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index ? "bg-white w-8" : "bg-gray-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
