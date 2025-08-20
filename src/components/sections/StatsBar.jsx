import { motion } from "framer-motion";

export default function StatsBar({ details, property }) {
  return (
    <div className="bg-white py-6 border-b border-gray-200">
      <div className=" md:w-[95vw] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Price
            </p>
            <p className="text-xl font-medium text-gray-900">{details.price}</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Type
            </p>
            <p className="text-xl font-medium text-gray-900">{property.type}</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Size
            </p>
            <p className="text-xl font-medium text-gray-900">
              5,000 - 8,500 sq.ft
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-gray-500 uppercase tracking-wider">
              Completion
            </p>
            <p className="text-xl font-medium text-gray-900">Q4 2025</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
