import { motion } from "framer-motion";
import Image from "next/image";

export default function OverviewSection({ property, details }) {
  return (
    <div className="py-24 bg-white">
      <div className=" md:w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 font-ivy">
              {property.name} Overview
            </h2>
            <p className="text-gray-700 mb-8 leading-relaxed">
              {details.description}
            </p>

            <div className="space-y-6 mb-8">
              {details.features &&
                details.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-brand"></div>
                    </div>
                    <div>
                      <p className="text-gray-700">{feature}</p>
                    </div>
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
                src={details.image || "/assets/placeholder.jpg"}
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
}
