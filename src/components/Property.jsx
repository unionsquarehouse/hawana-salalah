import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  FaArrowRight,
  FaChevronDown,
  FaSpa,
  FaWater,
  FaSwimmer,
  FaUmbrellaBeach,
  FaBuilding,
} from "react-icons/fa";
import InteriorDesignSection from "./sections/PropertyInteriorDesignSection";
import CTASection from "./sections/CTASection";
import ContactModal from "./ContactModal";

// Hero Section Component
const HeroSection = ({
  property,
  details,
  heroScale,
  heroOpacity,
  onReserveClick,
}) => (
  <div className="relative aspect-video  ">
    <motion.div className="absolute  inset-0 z-0" style={{ scale: heroScale }}>
      <Image
        src={details?.image}
        alt={property?.name}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90" />
    </motion.div>

    <motion.div
      className="absolute inset-0 z-10  flex-col justify-center items-center text-center pb-20 md:pb-32 hidden md:flex"
      style={{ opacity: heroOpacity }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="px-4"
      >
        <h1 className="text-4xl md:text-6xl xl:text-7xl font-bold text-white mb-6 font-ivy tracking-tight hidden md:block">
          {property?.name}
        </h1>
        <p className="text-white/90 text-base md:text-2xl mb-8 md:mb-10 mx-auto font-sans font-light  hidden md:block">
          {details?.tagline}
        </p>
        <div className="flex flex-wrap gap-4 justify-center   ">
          <button
            onClick={() => onReserveClick(property)}
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-gray-900 transition-all hover:shadow-lg hover:shadow-white/20 w-[88vw] sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2 text-brand">
              <FaArrowRight className="md:text-md" />
              <span className="md:text-md">Reserve Now</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
          <a
            href="/assets/hawana/amazi-brochure.pdf"
            download
            className="group relative overflow-hidden rounded-full bg-transparent border border-white px-8 py-4 text-white transition-all hover:shadow-lg hover:shadow-white/20 w-[88vw] sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="md:text-md">Download Brochure</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </motion.div>
    </motion.div>

    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
    >
      <FaChevronDown className="text-white text-2xl" />
    </motion.div>
  </div>
);

// Stats Bar Component
const StatsBar = ({ details, property }) => (
  <div className="relative z-30 mx-auto px-4 -mt-16">
    <motion.div
      className="w-[95vw] 2xl:w-[75vw] mx-auto grid grid-cols-2 gap-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl shadow-black/5 p-1 border border-white/20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <span className="text-sm md:text-lg text-brand/90 mb-1">
          Starting Price
        </span>
        <span className="text-xl md:text-2xl font-bold text-brand">
          {details.price}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center py-4 px-2 text-center border-x border-gray-100">
        <span className="text-sm md:text-lg text-brand/90 mb-1">
          Property Type
        </span>
        <span className="text-xl md:text-2xl font-bold text-brand">
          {property?.type}
        </span>
      </div>
    </motion.div>
  </div>
);

// Overview Section Component
const OverviewSection = ({ property, details }) => (
  <div className="pt-16 md:py-20 xl:py-28">
    <div className="w-[95vw] 2xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-brand mb-6 md:mb-8 font-ivy relative">
            <span className="relative z-10">Exclusive Waterfront Living</span>
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-brand/10 rounded-full blur-xl z-0"></span>
          </h2>

          <p className="text-brand text-lg md:text-xl mb-4 md:mb-6 font-sans">
            {details.description}
          </p>

          <p className="text-brand text-sm md:text-lg mb-6 font-sans">
            {property.name} redefines luxury with its seamless blend of modern
            architecture and the serene beauty of Hawana Salalah’s Arabian Sea
            coastline, offering an unparalleled resort lifestyle.
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {details.features &&
              details.features.slice(0, 4).map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center text-sm md:text-lg font-sans gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-3 h-3 rounded-full bg-brand"></div>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src={details.image2}
              alt={property.name}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

// Amenities Section Component
const AmenitiesSection = ({
  amenitiesData,
  activeAmenityIndex,
  setActiveAmenityIndex,
  isAmenitiesVisible,
  amenitiesSectionRef,
}) => (
  <section
    ref={amenitiesSectionRef}
    className="bg-gradient-to-b from-gray-50 to-white text-brand pt-20 overflow-hidden"
  >
    <div className="w-[95vw] 2xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-left lg:text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isAmenitiesVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-brand mb-8 font-ivy">
          Resort-Style Amenities
        </h2>
        <div className="h-0.5 w-24 bg-brand mb-6 lg:mx-auto" />
        <p className="text-brand text-lg md:text-xl mb-6 font-sans lg:mx-auto">
          Immerse yourself in a world-class resort lifestyle with amenities that
          complement the natural beauty of Hawana Salalah’s coastline.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <motion.div
          className="lg:col-span-7 relative h-[320px] sm:h-[420px] md:h-[520px] lg:h-[560px] rounded-xl overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          animate={isAmenitiesVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {amenitiesData.map((amenity, index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeAmenityIndex === index ? 1 : 0,
                scale: activeAmenityIndex === index ? 1 : 1.1,
              }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={amenity.image}
                alt={amenity.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    activeAmenityIndex === index
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-white text-3xl font-ivy mb-2">
                    {amenity.name}
                  </h3>
                  <div className="h-0.5 w-12 bg-white/70 mb-4" />
                  <p className="text-white/90 font-sans ">
                    {amenity.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-4 right-4 flex gap-2">
            {amenitiesData.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  activeAmenityIndex === index ? "bg-white" : "bg-white/40"
                }`}
                onClick={() => setActiveAmenityIndex(index)}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 30 }}
          animate={isAmenitiesVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20 hidden md:block">
            <h3 className="text-2xl md:text-3xl font-ivy mb-6 font-semibold text-brand">
              Our Amenities
            </h3>

            <div className="space-y-4">
              {amenitiesData.map((amenity, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeAmenityIndex === index
                      ? "bg-brand text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveAmenityIndex(index)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-xl ${
                        activeAmenityIndex === index
                          ? "text-white"
                          : "text-brand"
                      }`}
                    >
                      {amenity.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold md:text-lg">
                        {amenity.name}
                      </h4>
                      {activeAmenityIndex === index && (
                        <motion.p
                          className="text-sm md:text-base font-sans mt-2 text-white/80 "
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

export default function Property({ property }) {
  const [activeAmenityIndex, setActiveAmenityIndex] = useState(0);
  const [isAmenitiesVisible, setIsAmenitiesVisible] = useState(false);
  const containerRef = useRef(null);
  const amenitiesSectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const amenitiesData = [
    {
      name: "Beach Club",
      icon: <FaUmbrellaBeach />,
      description:
        "Unwind at our exclusive Beach Club, offering direct access to pristine white sandy beaches and curated coastal experiences.",
      image: "/assets/hawana/beach-club.jpg",
    },
    {
      name: "Wellness Centre",
      icon: <FaSpa />,
      description:
        "Rejuvenate in our state-of-the-art Wellness Centre with spa treatments inspired by Omani traditions.",
      image: "/assets/hawana/wellness-centre.jpg",
    },
    {
      name: "Entertainment Centre",
      icon: <FaSwimmer />,
      description:
        "Connect and relax in our vibrant Entertainment Centre, a hub for community events and leisure activities.",
      image: "/assets/hawana/entertainment-centre.jpg",
    },
    {
      name: "Water Sports Centre",
      icon: <FaSwimmer />,
      description:
        "Dive into adventure with our Water Sports Centre, offering activities from kayaking to sailing on the Arabian Sea.",
      image: "/assets/hawana/water-sports-centre.jpg",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAmenitiesVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (amenitiesSectionRef.current) {
      observer.observe(amenitiesSectionRef.current);
    }

    return () => {
      if (amenitiesSectionRef.current) {
        observer.unobserve(amenitiesSectionRef.current);
      }
    };
  }, []);

  const getPropertyDetails = () => ({
    name: "Amazi",
    specs: "Luxury Villas & Chalets • 1-4 Bedrooms",
    price: "Starting from OMR 78,000",
    description:
      "Amazi offers an exclusive waterfront lifestyle in Hawana Salalah, with stunning ocean views, freehold ownership, and Omani residency benefits for all nationalities.",
    description2:
      "Designed by SB Architects, Amazi blends modern luxury with Oman’s natural coastal beauty, creating a serene paradise with world-class amenities.",
    tagline:
      "Experience living on a whole new level with stunning oceanfront homes at Amazi.",
    features: [
      "Stunning Water Views",
      "Freehold Ownership",
      "Omani Residency",
      "High-End Architecture",
    ],
    image: "/assets/hawana/4.jpg",
    image2: "/assets/hawana/21.jpg",
    amenities: [
      {
        name: "Beach Club",
        icon: <FaUmbrellaBeach className="text-brand" />,
        description:
          "Exclusive access to a luxurious Beach Club with pristine beaches and coastal activities.",
      },
      {
        name: "Wellness Centre",
        icon: <FaSpa className="text-brand" />,
        description:
          "A state-of-the-art facility offering spa treatments and wellness programs inspired by Omani heritage.",
      },
    ],
    interiorTypes: {
      coastal: {
        name: "Coastal",
        description:
          "Bright, airy interiors with soft blues, whites, and natural textures, inspired by the Arabian Sea.",
        features: [
          "Floor-to-ceiling windows",
          "Light wood finishes",
          "Ocean-inspired palette",
          "Minimalist coastal design",
        ],
        image: [
          "/assets/hawana/interiors/coastal1-amazi.jpg",
          "/assets/hawana/interiors/coastal2-amazi.jpg",
        ],
      },
      oasis: {
        name: "Oasis",
        description:
          "Warm, elegant interiors with rich tones and luxurious textures, evoking the tranquility of an Omani oasis.",
        features: [
          "Warm wood accents",
          "Textured wall treatments",
          "Ambient lighting systems",
          "Luxury furniture pieces",
        ],
        image: [
          "/assets/hawana/interiors/oasis1-amazi.jpg",
          "/assets/hawana/interiors/oasis2-amazi.jpg",
        ],
      },
    },
    biophilicDesign: {
      title: "Coastal Integration",
      description:
        "Amazi’s design integrates seamlessly with Hawana Salalah’s coastline, using natural materials and open layouts to enhance the connection to the Arabian Sea.",
      features: [
        "Living green walls",
        "Natural ventilation systems",
        "Coastal plant integration",
        "Water conservation features",
      ],
      image: "/assets/hawana/biophilic/amazi.jpg",
    },
  });

  const details = getPropertyDetails();
  const interiorKeys = Object.keys(details.interiorTypes || {});
  const [activeInteriorType, setActiveInteriorType] = useState(
    interiorKeys[0] || ""
  );

  const handleModalSubmit = (formData, { onSuccess, onError }) => {
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      title: selectedProject?.name || "Amazi",
      priceRange: formData.priceRange,
      bedrooms: formData.bedrooms,
    };

    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data) => {
        console.log("Lead submitted:", data);
        onSuccess();
      })
      .catch((err) => {
        console.error(err);
        onError();
      });
  };

  return (
    <div className="relative" ref={containerRef}>
      <HeroSection
        property={property}
        details={details}
        heroScale={heroScale}
        heroOpacity={heroOpacity}
        onReserveClick={(property) => {
          setSelectedProject({
            name: property?.name,
            price: details.price?.replace("Starting from ", "") || "N/A",
          });
          setShowModal(true);
        }}
      />

      <StatsBar details={details} property={property} />

      <OverviewSection property={property} details={details} />

      <AmenitiesSection
        amenitiesData={amenitiesData}
        activeAmenityIndex={activeAmenityIndex}
        setActiveAmenityIndex={setActiveAmenityIndex}
        isAmenitiesVisible={isAmenitiesVisible}
        amenitiesSectionRef={amenitiesSectionRef}
      />

      <InteriorDesignSection
        details={details}
        activeInteriorType={activeInteriorType}
        setActiveInteriorType={setActiveInteriorType}
      />

      <CTASection />

      {showModal && selectedProject && (
        <ContactModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedProject(null);
          }}
          projectName={selectedProject.name}
          projectPrice={selectedProject.price}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}
