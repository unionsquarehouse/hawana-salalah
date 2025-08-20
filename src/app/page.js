"use client";
import HeroSection from "../components/sections/HeroSection";
import AmenitiesSection from "../components/sections/AmenitiesSection";
import PropertyTypesSection from "../components/sections/PropertyTypesSection";
import GreenInspirationSection from "../components/sections/GreenInspirationSection";
import NatureBeautySection from "../components/sections/NatureBeautySection";
import CTASection from "../components/sections/CTASection";
import MapSection from "../components/sections/MapSection";
import InteractiveMapSection from "../components/sections/InteractiveMapSection";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />

      {/* <InteractiveMapSection /> */}

      {/* <PropertySlider /> */}

      <AmenitiesSection />

      <GreenInspirationSection />

      {/* <AboutSection /> */}

      <NatureBeautySection />

      {/* <SustainabilitySection /> */} 

      <PropertyTypesSection />

      <MapSection />

      <CTASection />
    </main>
  );
}
