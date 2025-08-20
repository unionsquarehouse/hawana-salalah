import ContactForm from "@/components/ContactForm";
import CTASection from "@/components/sections/CTASection";
import React from "react";

// ✅ Metadata for SEO & Social Sharing
export const metadata = {
  title: "Contact Us | Ghaf Woods",
  description:
    "Connect with Ghaf Woods to explore luxury villas, townhouses, and waterfront residences in Dubai. Fill out the contact form to register your interest today.",
  keywords: [
    "Contact Ghaf Woods",
    "Dubai Real Estate",
    "Luxury Villas",
    "Waterfront Properties",
    "Townhouses in Dubai",
    "Nshama Projects",
    "Property Registration Dubai",
  ],
  openGraph: {
    title: "Contact Us | Ghaf Woods",
    description:
      "Register your interest in premium properties at Ghaf Woods, Dubai. Get in touch for floor plans, prices, and exclusive updates.",
    url: "https://ghafwoods.vercel.app/contact", // Update if different
    siteName: "Ghaf Woods",
    images: [
      {
        url: "https://ghafwoods.vercel.app/assets/ghaf-woods-aerial-shot.jpg",
        width: 1200,
        height: 630,
        alt: "Ghaf Woods Aerial View",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Ghaf Woods",
    description:
      "Get in touch with Ghaf Woods to explore premium villas and townhouses in Dubai.",
    images: ["https://ghafwoods.vercel.app/assets/ghaf-woods-aerial-shot.jpg"],
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col pt-10">
      <ContactForm />
      <CTASection />
    </div>
  );
}
