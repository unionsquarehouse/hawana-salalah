
import { CardCarousel } from "../ui/card-carousel";

const PropertyInteriorDesignSection = ({}) => {
  const images = [
    { src: "/assets/hawana/23.jpg", alt: "Image 1" },
    { src: "/assets/hawana/22.jpg", alt: "Image 2" },
    { src: "/assets/hawana/21.jpg", alt: "Image 3" },
    { src: "/assets/hawana/20.jpg", alt: "Image 4" },
    { src: "/assets/hawana/19.png", alt: "Image 5" },
    { src: "/assets/hawana/16.jpg", alt: "Image 6" },
    { src: "/assets/hawana/15.jpg", alt: "Image 7" },
    { src: "/assets/hawana/14.jpg", alt: "Image 8" },
    { src: "/assets/hawana/11.jpg", alt: "Image 9" },

  
  ];

  return (
    <div className="w-[95vw] xl:w-[75vw] mx-auto">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  );
};

export default PropertyInteriorDesignSection;
