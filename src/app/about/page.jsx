"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaMapMarkedAlt,
  FaUmbrellaBeach,
  FaLeaf,
  FaArrowRight,
} from "react-icons/fa";
import Globe from "@/components/ui/globe";
import CTASection from "@/components/sections/CTASection";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/hawana/8.jpg"
          alt="Salalah Coastline"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          className="relative text-center text-white z-10 w-[95vw] xl:w-[75vw] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-ivy font-bold mb-6">
            Discover Salalah
          </h1>
          <p className="text-lg md:text-2xl font-sans max-w-3xl mx-auto">
            A coastal gem in Oman, Salalah offers unparalleled investment
            opportunities, blending natural beauty with sustainable growth,
            aligned with Oman Vision 2040.
          </p>
        </motion.div>
      </section>

      {/* Why Invest in Salalah Section */}
      <section className="w-[95vw] xl:w-[75vw] mx-auto py-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-ivy font-bold text-brand mb-6">
            Why Invest in Salalah
          </h2>
          <div className="h-0.5 w-24 bg-brand mx-auto mb-8" />
          <p className="text-lg md:text-xl font-sans text-brand/80 max-w-3xl mx-auto">
            Salalah’s unique blend of economic potential, strategic location,
            and government-backed initiatives makes it a prime destination for
            investors seeking high returns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Strategic Location",
              description:
                "Salalah’s port connects to global trade routes, bolstered by Vision 2040’s infrastructure investments, making it a logistics hub.",
              icon: <FaMapMarkedAlt className="text-brand text-4xl" />,
            },
            {
              title: "Thriving Tourism",
              description:
                "Over 1 million visitors in the 2024 Khareef season and a new luxury marina position Salalah as a year-round destination.",
              icon: <FaUmbrellaBeach className="text-brand text-4xl" />,
            },
            {
              title: "Sustainable Growth",
              description:
                "Green initiatives like renewable energy and eco-tourism align with Vision 2040, attracting ESG-focused investors.",
              icon: <FaLeaf className="text-brand text-4xl" />,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm border border-brand/10 hover:shadow-lg hover:shadow-brand/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-ivy font-bold text-brand mb-2">
                {item.title}
              </h3>
              <p className="text-brand/80 font-sans">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Oman Vision 2040 Section */}
      <section className="w-[95vw] xl:w-[75vw] mx-auto py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
          <Globe
            rotateCities={[
              "muscat",
              "dubai",
              "abu dhabi",
              "london",
              "new delhi",
              "beijing",
            ]}
            rotationSpeed={3000}
            markers={[
              // Oman → Muscat
              { location: [23.588, 58.3829], size: 0.05 },
              // Dubai
              { location: [25.2048, 55.2708], size: 0.05 },
              // London
              { location: [51.5074, -0.0578], size: 0.05 },
              // India → New Delhi
              { location: [28.6139, 77.209], size: 0.05 },
              // China → Beijing
              { location: [39.9042, 116.4074], size: 0.05 },
            ]}
            glowColor={[0.1, 0.8, 1]}
            markerColor={[0.1, 0.8, 1]}
            className="h-[60vh] w-[30vw]"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-ivy font-bold text-brand mb-6">
              Oman Vision 2040
            </h2>
            <div className="h-0.5 w-24 bg-brand mb-8" />
            <p className="text-lg md:text-xl font-sans text-brand/80 mb-6">
              Oman Vision 2040 is a national strategy to transform Oman into a
              diversified, sustainable, and globally competitive economy. It
              focuses on reducing oil dependency, fostering private-sector
              growth, and enhancing infrastructure, with Salalah at the
              forefront.
            </p>
            <ul className="space-y-4">
              {[
                "Economic Diversification: Investing in tourism, logistics, and renewables to reduce oil reliance.",
                "Private-Sector Growth: 100% foreign ownership and tax exemptions to attract investors.",
                "Sustainable Development: Green initiatives like solar energy and eco-tourism in Salalah.",
                "Human Capital: Education reforms to prepare a skilled workforce for future industries.",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-brand/80 font-sans"
                >
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand"></div>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection/>
    </main>
  );
};

export default AboutPage;
