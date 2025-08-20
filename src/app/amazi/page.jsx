import PropertyContent from "@/components/PropertyContent";

const validProperties = [
  {
    name: "Amazi",
    type: "villa",
    coverImage: "/assets/hawana/amazi.jpg",
  },
  {
    name: "Fanar Views",
    type: "home",
    coverImage: "/assets/hawana/fanar-views.jpg",
  },
  {
    name: "Marina Bay",
    type: "apartment",
    coverImage: "/assets/hawana/marina-bay.jpg",
  },
  {
    name: "Laguna Gardens",
    type: "home",
    coverImage: "/assets/hawana/laguna-gardens.jpg",
  },
];

// ✅ SERVER-SIDE METADATA
export async function generateMetadata({ params }) {
  params = await params;
  const property = validProperties.find(
    (p) => p?.name?.toLowerCase() === params?.property?.toLowerCase()
  );
  if (!property) return { title: "Property Not Found" };

  const capitalized = property?.name.charAt(0).toUpperCase() + property?.name.slice(1);

  return {
    title: `${capitalized} | Hawana Salalah`,
    description: `Explore ${capitalized} at Hawana Salalah, Oman’s premier coastal resort. Luxurious ${property?.type} with stunning coastal views and Omani residency benefits.`,
    openGraph: {
      title: `${capitalized} | Hawana Salalah`,
      description: `Discover ${capitalized}, a luxurious ${property?.type} in Hawana Salalah.`,
      url: `https://hawanasalalah.com/properties/${params?.property}`,
      siteName: "Hawana Salalah",
      images: [
        {
          url: property.coverImage,
          width: 1200,
          height: 630,
          alt: `${capitalized} | Hawana Salalah`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${capitalized} | Hawana Salalah`,
      description: `Discover ${capitalized}, a ${property?.type} in Hawana Salalah.`,
      images: [property?.coverImage],
    },
  };
}

export default async function PropertyPage({ params }) {
  params = await params;
  console.log(params, "params");

  return <PropertyContent propertyParam={params?.property} />;
}