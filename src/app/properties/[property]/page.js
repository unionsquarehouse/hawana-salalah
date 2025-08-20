// src/app/properties/[property]/page.js
import PropertyContent from "@/components/PropertyContent";

const validProperties = [
  {
    name: "Capria",
    type: "apartment",
    coverImage: "https://ghafwoods.vercel.app/assets/properties/capria.jpg",
  },
  {
    name: "Lacina",
    type: "apartment",
    coverImage: "https://ghafwoods.vercel.app/assets/properties/lacina.jpg",
  },
  {
    name: "Serra",
    type: "apartment",
    coverImage: "https://ghafwoods.vercel.app/assets/properties/serra.jpg",
  },
  {
    name: "Distrikt",
    type: "apartment",
    coverImage: "https://ghafwoods.vercel.app/assets/properties/distrikt.jpg",
  },
  {
    name: "Cilia",
    type: "apartment",
    coverImage: "https://ghafwoods.vercel.app/assets/properties/cilia.jpg",
  },
];


// ✅ SERVER-SIDE METADATA
export async function generateMetadata({ params }) {
  params=await params
  const property = validProperties.find(
    (p) => p?.name?.toLowerCase() === params?.property?.toLowerCase()
  );
  if (!property) return { title: "Property Not Found" };

  const capitalized = property?.name.charAt(0).toUpperCase() + property?.name.slice(1);

  return {
    title: `${capitalized} | Ghaf Woods`,
    description: `Explore ${capitalized} in Ghaf Woods, Dubai. ${property?.type} residence with unique features.`,
    openGraph: {
      title: `${capitalized} | Ghaf Woods`,
      description: `Discover ${capitalized}, a stunning ${property?.type} in Ghaf Woods.`,
      url: `https://ghafwoods.vercel.app/properties/${params?.property}`,
      siteName: "Ghaf Woods",
      images: [
        {
          url: property.coverImage,
          width: 1200,
          height: 630,
          alt: `${capitalized} | Ghaf Woods`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalized} | Ghaf Woods`,
      description: `Discover ${capitalized}, a ${property?.type} in Ghaf Woods.`,
      images: [property?.coverImage],
    },
  };
}

export default async function PropertyPage({ params }) {
  params=await params
  console.log(params,"params");
  
  return <PropertyContent propertyParam={params?.property} />;
}
