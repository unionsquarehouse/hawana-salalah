import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function CallToActionSection({ property }) {
  return (
    <div className="py-32 bg-[#1c2a18] relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand/20 via-transparent to-transparent"></div>
        </div>
      </div>

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-ivy">
            Experience the Future of Living
          </h2>
          <p className="text-white/80 mb-12 text-lg mx-auto">
            {property.name} is more than a residence—it's a vision of tomorrow's
            living experience, available today. Reserve your space in this
            revolutionary community.
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
            <a
              href={`/contact?property=${property.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-gray-900 transition-all hover:shadow-lg hover:shadow-white/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FaArrowRight className="text-sm" />
                Reserve Your Residence
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white via-white to-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
