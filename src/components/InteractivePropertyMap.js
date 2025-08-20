"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InteractivePropertyMap({ properties, onPropertyHover }) {
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const svgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef(null);

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
    
    if (mapRef.current) {
      observer.observe(mapRef.current);
    }
    
    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
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
          area.style.cursor = 'pointer';
          area.style.transition = 'fill 0.3s ease';
          area.style.fill = 'rgba(46, 61, 40, 0.2)'; // Default color
          
          area.addEventListener('mouseenter', () => {
            setHoveredProperty(index);
            if (onPropertyHover) onPropertyHover(index);
            area.style.fill = 'rgba(46, 61, 40, 0.6)'; // Highlight color
          });
          
          area.addEventListener('mouseleave', () => {
            setHoveredProperty(null);
            area.style.fill = 'rgba(46, 61, 40, 0.2)'; // Default color
          });
          
          area.addEventListener('click', () => {
            window.location.href = `/properties/${property.title.toLowerCase()}`;
          });
        }
      });
    };

    const svgObject = svgRef.current.querySelector('object');
    if (svgObject) {
      svgObject.addEventListener('load', handleSvgLoad);
    }

    return () => {
      const svgObject = svgRef.current?.querySelector('object');
      if (svgObject) {
        svgObject.removeEventListener('load', handleSvgLoad);
      }
    };
  }, [svgRef.current, properties, onPropertyHover]);

  return (
    <motion.div 
      ref={mapRef}
      className="relative h-[500px] rounded-xl overflow-hidden border border-gray-200 bg-gray-50"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Main GhafWoods SVG */}
      <div className="absolute inset-0 z-10" ref={svgRef}>
        <object 
          data="/assets/svgs/ghafwoods.svg" 
          type="image/svg+xml"
          className="w-full h-full"
        />
      </div>
      
      {/* Property SVG Overlays */}
      {properties.map((property, index) => (
        <div 
          key={index}
          className="absolute inset-0 z-20 transition-opacity duration-300"
          style={{ 
            opacity: hoveredProperty === index ? 1 : 0,
            pointerEvents: 'none'
          }}
        >
          <object 
            data={property.svg} 
            type="image/svg+xml"
            className="w-full h-full"
          />
        </div>
      ))}
      
      {/* Property Info Tooltip */}
      {hoveredProperty !== null && (
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg z-30">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{properties[hoveredProperty].title}</h3>
          <p className="text-sm text-gray-700 mb-2">{properties[hoveredProperty].specs}</p>
          <Link 
            href={`/properties/${properties[hoveredProperty].title.toLowerCase()}`}
            className="text-xs text-brand hover:underline"
          >
            View details
          </Link>
        </div>
      )}
      
      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm z-30">
        <h4 className="text-xs font-medium text-gray-900 mb-2">Properties</h4>
        <ul className="space-y-1.5">
          {properties.map((property, index) => (
            <li 
              key={index} 
              className="flex items-center gap-2 text-xs cursor-pointer hover:text-brand transition-colors"
              onMouseEnter={() => {
                setHoveredProperty(index);
                if (onPropertyHover) onPropertyHover(index);
              }}
              onMouseLeave={() => setHoveredProperty(null)}
            >
              <div className="w-2 h-2 rounded-full bg-brand"></div>
              {property.title}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}