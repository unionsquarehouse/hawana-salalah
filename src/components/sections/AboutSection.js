"use client";
import Image from "next/image";
import Button from "../Button";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function AboutSection() {
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
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A3A2A] to-[#2e3d28]" />
        <div className="absolute inset-0 opacity-20 bg-[url('/assets/texture-pattern.png')] bg-repeat" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10  md:w-[95vw] mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-ivy">
              The Ghaf Woods Legacy
            </h2>
            <div className="h-0.5 w-24 bg-brand mb-8" />
            <p className="text-lg mb-6">
              Named after the indigenous Ghaf tree, a symbol of life and
              resilience in the desert, our community embodies sustainability,
              luxury, and harmony with nature.
            </p>
            <p className="text-lg mb-8">
              Strategically located in Dubai, Ghaf Woods offers residents the
              perfect balance of tranquility and accessibility to the city's
              vibrant attractions and business districts.
            </p>
            <Button
              href="/about"
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              Our Story
            </Button>
          </motion.div>

          <motion.div
            className="relative h-[600px] w-full rounded-lg overflow-hidden border border-white/40 "
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image
              src="/assets/ghaf-woods-residences.jpg"
              alt="Ghaf Woods Aerial View"
              fill
              className="object-cover p-2"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
