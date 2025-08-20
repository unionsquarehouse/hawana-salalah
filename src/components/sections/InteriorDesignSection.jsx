import { motion } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaPlus } from "react-icons/fa";

export default function InteriorDesignSection({
  details,
  activeInteriorType,
  setActiveInteriorType,
}) {
  return (
    <div className="py-32 bg-white">
      <div className=" md:w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-ivy">
            Interior Design Collections
          </h2>
          <p className="text-gray-700 mx-auto text-lg">
            Choose between our signature design collections, each offering a
            unique aesthetic and atmosphere.
          </p>
        </motion.div>

        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-gray-100 rounded-full">
            <button
              onClick={() => setActiveInteriorType("radiance")}
              className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                activeInteriorType === "radiance"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {activeInteriorType === "radiance" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand to-emerald-500 rounded-full"
                  layoutId="interiorTypeBackground"
                />
              )}
              <span className="relative z-10">Radiance Collection</span>
            </button>
            <button
              onClick={() => setActiveInteriorType("twilight")}
              className={`relative px-8 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                activeInteriorType === "twilight"
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {activeInteriorType === "twilight" && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-brand to-emerald-500 rounded-full"
                  layoutId="interiorTypeBackground"
                />
              )}
              <span className="relative z-10">Twilight Collection</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="relative h-[600px] rounded-2xl overflow-hidden"
              key={`${activeInteriorType}-1`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={details.interiorTypes[activeInteriorType].images[0]}
                alt={`${details.interiorTypes[activeInteriorType].name} - Living Area`}
                fill
                className="object-cover"
              />

              <div className="absolute top-1/4 left-1/4 w-12 h-12 group cursor-pointer">
                <div className="absolute w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center animate-ping opacity-75"></div>
                <div className="absolute w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center">
                  <FaPlus className="text-gray-900" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-gray-900">
                    Premium sustainable materials sourced from eco-conscious
                    suppliers
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative h-[600px] rounded-2xl overflow-hidden"
              key={`${activeInteriorType}-2`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src={details.interiorTypes[activeInteriorType].images[1]}
                alt={`${details.interiorTypes[activeInteriorType].name} - Kitchen`}
                fill
                className="object-cover"
              />

              <div className="absolute bottom-1/3 right-1/3 w-12 h-12 group cursor-pointer">
                <div className="absolute w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center animate-ping opacity-75"></div>
                <div className="absolute w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center">
                  <FaPlus className="text-gray-900" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm text-gray-900">
                    Smart home integration with voice-activated controls
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div
              key={activeInteriorType + "-info"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6 font-ivy">
                {details.interiorTypes[activeInteriorType].name} Collection
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed">
                {details.interiorTypes[activeInteriorType].description}
              </p>

              <div className="space-y-6 mb-8">
                {details.interiorTypes[activeInteriorType].features
                  .slice(0, 3)
                  .map((feature, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <div className="w-3 h-3 rounded-full bg-brand"></div>
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-medium mb-1">
                          Feature {i + 1}
                        </h4>
                        <p className="text-gray-700">{feature}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <button className="group relative overflow-hidden rounded-full bg-gray-100 px-6 py-3 text-gray-900 transition-all hover:shadow-md">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Full Details
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
