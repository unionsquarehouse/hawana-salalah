import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/fonts.css"; // Import the fonts CSS
import Script from "next/script";

const APP_NAME = "Ghaf Woods";
const APP_DESCRIPTION =
  "Ghaf Woods: An exclusive residential sanctuary in Dubai where luxury meets nature. Discover premium villas, waterfront residences, and garden townhouses amidst lush landscapes.";
const APP_URL = "https://ghafwoods.vercel.app"; // Replace with your actual domain
const APP_IMAGE = `${APP_URL}/assets/ghaf-woods-aerial-shot.jpg`; // Replace with a suitable image for social sharing

export const metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "Ghaf Woods",
    "Dubai",
    "Luxury Villas",
    "Waterfront Residences",
    "Townhouses",
    "Real Estate Dubai",
    "Nature Community",
    "Sustainable Living",
  ],
  applicationName: APP_NAME,
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: APP_URL,
    siteName: APP_NAME,
    images: [{ url: APP_IMAGE, width: 1200, height: 630, alt: APP_NAME }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [APP_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script src="/assets/lang-config.js" strategy="beforeInteractive" />
        <Script src="/assets/translation.js" strategy="beforeInteractive" />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </head>

      <body className="font-ivy antialiased">
        <Navbar />
        <div id="google_translate_element"></div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
