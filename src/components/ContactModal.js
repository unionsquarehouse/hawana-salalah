"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";

export default function ContactModal({ 
  isOpen, 
  onClose, 
  projectName, 
  projectPrice,
  onSubmit 
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    priceRange: "1M-2M AED",
    bedrooms: "1"
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

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
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
      formData.phone.replace(/\s/g, "")
    )) {
      errors.phone = "Phone number is invalid";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Call the parent's onSubmit with the form data
    if (onSubmit) {
      onSubmit(formData, {
        onSuccess: () => {
          setIsSubmitting(false);
          setSubmitSuccess(true);
          
          // Close modal after showing success message
          setTimeout(() => {
            resetForm();
            onClose();
          }, 3000);
        },
        onError: () => {
          setIsSubmitting(false);
          // Show error message
          setFormErrors(prev => ({
            ...prev,
            submission: "There was an error submitting your request. Please try again."
          }));
        }
      });
    } else {
      // Default behavior if no onSubmit is provided
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Close modal after showing success message
        setTimeout(() => {
          resetForm();
          onClose();
        }, 3000);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      priceRange: "1M-2M AED",
      bedrooms: "1"
    });
    setFormErrors({});
    setSubmitSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSubmitting && !submitSuccess && onClose()}
        >
          <motion.div
            className="bg-white/80 rounded-xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {!isSubmitting && !submitSuccess && (
              <button
                className="absolute top-4 right-4 text-brand hover:text-black"
                onClick={onClose}
              >
                <FaTimesCircle size={24} />
              </button>
            )}

            {submitSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100  rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 text-brand ">Thank You!</h3>
                <p className="text-gray-600 ">
                  Your interest in {projectName} has been registered. Our team will contact you shortly with more information.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-1 text-brand">
                  {projectName}
                </h3>
                {projectPrice && (
                  <p className="text-brand text-xl font-bold mb-4">{projectPrice}</p>
                )}
                
                <p className="text-brand font-bold mb-4">
                  Please fill in your details to receive more information about {projectName}.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-3 font-bold">
                  <div>
                    <label htmlFor="name" className="block text-md font-bold mb-1 text-brand">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        formErrors.name ? "border-red-500" : "border-gray-300 "
                      } rounded-lg bg-white  text-brand  focus:outline-none focus:ring-2 focus:ring-brand text-sm`}
                      placeholder="John Smith"
                      required
                    />
                    {formErrors.name && (
                      <p className="mt-0.5 text-xs text-red-500">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-md font-bold mb-1 text-brand">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        formErrors.email ? "border-red-500" : "border-gray-300 "
                      } rounded-lg bg-white  text-brand  focus:outline-none focus:ring-2 focus:ring-brand text-sm`}
                      placeholder="john@example.com"
                      required
                    />
                    {formErrors.email && (
                      <p className="mt-0.5 text-xs text-red-500">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-md font-bold mb-1 text-brand">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        formErrors.phone ? "border-red-500" : "border-gray-300"
                      } rounded-lg bg-white  text-brand  focus:outline-none focus:ring-2 focus:ring-brand text-sm`}
                      placeholder="+971 50 123 4567"
                      required
                    />
                    {formErrors.phone && (
                      <p className="mt-0.5 text-xs text-red-500">{formErrors.phone}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="priceRange" className="block text-md font-bold mb-1 text-brand">
                        Price Range *
                      </label>
                      <select
                        id="priceRange"
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className={`w-full px-2 py-2 border ${
                          formErrors.priceRange ? "border-red-500" : "border-gray-300 "
                        } rounded-lg bg-white  text-brand  focus:outline-none focus:ring-2 focus:ring-brand text-sm`}
                        required
                      >
                        <option value="1M-2M AED">1M-2M AED</option>
                        <option value="2M-3M AED">2M-3M AED</option>
                        <option value="3M+ AED">3M+ AED</option>
                      </select>
                      {formErrors.priceRange && (
                        <p className="mt-0.5 text-xs text-red-500">{formErrors.priceRange}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="bedrooms" className="block text-md font-bold mb-1 text-brand">
                        Bedrooms *
                      </label>
                      <select
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        className={`w-full px-2 py-2 border ${
                          formErrors.bedrooms ? "border-red-500" : "border-gray-300 "
                        } rounded-lg bg-white  text-brand  focus:outline-none focus:ring-2 focus:ring-brand text-sm`}
                        required
                      >
                        <option value="1">1 Bedroom</option>
                        <option value="2">2 Bedrooms</option>
                        <option value="3">3 Bedrooms</option>
                      </select>
                      {formErrors.bedrooms && (
                        <p className="mt-0.5 text-xs text-red-500">{formErrors.bedrooms}</p>
                      )}
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full border font-bold bg-brand hover:border-brand hover:text-brand hover:bg-transparent text-white  py-2 px-4 rounded-full transition duration-300 flex items-center justify-center mt-4 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}




