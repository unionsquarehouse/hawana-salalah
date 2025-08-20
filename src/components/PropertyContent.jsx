// src/components/PropertyContent.jsx
"use client";

import { useEffect, useState } from "react";
import Property from "@/components/Property";
import { notFound } from "next/navigation";

export default function PropertyContent({ propertyParam }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validProperties = [
      { name: "Capria", type: "apartment" },
      { name: "Lacina", type: "apartment" },
      { name: "Serra", type: "apartment" },
      { name: "Distrikt", type: "apartment" },
      { name: "Cilia", type: "apartment" },
    ];

    const foundProperty = validProperties.find(
      (p) => p.name.toLowerCase() === propertyParam.toLowerCase()
    );

    if (foundProperty) {
      setProperty(foundProperty);
    }

    setLoading(false);
  }, [propertyParam]);

  if (!loading && !property) {
    notFound();
  }

  if (loading || !property) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  return <Property property={property} />;
}
