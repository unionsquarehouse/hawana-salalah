"use client";
import { useState, useEffect, useRef } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "./language-switcher";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPropertiesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const properties = [
    { name: "Amazi Cove", type: "chalets" },
    { name: "Amazi Rise", type: "villas" },
    { name: "Amazi Islands", type: "villas" },
    { name: "Amazi Beach", type: "villas" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 py-3   ${
        scrolled ? "bg-brand shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" aria-label="Amazi at Hawana Salalah Home">
              <Image
                src="/assets/hawana-logo.webp"
                alt="Amazi at Hawana Salalah Logo"
                width={150}
                height={50}
                priority
                className={`object-contain ${!scrolled ? "brightness-0 invert" : ""}`}
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block md:text-lg">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                href="/"
                className="font-ivy font-semibold px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Home"
              >
                Home
              </Link>

              {/* Properties Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
                  className="font-ivy font-semibold px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-white transition-colors flex items-center"
                  aria-label="Toggle Properties Menu"
                >
                  Properties
                  <FaChevronDown className="ml-1 text-base" />
                </button>

                {isPropertiesOpen && (
                  <div className="absolute left-0 mt-2 w-60 rounded-md shadow-md bg-brand border border-white/20 z-50">
                    <div className="py-1">
                      {properties.map((property) => (
                        <Link
                          key={property.name}
                          href={`/properties/${property.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-base text-white hover:bg-white/10 font-sans font-semibold"
                          onClick={() => setIsPropertiesOpen(false)}
                          aria-label={`View ${property.name}`}
                        >
                          {property.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                className="font-ivy font-semibold px-3 py-2 rounded-md text-white hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Contact"
              >
                Contact
              </Link>

              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-brand border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block font-ivy font-medium text-white hover:bg-white/10 rounded-lg px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Home"
            >
              Home
            </Link>

            <Link
              href="/contact"
              className="block font-ivy font-medium text-white hover:bg-white/10 rounded-lg px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Contact"
            >
              Contact
            </Link>

            {/* Properties Collapsible */}
            <div className="border border-white/20 rounded-lg overflow-hidden">
              <button
                onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
                className="w-full flex justify-between items-center px-4 py-2 font-ivy font-medium text-white hover:bg-white/10"
                aria-label="Toggle Properties Menu"
              >
                Properties
                <FaChevronDown
                  className={`text-base transform transition-transform duration-200 ${
                    isPropertiesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isPropertiesOpen && (
                <div className="bg-brand/90">
                  {properties.map((property) => (
                    <Link
                      key={property.name}
                      href={`/properties/${property.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block font-ivy text-base text-white hover:bg-white/10 px-6 py-2"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsPropertiesOpen(false);
                      }}
                      aria-label={`View ${property.name}`}
                    >
                      {property.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}