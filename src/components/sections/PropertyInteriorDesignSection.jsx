import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import {
  FaPlus,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState, useEffect } from "react";

const PropertyInteriorDesignSection = ({
  details,
  activeInteriorType,
  setActiveInteriorType,
}) => {
  const [hoveredImage, setHoveredImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Ensure client-side rendering for interactive features
  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  // Slideshow auto-cycle effect
  useEffect(() => {
    if (!isClient) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex + 1 >= interiorTypes[activeInteriorType]?.images.length
          ? 0
          : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [isClient, activeInteriorType]);

  // Determine interior types based on property name
  const interiorTypes =
    details.name === "Distrikt"
      ? {
          terra: {
            ...details.interiorTypes.terra,
            images: [
              "/assets/interiors/terra.jpg",
              "/assets/interiors/terra-2.jpg",
            ],
          },
          horizon: {
            ...details.interiorTypes.horizon,
            images: [
              "/assets/interiors/horizon.jpg",
              "/assets/interiors/horizon-2.jpg",
            ],
          },
        }
      : {
          radiance: {
            ...details.interiorTypes.radiance,
            images: [details.interiorTypes?.radiance?.image],
          },
          twilight: {
            ...details.interiorTypes.twilight,
            images: [details.interiorTypes?.twilight?.image],
          },
        };

  // Parallax effect for image hover
  const tiltX = useTransform(mouseX, [-100, 100], [5, -5]);
  const tiltY = useTransform(mouseY, [-100, 100], [-5, 5]);

  // Handle slideshow navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex - 1 < 0
        ? interiorTypes[activeInteriorType]?.images.length - 1
        : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex + 1 >= interiorTypes[activeInteriorType]?.images.length
        ? 0
        : prevIndex + 1
    );
  };

  return (
    <section className="py-32 bg-gradient-to-br from-gray-50 via-[#f5f7f4] to-gray-50 text-gray-900 relative overflow-hidden">
      {/* Background effect with brand color */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(71,91,66,0.15)_0%,_transparent_70%)] animate-pulse" />
      </div>

      <div className=" md:w-[95vw] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold font-ivy tracking-tight text-[#475b42]">
            Timeless Design Collections
          </h2>
          <p className="text-lg text-gray-600 mx-auto mt-6 leading-relaxed">
            Immerse yourself in interiors that blend visionary craftsmanship
            with the serene elegance of nature-inspired design.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-white/90 rounded-full backdrop-blur-md border border-[#475b42]/20 shadow-sm">
            {Object.keys(interiorTypes).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveInteriorType(type);
                  setCurrentImageIndex(0); // Reset slideshow on tab change
                }}
                className={`relative px-10 py-3 rounded-full text-sm font-medium uppercase tracking-wide transition-all duration-500 ${
                  activeInteriorType === type
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {activeInteriorType === type && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#475b42] to-[#6a7d5a] rounded-full shadow-md shadow-[#475b42]/30"
                    layoutId="interiorTypeBackground"
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                <span className="relative z-10 capitalize">
                  {interiorTypes[type].name} Collection
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Image Slideshow */}
          <motion.div
            className="lg:col-span-3 relative"
            key={activeInteriorType}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative h-[450px] rounded-3xl overflow-hidden border border-[#475b42]/10 shadow-xl">
              {interiorTypes[activeInteriorType]?.images.map((img, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentImageIndex ? 1 : 0 }}
                  transition={{ duration: 0.7 }}
                  onMouseMove={(e) => {
                    if (!isClient) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    mouseX.set(e.clientX - rect.left - rect.width / 2);
                    mouseY.set(e.clientY - rect.top - rect.height / 2);
                    setHoveredImage(index);
                  }}
                  onMouseLeave={() => {
                    if (!isClient) return;
                    mouseX.set(0);
                    mouseY.set(0);
                    setHoveredImage(null);
                  }}
                  style={
                    isClient && index === currentImageIndex
                      ? {
                          rotateX: hoveredImage === index ? tiltX : 0,
                          rotateY: hoveredImage === index ? tiltY : 0,
                          transformPerspective: 1000,
                        }
                      : {}
                  }
                >
                  <Image
                    src={img}
                    alt={`${interiorTypes[activeInteriorType]?.name} ${
                      index + 1
                    }`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#475b42]/40 via-transparent to-transparent" />
                  <div className="absolute top-1/4 left-1/4 w-12 h-12 group cursor-pointer">
                    <motion.div
                      className="absolute w-12 h-12 rounded-full bg-[#475b42]/20 flex items-center justify-center animate-pulse"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                    <div className="absolute w-12 h-12 rounded-full bg-[#475b42]/70 backdrop-blur-sm flex items-center justify-center">
                      <FaPlus className="text-white text-lg" />
                    </div>
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-2xl shadow-[#475b42]/20 border border-[#475b42]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ y: 10 }}
                      animate={{ y: 0 }}
                    >
                      <p className="text-sm text-gray-800">
                        {index === 0
                          ? details.name === "Distrikt"
                            ? "Organic materials inspired by hillside textures"
                            : "Eco-luxury materials with handcrafted finishes"
                          : details.name === "Distrikt"
                          ? "Integrated hillside views with smart glass"
                          : "Smart climate systems for sustainable comfort"}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
              {/* Navigation Controls */}
              {isClient &&
                interiorTypes[activeInteriorType]?.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#475b42]/50 text-white p-3 rounded-full hover:bg-[#475b42]/80 transition-all duration-300"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#475b42]/50 text-white p-3 rounded-full hover:bg-[#475b42]/80 transition-all duration-300"
                    >
                      <FaChevronRight />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {interiorTypes[activeInteriorType]?.images.map(
                        (_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full ${
                              currentImageIndex === index
                                ? "bg-[#475b42]"
                                : "bg-gray-400"
                            } transition-all duration-300`}
                          />
                        )
                      )}
                    </div>
                  </>
                )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            key={activeInteriorType + "-info"}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-4xl font-bold font-ivy tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#475b42] to-[#6a7d5a]">
              {interiorTypes[activeInteriorType]?.name} Collection
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {interiorTypes[activeInteriorType]?.description}
            </p>
            <div className="space-y-6">
              {interiorTypes[activeInteriorType]?.features.map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#475b42]/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#475b42]" />
                  </div>
                  <div>
                    <h4 className="text-gray-800 font-medium mb-1">
                      Feature {i + 1}
                    </h4>
                    <p className="text-gray-600">{feature}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <a
              href="#details"
              className="group inline-flex items-center gap-2 rounded-full bg-[#475b42] px-8 py-3 text-white font-medium uppercase tracking-wide transition-all duration-300 hover:bg-[#6a7d5a] hover:shadow-xl hover:shadow-[#475b42]/30"
            >
              <span className="relative z-10">Explore Collection</span>
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropertyInteriorDesignSection;
