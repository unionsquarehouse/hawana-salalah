"use client";

import { useEffect, useState } from "react";
import Property from "@/components/Property";

export default function PropertyContent({ propertyParam }) {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    setProperty({ name: "Amazi", type: "villa" });
  }, [propertyParam]);

  if (!property) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  return <Property property={property} />;
}