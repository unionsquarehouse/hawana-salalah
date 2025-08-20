"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InteractiveMapSection() {
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const svgRef = useRef(null);

  const properties = [
    {
      svg: "/assets/svgs/Capria.svg",
      svgId: "capria-area",
      title: "Capria",
      specs: "Luxury Villas • 5-7 Bedrooms",
      description:
        "Exclusive forest-edge villas with private gardens and infinity pools.",
      position: { top: "28%", left: "35%" },
    },
    {
      svg: "/assets/svgs/Lacina.svg",
      svgId: "lacina-area",
      title: "Lacina",
      specs: "Waterfront Residences • 3-5 Bedrooms",
      description:
        "Premium waterfront homes with private docks and panoramic views.",
      position: { top: "65%", left: "60%" },
    },
    {
      svg: "/assets/svgs/Serra.svg",
      svgId: "serra-area",
      title: "Serra",
      specs: "Garden Townhouses • 3-4 Bedrooms",
      description:
        "Contemporary townhouses surrounded by lush community gardens.",
      position: { top: "38%", left: "52%" },
    },
    {
      svg: "/assets/svgs/Cilia.svg",
      svgId: "cilia-area",
      title: "Cilia",
      specs: "Luxury Apartments • 1-3 Bedrooms",
      description:
        "Elegant apartments with premium finishes and resort-style amenities.",
      position: { top: "60%", left: "35%" },
    },
    {
      svg: "/assets/svgs/Distrikt.svg",
      svgId: "distrikt-area",
      title: "Distrikt",
      specs: "Hillside Villas • 4-6 Bedrooms",
      description:
        "Bursting with vitality and brimming with life, this vibrant vertical community.",
      position: { top: "25%", left: "65%" },
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

  // Setup SVG interaction
  useEffect(() => {
    if (!svgRef.current) return;

    const handleSvgLoad = (e) => {
      // Access the SVG document after it's loaded
      const svgDoc = e.target.contentDocument;
      if (!svgDoc) return;

      // Add hover effects to each property area
      properties.forEach((property, index) => {
        const area = svgDoc.getElementById(property.svgId);
        if (area) {
          area.style.cursor = "pointer";
          area.style.transition = "fill 0.3s ease";
          area.style.fill = "rgba(46, 61, 40, 0.2)"; // Default color

          area.addEventListener("mouseenter", () => {
            setHoveredProperty(index);
            area.style.fill = "rgba(46, 61, 40, 0.6)"; // Highlight color
          });

          area.addEventListener("mouseleave", () => {
            setHoveredProperty(null);
            area.style.fill = "rgba(46, 61, 40, 0.2)"; // Default color
          });

          area.addEventListener("click", () => {
            window.location.href = `/properties/${property.title.toLowerCase()}`;
          });
        }
      });
    };

    const svgObject = svgRef.current.querySelector("object");
    if (svgObject) {
      svgObject.addEventListener("load", handleSvgLoad);
    }

    return () => {
      const svgObject = svgRef.current?.querySelector("object");
      if (svgObject) {
        svgObject.removeEventListener("load", handleSvgLoad);
      }
    };
  }, [svgRef.current, properties]);

  return (
    <section ref={sectionRef} className="py-24 md:pt-32 bg-gray-50">
      <div className=" mx-auto ">
        <motion.div
          className="text-center mb-16 "
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 font-ivy text-brand">
            Explore Ghaf Woods
          </h2>
          <div className="h-0.5 w-24 bg-brand mx-auto mb-8" />
          <p className="px-4 sm:px-6 lg:px-8 text-lg md:text-2xl font-sans text-brand mx-auto">
            Discover our distinct residential districts, each offering a unique
            lifestyle experience within the Ghaf Woods community.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-full overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div
              className={`
                relative
                md:w-full md:h-full         
                w-[1440px]
              `}
              ref={svgRef}
            >
              {/* Main SVG */}
              <object
                data="/assets/svgs/ghafwoods.svg"
                type="image/svg+xml"
                className="w-full h-full"
              />

              {/* Markers */}
              {properties.map((property, index) => (
                <motion.div
                  key={index}
                  className="absolute z-30 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    top: property.position.top,
                    left: property.position.left,
                  }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={isVisible ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  onMouseEnter={() => setHoveredProperty(index)}
                  onMouseLeave={() => setHoveredProperty(null)}
                  onClick={() =>
                    (window.location.href = `/properties/${property.title.toLowerCase()}`)
                  }
                >
                  <div className="relative flex flex-col items-center group ">
                    <div className="mb-2  bg-white/90 backdrop-blur-sm px-4 sm:px-6 lg:px-8 py-1 rounded-full shadow-md text-lg md:text-2xl font-medium text-brand">
                      {property.title}
                    </div>
                    <div className="w-px h-12 bg-white shadow-md"></div>
                    <div className="w-4 h-4 rounded-full bg-white shadow-md border border-gray-100 mt-1 group-hover:scale-150 transition-transform duration-300"></div>
                    <div
                      className={`absolute bottom-0 w-8 h-8 rounded-full border-2 border-white transition-opacity duration-300 ${
                        hoveredProperty === index
                          ? "opacity-100 animate-ping"
                          : "opacity-0"
                      }`}
                    ></div>
                  </div>
                </motion.div>
              ))}

              {hoveredProperty !== null && (
                <div
                  className="absolute inset-0 z-20 transition-opacity duration-300"
                  style={{
                    pointerEvents: "none",
                    // Apply specific adjustment for Distrikt SVG if needed
                    transform:
                      properties[hoveredProperty].title === "Distrikt"
                        ? "translate(0, 0) scale(1)"
                        : "none",
                  }}
                >
                  <object
                    data={properties[hoveredProperty].svg}
                    type="image/svg+xml"
                    className={`w-full h-full ${
                      properties[hoveredProperty].title === "Distrikt"
                        ? "distrikt-svg-fix"
                        : ""
                    }`}
                  />
                </div>
              )}

              {/* Tooltip */}
              {/* {hoveredProperty !== null && (
                <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-sm z-30 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {properties[hoveredProperty].title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    {properties[hoveredProperty].specs}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {properties[hoveredProperty].description}
                  </p>
                  <Link
                    href={`/properties/${properties[
                      hoveredProperty
                    ].title.toLowerCase()}`}
                    className="text-sm text-brand hover:underline font-medium"
                  >
                    View details →
                  </Link>
                </div>
              )} */}
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-center px-4 sm:px-6 lg:px-8 mt-8 text-brand mx-auto text-lg  font-sans"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Hover over the markers to explore our residential districts, or click
          on a marker to learn more.
        </motion.p>
      </div>
    </section>
  );
}
