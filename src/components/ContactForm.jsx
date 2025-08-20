"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaUserAlt, FaPhone, FaEnvelope, FaCheck } from "react-icons/fa";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Investor",
    message: "",
    preferredContact: "email",
    priceRange: "1M-2M AED",
    bedrooms: "1",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formTouched, setFormTouched] = useState({});

  // Validate form when touched fields change
  useEffect(() => {
    if (Object.keys(formTouched).length > 0) {
      validateForm();
    }
  }, [formData, formTouched]);

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        formData.phone.replace(/\s/g, "")
      )
    ) {
      errors.phone = "Phone number is invalid";
    }

    if (!formData.interest) {
      errors.interest = "Please select your interest";
    }

    // Message is now optional, so we don't validate it

    if (!formData.preferredContact) {
      errors.preferredContact = "Please select preferred contact method";
    }

    if (!formData.priceRange) {
      errors.priceRange = "Please select a price range";
    }

    if (!formData.bedrooms) {
      errors.bedrooms = "Please select number of bedrooms";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFormTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormTouched({
      name: true,
      email: true,
      phone: true,
      interest: true,
      preferredContact: true,
      priceRange: true,
      bedrooms: true,
      // message is not required, so we don't need to mark it as touched
    });

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Prepare data for our API endpoint
    const leadData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      interest: formData.interest,
      preferredContact: formData.preferredContact,
      priceRange: formData.priceRange,
      bedrooms: formData.bedrooms,
    };

    // Send POST request to our API endpoint
    fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leadData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Lead created successfully:", data);
        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after showing success message
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            interest: "Investor",
            message: "",
            preferredContact: "email",
          });
          setFormTouched({});
          setFormErrors({});
        }, 5000);
      })
      .catch((error) => {
        console.error("Error creating lead:", error);
        setIsSubmitting(false);
        setFormErrors((prev) => ({
          ...prev,
          submission:
            "There was an error submitting your request. Please try again.",
        }));
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="relative overflow-hidden ">
      <div className=" md:w-[95vw] mx-auto px-4 py-12 md:py-16 relative z-10">
        <motion.div
          className="max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div
            className="text-center mb-8 md:mb-12"
            variants={itemVariants}
          >
            <h2 className="text-4xl md:text-6xl font-ivy font-bold text-brand mb-8 leading-tight">
              Register Your Interest
              <div className="section-title-underline"></div>
            </h2>
            <p className="text-brand text-sm md:text-lg mb-6  font-sans">
              Complete the form below to receive exclusive information about
              Town SquareAltn by NSHAMA, including floor plans, pricing, and
              special offers.
            </p>
          </motion.div>

          <div className="section-card font-sans md:text-lg dark:bg-white/5 bg-black/5 backdrop-blur-lg rounded-xl p-5 md:p-6">
            {submitSuccess ? (
              <motion.div
                className="bg-gradient-to-r from-emerald-700/80 to-emerald-900/80 backdrop-blur-sm p-5 md:p-6 rounded-xl text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-white bg-white/20 rounded-full flex items-center justify-center">
                  <FaCheck size={24} className="text-2xl" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">
                  Registration Successful!
                </h3>
                <p className="text-sm md:text-base mb-3 md:mb-4 text-white">
                  Thank you for registering your interest. Our team will contact
                  you shortly with more information.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-b from-[#f8f9f6] to-white text-[#2e3d28] py-20 px-6 md:px-20 overflow-hidden text-brand p-10 rounded-xl"
              >
                <div className="space-y-4 md:col-span-1">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-md font-medium mb-1 text-left text-brand"
                    >
                      Full Name <span className="text-brand">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaUserAlt className="text-md" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-8 pr-4 py-2 bg-white/5 border ${
                          formErrors.name ? "border-red-500" : "border-brand/40"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm`}
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    {formErrors.name && (
                      <p className="mt-0.5 text-md text-red-400">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-md font-medium mb-1 text-left text-brand"
                    >
                      Email Address <span className="text-brand">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaEnvelope className="text-md" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-8 pr-4 py-2 bg-white/5 border ${
                          formErrors.email
                            ? "border-red-500"
                            : "border-brand/40"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm`}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    {formErrors.email && (
                      <p className="mt-0.5 text-md text-red-400">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-md font-medium mb-1 text-left text-brand"
                    >
                      Phone Number <span className="text-brand">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <FaPhone className="text-md" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full pl-8 pr-4 py-2 bg-white/5 border ${
                          formErrors.phone
                            ? "border-red-500"
                            : "border-brand/40"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm`}
                        placeholder="+971 50 123 4567"
                        required
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="mt-0.5 text-md text-red-400">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="priceRange"
                        className="block text-md font-medium mb-1 text-left text-brand"
                      >
                        Price Range <span className="text-brand">*</span>
                      </label>
                      <select
                        id="priceRange"
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-2 py-2 bg-white/5 border ${
                          formErrors.priceRange
                            ? "border-red-500"
                            : "border-brand/40"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm text-brand [&>option]:text-gray-900`}
                        required
                      >
                        <option value="1M-2M AED">1M-2M AED</option>
                        <option value="2M-3M AED">2M-3M AED</option>
                        <option value="3M+ AED">3M+ AED</option>
                      </select>
                      {formErrors.priceRange && (
                        <p className="mt-0.5 text-md text-red-400">
                          {formErrors.priceRange}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="bedrooms"
                        className="block text-md font-medium mb-1 text-left text-brand"
                      >
                        Bedrooms <span className="text-brand">*</span>
                      </label>
                      <select
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-2 py-2 bg-white/5 border ${
                          formErrors.bedrooms
                            ? "border-red-500"
                            : "border-brand/40"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm text-brand [&>option]:text-gray-900`}
                        required
                      >
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                      </select>
                      {formErrors.bedrooms && (
                        <p className="mt-0.5 text-md text-red-400">
                          {formErrors.bedrooms}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="interest"
                      className="block text-md  font-medium mb-1 text-left text-brand"
                    >
                      Are You an Investor or End-User?
                      <span className="text-brand">*</span>
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 bg-white/5 border ${
                        formErrors.interest
                          ? "border-red-500"
                          : "border-brand/40"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm text-brand [&>option]:text-gray-900`}
                      required
                    >
                      <option value="Investor">Investor</option>
                      <option value="End-User">End User</option>
                      <option value="Exploring-Options">
                        Exploring Options
                      </option>
                    </select>
                    {formErrors.interest && (
                      <p className="mt-0.5 text-md text-red-400">
                        {formErrors.interest}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4 md:col-span-1">
                  {/* <div className="grid  gap-3">
                    <div>
                      <label
                        htmlFor="preferredContact"
                        className="block text-md font-medium mb-1 text-left text-brand"
                      >
                        Contact Method <span className="text-brand">*</span>
                      </label>
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-2 py-2 bg-white/5 border ${
                          formErrors.preferredContact ? "border-red-500" : "border-brand/40"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm text-white [&>option]:text-gray-900`}
                        required
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                      {formErrors.preferredContact && (
                        <p className="mt-0.5 text-md text-red-400">
                          {formErrors.preferredContact}
                        </p>
                      )}
                    </div>
                    
                   
                  </div> */}

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-md font-medium mb-1 text-left text-brand"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows="4"
                      className={`w-full px-3 py-2 bg-white/5 border ${
                        formErrors.message
                          ? "border-red-500"
                          : "border-brand/40"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-sm`}
                      placeholder="I'm interested in learning more about..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="mt-0.5 text-md text-red-400">
                        {formErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brand hover:bg-brand-hover  md:text-lg text-white hover:text-white font-medium py-2 px-6 rounded-full transition duration-300 flex items-center justify-center text-sm"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Register Now"
                      )}
                    </motion.button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
