"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  FaLeaf,
  FaWater,
  FaSeedling,
  FaSun,
  FaRecycle,
  FaWind,
} from "react-icons/fa";
import Image from "next/image";

export default function SustainabilitySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  const sustainabilityFeatures = [
    {
      title: "MORE TREES\nTHAN\nRESIDENTS",
      name: "Biodiversity",
      icon: <FaSeedling className="text-white" size={24} />,
      description:
        "Ghaf Woods is rich in its greenery where residents play a small part in a big ecosystem.",
      detailedDescription:
        "Home to over 50 species of native plants and wildlife, creating a thriving ecosystem within an urban setting.",
    },
    {
      title: "SUSTAINABLE\nLIVING\nEXPERIENCE",
      name: "Liveability",
      icon: <FaLeaf className="text-white" size={24} />,
      description:
        "Creating spaces that nurture both people and planet through thoughtful design.",
      detailedDescription:
        "Designed with human wellbeing in mind, offering spaces that promote physical and mental health through nature connection.",
    },
    {
      title: "COMMUNITY\nGROWN\nFOOD",
      name: "Productive Landscape",
      icon: <FaSun className="text-white" size={24} />,
      description:
        "From garden to table, experience the joy of locally grown produce right at home.",
      detailedDescription:
        "Our community gardens and orchards provide fresh produce while creating educational opportunities about sustainable agriculture.",
    },
    {
      title: "EVERYTHING\nWITHIN\nREACH",
      name: "5 Min Community",
      icon: <FaRecycle className="text-white" size={24} />,
      description:
        "Live in a neighborhood where everything you need is just a short walk away.",
      detailedDescription:
        "All essential amenities within a 5-minute walk, reducing carbon footprint while enhancing community connectivity.",
    },
    {
      title: "NATURE\nINSPIRED\nMOVEMENT",
      name: "Active Lifestyle",
      icon: <FaWind className="text-white" size={24} />,
      description:
        "Embrace an active lifestyle with trails and paths woven through natural landscapes.",
      detailedDescription:
        "Extensive network of walking and cycling paths integrated with natural surroundings to encourage outdoor activities.",
    },
    {
      title: "LIVING\nWITH\nNATURE",
      name: "A Front Row Home",
      icon: <FaWater className="text-white" size={24} />,
      description:
        "Wake up to greenery and natural beauty from every window of your home.",
      detailedDescription:
        "Every residence positioned to maximize views of greenery, ensuring a constant connection with nature from your doorstep.",
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
      className="py-24 bg-[#1A3A2A] relative overflow-hidden"
    >
      {/* Background texture */}
      {/* <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/assets/texture-pattern.png')] bg-repeat"></div>
      </div> */}

      {/* Removed the vertical line that was here */}

      <div className=" md:w-[95vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-white text-4xl md:text-6xl font-ivy font-bold text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Sustainability Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Feature selector */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-3">
              {sustainabilityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer p-4 border-l-2 transition-all duration-300 ${
                    activeFeature === index
                      ? "border-white bg-white/5"
                      : "border-transparent hover:border-white/30 hover:bg-white/3"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ x: 5 }}
                  whileTap={{ x: 0 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-full ${
                        activeFeature === index
                          ? "bg-brand text-white"
                          : "bg-white/5 text-white/80"
                      }`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3
                        className={`font-ivy text-lg transition-colors duration-300 ${
                          activeFeature === index
                            ? "text-white"
                            : "text-white/70"
                        }`}
                      >
                        {feature.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right columns - Content display */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeFeature}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Content column */}
                  <div className="relative">
                    <motion.div
                      className="absolute -left-4 top-0 bottom-0 w-px bg-white/20"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.8 }}
                    />

                    <motion.h2
                      className="text-4xl md:text-6xl font-bold text-white font-ivy leading-tight whitespace-pre-line mb-6"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {sustainabilityFeatures[activeFeature].title}
                    </motion.h2>

                    <motion.div
                      className="h-0.5 w-16 bg-brand mb-6"
                      initial={{ width: 0 }}
                      animate={{ width: 64 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    />

                    <motion.p
                      className="text-xl text-white/90 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      {sustainabilityFeatures[activeFeature].description}
                    </motion.p>

                    <motion.p
                      className="text-base text-white/70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      {
                        sustainabilityFeatures[activeFeature]
                          .detailedDescription
                      }
                    </motion.p>
                  </div>

                  {/* Visual column */}
                  <div className="relative">
                    <div className="aspect-[4/5] relative overflow-hidden rounded-lg">
                      <motion.div
                        className="absolute inset-0 bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      />

                      {/* Feature-specific visual */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`visual-${activeFeature}`}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {/* Dynamic background based on feature */}
                          <div className="absolute inset-0 overflow-hidden">
                            <Image
                              src={`/assets/sustainability-${
                                activeFeature + 1
                              }.jpg`}
                              alt={sustainabilityFeatures[activeFeature].name}
                              fill
                              className="object-cover opacity-60"
                            />
                          </div>

                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1A3A2A]/90 via-[#1A3A2A]/50 to-transparent" />

                          {/* Content overlay */}
                          <div className="absolute inset-0 flex flex-col justify-end p-8">
                            {/* Feature number */}
                            <motion.div
                              className="mb-auto ml-auto"
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.3 }}
                            >
                              <span className="text-white/30 font-ivy text-8xl font-bold">
                                0{activeFeature + 1}
                              </span>
                            </motion.div>

                            {/* Feature icon */}
                            <motion.div
                              className="mb-6 inline-block"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.5, delay: 0.4 }}
                            >
                              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full inline-block">
                                <div className="text-white w-12 h-12 flex items-center justify-center">
                                  {sustainabilityFeatures[activeFeature].icon}
                                </div>
                              </div>
                            </motion.div>

                            {/* Feature highlight */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.6 }}
                            >
                              <h4 className="text-white/80 text-sm uppercase tracking-widest mb-2">
                                {sustainabilityFeatures[activeFeature].name}
                              </h4>
                              <div className="h-0.5 w-12 bg-brand mb-4" />
                              <p className="text-white text-xl font-light">
                                {activeFeature === 0
                                  ? "3:1 Tree to Resident Ratio"
                                  : activeFeature === 1
                                  ? "Designed for Human Wellbeing"
                                  : activeFeature === 2
                                  ? "Community Gardens & Orchards"
                                  : activeFeature === 3
                                  ? "5-Minute Walkable Community"
                                  : activeFeature === 4
                                  ? "Integrated Trail Network"
                                  : "Nature Views from Every Home"}
                              </p>
                            </motion.div>
                          </div>

                          {/* Decorative elements */}
                          <motion.div
                            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                          />
                          <motion.div
                            className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Feature stats or highlights */}
                    <motion.div
                      className="mt-4 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-brand" />
                          <span className="text-white/70 text-sm">
                            {activeFeature === 0
                              ? "50+ Native Species"
                              : activeFeature === 1
                              ? "Biophilic Design"
                              : activeFeature === 2
                              ? "Sustainable Agriculture"
                              : activeFeature === 3
                              ? "Reduced Carbon Footprint"
                              : activeFeature === 4
                              ? "Active Lifestyle"
                              : "Seamless Indoor-Outdoor Living"}
                          </span>
                        </div>
                        <span className="text-white/40 text-xs">
                          {activeFeature + 1}/{sustainabilityFeatures.length}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Feature indicator */}
                <div className="absolute -bottom-12 left-0 right-0">
                  <div className="flex justify-center gap-2">
                    {sustainabilityFeatures.map((_, index) => (
                      <motion.button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          activeFeature === index ? "bg-white" : "bg-white/30"
                        }`}
                        onClick={() => setActiveFeature(index)}
                        whileHover={{ scale: 1.5 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
