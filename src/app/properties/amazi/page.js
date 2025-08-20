"use client"
import PropertyContent from "@/components/PropertyContent";

const validProperties = [
  {
    name: "Amazi",
    type: "villa",
    coverImage: "/assets/hawana/amazi.webp",
  },
];



export default async function PropertyPage({ params }) {
  params = await params;
  console.log({ params, assumedProperty: "Amazi" }, "PropertyPage");

  return <PropertyContent propertyParam={params?.property} />;
}