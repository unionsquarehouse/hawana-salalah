import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  FaArrowRight,
  FaChevronDown,
  FaPlus,
  FaCity,
  FaSpa,
  FaWater,
  FaSwimmer,
  FaLeaf,
  FaTree,
  FaChild,
  FaBiking,
  FaYinYang,
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
  <div className="relative h-screen overflow-hidden">
    <motion.div className="absolute inset-0 z-0" style={{ scale: heroScale }}>
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
      className="absolute inset-0 z-10 flex flex-col justify-end items-center text-center pb-32"
      style={{ opacity: heroOpacity }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className=" px-4"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 font-ivy tracking-tight">
          {property?.name}
        </h1>
        <p className=" text-white/90 text-xl md:text-3xl mb-10 mx-auto font-light">
          {details?.tagline ||
            "A revolutionary living experience where luxury meets sustainable innovation"}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onReserveClick(property)}
            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-gray-900 transition-all hover:shadow-lg hover:shadow-white/20"
          >
            <span className="relative z-10 flex items-center gap-2 text-brand">
              <FaArrowRight className="md:text-md" />
              <span className="md:text-md"> Reserve Now</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </motion.div>
    </motion.div>

    {/* Scroll indicator */}
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
      className="w-[90vw] mx-auto grid grid-cols-2 gap-4 bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl shadow-black/5 p-1 border border-white/20"
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
  <div className="py-32">
    <div className=" md:w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-brand mb-8 font-ivy relative">
            <span className="relative z-10">Visionary Living</span>
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-16 h-16 bg-brand/10 rounded-full blur-xl z-0"></span>
          </h2>

          <p className="text-brand text-sm md:text-lg mb-6  font-sans">
            {details.description}
          </p>

          <p className="text-brand text-sm md:text-lg mb-6  font-sans  ">
            {property.name} represents the future of residential living, where
            cutting-edge technology seamlessly integrates with sustainable
            design principles to create an unparalleled living experience.
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
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <Image
              src={details.image}
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
    className="bg-gradient-to-b from-[#f8f9f6] to-white text-[#2e3d28] py-20 overflow-hidden"
  >
    <div className=" md:w-[95vw] px-6 md:px-20  mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isAmenitiesVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-brand mb-8 font-ivy">
          Harmony with Nature
        </h2>
        <div className="h-0.5 w-24 bg-[#6a7d5a] mx-auto mb-6" />
        <p className="text-brand text-sm md:text-lg mb-6  font-sans">
          Experience a community designed to nurture both body and soul, where
          every amenity is thoughtfully integrated with the natural environment.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left side - Image display */}
        <motion.div
          className="lg:col-span-7 relative rounded-xl overflow-hidden"
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
                  <p className="text-white/90 font-sans md:text-md">
                    {amenity.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Image indicators */}
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

        {/* Right side - Amenities list */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: 30 }}
          animate={isAmenitiesVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-[#e0e5dd]">
            <h3 className="text-2xl md:text-3xl font-ivy mb-6 font-semibold text-brand">
              Our Amenities
            </h3>

            <div className="space-y-4">
              {amenitiesData.map((amenity, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                    activeAmenityIndex === index
                      ? "bg-[#2e3d28] text-white"
                      : "bg-[#f8f9f6] hover:bg-[#e0e5dd]"
                  }`}
                  onClick={() => setActiveAmenityIndex(index)}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`text-xl ${
                        activeAmenityIndex === index
                          ? "text-white"
                          : "text-[#6a7d5a]"
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
                          className="text-sm md:text-base font-sans mt-2 text-white/80"
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

  // Parallax effect for hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Amenities data
  const amenitiesData = [
    {
      name: "Enchanted Forest",
      icon: <FaLeaf />,
      description:
        "Wander through our carefully preserved natural forest with walking trails, meditation spots, and native wildlife.",
      image: "/assets/amenities/enchanted-forest.jpg",
    },
    {
      name: "Forest Pools",
      icon: <FaSwimmer />,
      description:
        "Enjoy our naturally designed swimming areas that blend seamlessly with the surrounding landscape.",
      image: "/assets/amenities/forest-pools.jpg",
    },
    {
      name: "Kids Nature Gardens",
      icon: <FaChild />,
      description:
        "A magical space where children can learn about nature through play and exploration.",
      image: "/assets/amenities/kids-garden.jpg",
    },
    {
      name: "Mountain Bike Loop",
      icon: <FaBiking />,
      description:
        "Challenge yourself on our professionally designed mountain bike trails for all skill levels.",
      image: "/assets/amenities/bike-Loop.jpg",
    },
    {
      name: "Wellness & Yoga Pavilion",
      icon: <FaYinYang />,
      description:
        "Find balance and tranquility in our open-air pavilion surrounded by the sounds of nature.",
      image: "/assets/amenities/yoga-pavilion.jpg",
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

  // Get property details based on name
  const getPropertyDetails = (name) => {
    const propertyMap = {
      Capria: {
        name: "Capria",
        specs: "Luxury Villas • 5-7 Bedrooms",
        price: "Starting from AED 1.5M",
        description:
          "Exclusive forest-edge villas with private gardens and infinity pools. Nestled among ancient ghaf trees, these residences offer unparalleled privacy and tranquility.",
        description2:
          "Crafted to create an environment and culture that promotes health and wellbeing in all its forms, the Capria sanctuary is a haven of serenity and wellness.",
        features: [
          "Private Infinity Pools",
          "Smart Home Technology",
          "Expansive Gardens",
          "Floor-to-ceiling Windows",
        ],
        image: "/assets/properties/capria.jpg",
        amenities: [
          {
            name: "Wellness Center",
            icon: <FaSpa className="text-brand" />,
            description:
              "State-of-the-art spa and fitness facilities with personal trainers and wellness experts.",
          },
        ],
        interiorTypes: {
          radiance: {
            name: "Radiance",
            description:
              "Bright, airy interiors that maximize natural light and create a sense of expansiveness. The Radiance collection features light wood tones, reflective surfaces, and a neutral color palette.",
            features: [
              "Floor-to-ceiling windows",
              "Light oak finishes",
              "Integrated smart lighting",
              "Minimalist design elements",
            ],
            image: [
              "/assets/interiors/radiance1-capria.jpg",
              "/assets/interiors/radiance2-capria.jpg",
            ],
          },
          twilight: {
            name: "Twilight",
            description:
              "Rich, sophisticated interiors that create a sense of luxury and intimacy. The Twilight collection features dark wood accents, textured fabrics, and ambient lighting.",
            features: [
              "Walnut wood accents",
              "Textured wall treatments",
              "Ambient lighting systems",
              "Statement furniture pieces",
            ],
            image: [
              "/assets/interiors/twilight1-capria.jpg",
              "/assets/interiors/twilight2-capria.jpg",
            ],
          },
        },
        biophilicDesign: {
          title: "Forest Integration",
          description:
            "Capria villas are designed to integrate seamlessly with the surrounding forest, with living spaces that blur the boundaries between indoors and outdoors. The architecture respects and enhances the natural environment.",
          features: [
            "Living green walls",
            "Natural ventilation systems",
            "Indigenous plant integration",
            "Water conservation features",
          ],
          image: "/assets/biophilic/capria.jpg",
        },
      },
      Lacina: {
        name: "Lacina",
        specs: "Waterfront Residences • 3-5 Bedrooms",
        price: "Starting from AED 1.4M",
        description:
          "Lacina is more than a home—it's a lifestyle where every step aligns with nature’s rhythm.",
        description2:
          "Enjoy a vibrant, balanced life surrounded by the tranquility of the forest and unique amenities that blend seamlessly with the natural world.",
        features: [
          "Private Docks",
          "Panoramic Water Views",
          "Outdoor Terraces",
          "Premium Finishes",
        ],
        image: "/assets/properties/lacina.jpg",
        amenities: [
          {
            name: "Yacht Club",
            icon: <FaWater className="text-brand" />,
            description:
              "Exclusive membership to the community yacht club with concierge services.",
          },
          {
            name: "Beach Access",
            icon: <FaSwimmer className="text-brand" />,
            description:
              "Private beach areas with cabanas and water sports equipment.",
          },
        ],
        interiorTypes: {
          radiance: {
            name: "Radiance",
            description:
              "Bright, airy interiors that maximize natural light and create a sense of expansiveness. The Radiance collection features light wood tones, reflective surfaces, and a neutral color palette.",
            features: [
              "Floor-to-ceiling windows",
              "Light oak finishes",
              "Integrated smart lighting",
              "Minimalist design elements",
            ],
            image: [
              "/assets/interiors/radiance1-lacina.jpg",
              "/assets/interiors/radiance2-lacina.jpg",
            ],
          },
          twilight: {
            name: "Twilight",
            description:
              "Rich, sophisticated interiors that create a sense of luxury and intimacy. The Twilight collection features dark wood accents, textured fabrics, and ambient lighting.",
            features: [
              "Walnut wood accents",
              "Textured wall treatments",
              "Ambient lighting systems",
              "Statement furniture pieces",
            ],
            image: [
              "/assets/interiors/twilight1-lacina.jpg",
              "/assets/interiors/twilight2-lacina.jpg",
            ],
          },
        },
        biophilicDesign: {
          title: "Water Integration",
          description:
            "Lacina residences celebrate their waterfront location with design elements that reflect and interact with the water. The architecture creates a seamless transition between indoor living spaces and the lagoon.",
          features: [
            "Reflective surfaces",
            "Water features",
            "Natural cooling systems",
            "Sustainable water management",
          ],
          image: "/assets/biophilic/lacina.jpg",
        },
      },
      Serra: {
        name: "Serra",
        specs: "Garden Townhouses • 3-4 Bedrooms",
        price: "Starting from AED 2M",
        description:
          "Contemporary townhouses surrounded by lush community gardens. These elegant homes combine modern design with natural surroundings for balanced living.",
        description2:
          "Colours, texture, shapes and light all come together in Serra. From abstract ideas to immersive nature, the subtle combination creates an unprecedented living experience.",
        features: [
          "Community Gardens",
          "Rooftop Terraces",
          "Double-height Ceilings",
          "Private Courtyards",
        ],
        image: "/assets/properties/serra.jpg",
        amenities: [
          {
            name: "Community Gardens",
            icon: <FaLeaf className="text-brand" />,
            description:
              "Shared organic gardens with dedicated plots for residents.",
          },
          {
            name: "Garden Pavilion",
            icon: <FaTree className="text-brand" />,
            description:
              "Community gathering spaces nestled within landscaped gardens.",
          },
        ],
        interiorTypes: {
          radiance: {
            name: "Radiance",
            description:
              "Bright, airy interiors that maximize natural light and create a sense of expansiveness. The Radiance collection features light wood tones, reflective surfaces, and a neutral color palette.",
            features: [
              "Floor-to-ceiling windows",
              "Light oak finishes",
              "Integrated smart lighting",
              "Minimalist design elements",
            ],
            image: [
              "/assets/interiors/radiance1-serra.jpg",
              "/assets/interiors/radiance2-serra.jpg",
            ],
          },
          twilight: {
            name: "Twilight",
            description:
              "Rich, sophisticated interiors that create a sense of luxury and intimacy. The Twilight collection features dark wood accents, textured fabrics, and ambient lighting.",
            features: [
              "Walnut wood accents",
              "Textured wall treatments",
              "Ambient lighting systems",
              "Statement furniture pieces",
            ],
            image: [
              "/assets/interiors/twilight1-serra.jpg",
              "/assets/interiors/twilight2-serra.jpg",
            ],
          },
        },
        biophilicDesign: {
          title: "Garden Integration",
          description:
            "Serra townhouses blur the boundaries between home and garden with courtyards, terraces, and green spaces integrated throughout the living areas. The vertical gardens and rooftop ecosystems create a continuous connection with nature.",
          features: [
            "Vertical gardens",
            "Rooftop ecosystems",
            "Courtyard integration",
            "Natural ventilation",
          ],
          image: "/assets/biophilic/serra.jpg",
        },
      },
      Distrikt: {
        name: "Distrikt",
        specs: "Hillside Villas • 4-6 Bedrooms",
        price: "Starting from AED 1.2M",
        description:
          "Bursting with vitality and brimming with life, this vibrant vertical community elevates modern living to new heights.",
        description2:
          "Bursting with vitality and brimming with life, this vibrant vertical community elevates modern living to new heights. Where the city’s electric energy meets nature’s beauty and calm, offering you the best of both worlds.",
        features: [
          "Panoramic Views",
          "Private Terraces",
          "Luxury Finishes",
          "Integrated Smart Systems",
        ],
        image: "/assets/properties/distrikt.jpg",
        amenities: [
          {
            name: "Panoramic Lounge",
            icon: <FaCity className="text-brand" />,
            description:
              "Exclusive residents' lounge with panoramic city views.",
          },
          {
            name: "Infinity Edge Pool",
            icon: <FaSwimmer className="text-brand" />,
            description: "Dramatic infinity pool overlooking the city skyline.",
          },
        ],
        interiorTypes: {
          terra: {
            name: "Terra",
            description:
              "Bright, airy interiors that maximize natural light and create a sense of expansiveness. The Radiance collection features light wood tones, reflective surfaces, and a neutral color palette.",
            features: [
              "Floor-to-ceiling windows",
              "Light oak finishes",
              "Integrated smart lighting",
              "Minimalist design elements",
            ],
            image: [
              "/assets/interiors/terra1-distikt.jpg",
              "/assets/interiors/terra2-distrikt.jpg",
            ],
          },
          horizon: {
            name: "Horizon",
            description:
              "Rich, sophisticated interiors that create a sense of luxury and intimacy. The Twilight collection features dark wood accents, textured fabrics, and ambient lighting.",
            features: [
              "Walnut wood accents",
              "Textured wall treatments",
              "Ambient lighting systems",
              "Statement furniture pieces",
            ],
            image: [
              "/assets/interiors/horizon1-distrikt.jpg",
              "/assets/interiors/horizon2-distrikt.jpg",
            ],
          },
        },
        biophilicDesign: {
          title: "Hillside Integration",
          description:
            "Distrikt villas are designed to follow the natural contours of the hillside, minimizing environmental impact while maximizing views. The architecture celebrates the topography and creates a harmonious relationship with the landscape.",
          features: [
            "Terraced design",
            "Native landscaping",
            "Rainwater harvesting",
            "Natural cooling systems",
          ],
          image: "/assets/biophilic/distrikt.jpg",
        },
      },
      Cilia: {
        name: "Cilia",
        specs: "Luxury Apartments • 1-3 Bedrooms",
        price: "Starting from AED 1.3M",
        description:
          "Elegant apartments with premium finishes and resort-style amenities. Perfect for those seeking a low-maintenance lifestyle without compromising on luxury.",
        description2:
          "The attention to detail in Cilia is immaculate. With expansive spaces that extend both horizontally and vertically, an apartment can feel like a world of its own.",
        features: [
          "Concierge Service",
          "Spa & Wellness Center",
          "Infinity Edge Pools",
          "Private Balconies",
        ],
        image: "/assets/properties/cilia.jpg",
        amenities: [
          {
            name: "Concierge Services",
            icon: <FaCity className="text-brand" />,
            description: "24/7 concierge and lifestyle management services.",
          },
          {
            name: "Wellness Spa",
            icon: <FaSpa className="text-brand" />,
            description:
              "Luxury spa facilities with treatment rooms and relaxation areas.",
          },
        ],
        interiorTypes: {
          radiance: {
            name: "Radiance",
            description:
              "Bright, airy interiors that maximize natural light and create a sense of expansiveness. The Radiance collection features light wood tones, reflective surfaces, and a neutral color palette.",
            features: [
              "Floor-to-ceiling windows",
              "Light oak finishes",
              "Integrated smart lighting",
              "Minimalist design elements",
            ],
            image: [
              "/assets/interiors/radiance1-cilia.jpg",
              "/assets/interiors/radiance2-cilia.jpg",
            ],
          },
          twilight: {
            name: "Twilight",
            description:
              "Rich, sophisticated interiors that create a sense of luxury and intimacy. The Twilight collection features dark wood accents, textured fabrics, and ambient lighting.",
            features: [
              "Walnut wood accents",
              "Textured wall treatments",
              "Ambient lighting systems",
              "Statement furniture pieces",
            ],
            image: [
              "/assets/interiors/twilight1-cilia.jpg",
              "/assets/interiors/twilight2-cilia.jpg",
            ],
          },
        },
        biophilicDesign: {
          title: "Urban Oasis",
          description:
            "Cilia apartments create an urban oasis with carefully curated plant life, natural materials, and biophilic design elements that bring nature into the heart of apartment living. The sensory experience of nature is integrated throughout the living spaces.",
          features: [
            "Indoor gardens",
            "Natural material palette",
            "Optimized natural light",
            "Acoustic nature elements",
          ],
          image: "/assets/biophilic/cilia.jpg",
        },
      },
    };

    return propertyMap[name] || {};
  };

  const details = getPropertyDetails(property.name);
  const interiorKeys = Object.keys(details.interiorTypes || {});
  const [activeInteriorType, setActiveInteriorType] = useState(
    interiorKeys[0] || ""
  );

  console.log(property, "----------------------------");
  console.log(selectedProject, "====================");

  const handleModalSubmit = (formData, { onSuccess, onError }) => {
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      title: selectedProject?.name || "Unknown",
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
      {/* 
      <InteriorDesignSection
        details={details}
        activeInteriorType={activeInteriorType}
        setActiveInteriorType={setActiveInteriorType}
      /> */}
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
