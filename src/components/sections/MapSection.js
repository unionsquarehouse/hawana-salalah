"use client";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaCar,
  FaPlane,
  FaShoppingBag,
} from "react-icons/fa";

export default function MapSection() {
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
      className="relative bg-gradient-to-b from-white to-brand/5 overflow-hidden  py-24 md:py-32"
    >
      {/* Background wave pattern */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[url('/assets/wave-pattern.png')] bg-repeat-x opacity-10" />

      {/* Section header */}
      <div className="relative z-10 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-brand font-medium uppercase tracking-wider text-sm md:text-xl">
            Discover Amazi
          </h3>
          <h2 className="text-4xl md:text-6xl font-ivy font-bold text-brand mb-6">
            Coastal Gateway to Salalah
          </h2>
          <div className="h-0.5 w-24 bg-brand mx-auto mb-8" />
        </motion.div>
      </div>

      <div className="relative z-10 w-[95vw] xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 justify-center items-start">
          {/* Left side - Content */}
          <motion.div
            className="lg:col-span-6 flex flex-col justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg border border-brand/10">
              <p className="text-gray-600 mb-8 text-base md:text-lg font-sans">
                Nestled along Salalah’s pristine coastline, Amazi at Hawana
                Salalah offers a serene retreat with excellent connectivity to
                key destinations, blending luxury with Oman’s natural beauty.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-brand/10 p-3 rounded-full mr-4">
                    <FaCar className="text-brand text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl text-gray-900 mb-1">
                      Seamless Connectivity
                    </h4>
                    <p className="text-gray-600 text-base md:text-lg">
                      10 minutes to Salalah City Centre, 15 minutes to Salalah
                      Port, and easy access to major roads for effortless
                      travel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand/10 p-3 rounded-full mr-4">
                    <FaPlane className="text-brand text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl text-gray-900 mb-1">
                      Airport Access
                    </h4>
                    <p className="text-gray-600 text-base md:text-lg">
                      15 minutes to Salalah International Airport, ensuring
                      convenient travel for residents and visitors.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-brand/10 p-3 rounded-full mr-4">
                    <FaShoppingBag className="text-brand text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg md:text-xl text-gray-900 mb-1">
                      Nearby Amenities
                    </h4>
                    <p className="text-gray-600 text-base md:text-lg">
                      Close to Salalah Gardens Mall, top schools, hospitals, and
                      the vibrant Al Hafa Souq.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-brand/20 pt-6">
                <h4 className="font-semibold text-lg md:text-xl text-gray-900 mb-4">
                  Contact Us
                </h4>
                <div className="space-y-4">
                  <a
                    href="tel:+96812345678"
                    className="flex items-center gap-3 text-gray-700 hover:text-brand transition-colors"
                  >
                    <FaPhoneAlt className="text-brand text-lg" />
                    <span className="text-base md:text-lg">+968 1234 5678</span>
                  </a>
                  <a
                    href="mailto:info@amazi-hawana.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-brand transition-colors"
                  >
                    <FaEnvelope className="text-brand text-lg" />
                    <span className="text-base md:text-lg">
                      info@amazi-hawana.com
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Map */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg border border-brand/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15239.205695583685!2d54.1744495!3d17.0150516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3dd016e6e9a7a7b3%3A0x1c8b7f0c6f8e7b2!2sHawana%20Salalah!5e0!3m2!1sen!2som!4v1750751269766!5m2!1sen!2som"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Amazi at Hawana Salalah"
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
