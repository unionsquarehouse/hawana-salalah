"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    setEmailError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe");
      }

      setEmail("");
      setSubscribeSuccess(true);

      setTimeout(() => {
        setSubscribeSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setEmailError("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Wave pattern background */}
      <div className="absolute top-0 left-0 w-full h-24 bg-[url('/assets/wave-pattern.png')] bg-repeat-x opacity-20" />

      {/* Main footer content */}
      <div className="relative w-[95vw] xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Column 1: Logo and About */}
          <motion.div className="space-y-6" variants={itemVariants}>
            <Link href="/" className="inline-block">
              <div className="w-48 h-24 relative">
                <Image
                  src="/assets/hawana/hawana-salalah-logo.webp"
                  alt="Hawana Salalah Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-200 text-sm md:text-base font-sans leading-relaxed">
              Hawana Salalah: Oman’s premier coastal resort, offering freehold properties, Omani residency, and vibrant communities along 7km of pristine beaches.
            </p>
            <div className="flex space-x-4 pt-4">
              {[
                { href: "https://facebook.com/hawanasalalah", icon: <FaFacebookF size={18} />, label: "Facebook" },
                { href: "https://instagram.com/hawanasalalah", icon: <FaInstagram size={18} />, label: "Instagram" },
                { href: "https://twitter.com/hawanasalalah", icon: <FaTwitter size={18} />, label: "Twitter" },
                { href: "https://linkedin.com/company/hawanasalalah", icon: <FaLinkedinIn size={18} />, label: "LinkedIn" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-brand transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl md:text-2xl font-ivy mb-6 relative text-white">
              Quick Links
              <motion.span
                className="absolute -bottom-2 left-0 h-0.5 w-12 bg-white"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.span>
            </h3>
            <ul className="grid grid-cols-1 gap-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Amazi", href: "/properties/amazi" },
                { name: "Fanar Views", href: "/properties/fanar-views" },
                { name: "Marina Bay", href: "/properties/marina-bay" },
                { name: "Laguna Gardens", href: "/properties/laguna-gardens" },
                { name: "Contact", href: "/contact" },
                { name: "About Us", href: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-200 font-sans text-sm md:text-base hover:text-white transition-colors flex items-center group"
                  >
                    <span className="mr-2 text-brand text-md transform group-hover:translate-x-1 transition-transform">
                      ›
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl md:text-2xl font-ivy mb-6 relative text-white">
              Contact Us
              <motion.span
                className="absolute -bottom-2 left-0 h-0.5 w-12 bg-white"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.span>
            </h3>
            <ul className="space-y-4 text-sm md:text-base font-sans">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-brand" />
                <span className="text-gray-200">Hawana Salalah, Dhofar, Oman</span>
              </li>
              <li>
                <a
                  href="tel:+96823235700"
                  className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors"
                >
                  <FaPhoneAlt className="text-brand" />
                  +968 2323 5700
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hawanasalalah.com"
                  className="flex items-center gap-3 text-gray-200 hover:text-white transition-colors"
                >
                  <FaEnvelope className="text-brand" />
                  info@hawanasalalah.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Column 4: Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl md:text-2xl font-ivy mb-6 relative text-white">
              Stay Updated
              <motion.span
                className="absolute -bottom-2 left-0 h-0.5 w-12 bg-white"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.span>
            </h3>
            <p className="text-gray-200 text-sm md:text-base mb-6 font-sans leading-relaxed">
              Join our newsletter for the latest updates on Hawana Salalah’s properties, exclusive offers, and Oman’s coastal lifestyle.
            </p>
            {subscribeSuccess ? (
              <motion.div
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand/20 text-green-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-sans text-sm md:text-base">
                  Thank you for subscribing! Stay tuned for Hawana Salalah updates.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-md border font-sans ${
                      emailError ? "border-red-500" : "border-white/20"
                    } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base shadow-md`}
                    required
                    aria-label="Enter your email address for newsletter"
                  />
                  {emailError && (
                    <p className="text-red-400 font-sans text-xs mt-2">
                      {emailError}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-sans bg-brand text-white hover:bg-brand/90 py-3 px-4 rounded-lg transition-all text-base shadow-md flex items-center justify-center"
                  aria-label={isSubmitting ? "Subscribing to newsletter" : "Subscribe to newsletter"}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright bar */}
      <div className="bg-black backdrop-blur-md py-6 border-t border-white/20">
        <div className="w-[95vw] xl:w-[75vw] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-200 text-sm font-sans mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Hawana Salalah. All rights reserved.</p>
            <p className="mt-1">A development by Muriya and OMRAN.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/terms-and-conditions"
              className="text-gray-200 hover:text-white text-sm font-sans transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link
              href="/privacy-policy"
              className="text-gray-200 hover:text-white text-sm font-sans transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}