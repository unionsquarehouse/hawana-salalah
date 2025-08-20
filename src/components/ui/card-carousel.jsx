"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { SparklesIcon } from "lucide-react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Badge } from "@/components/ui/badge";

export const CardCarousel = ({
  images,
  autoplayDelay = 1500,
  showPagination = true,
  showNavigation = true,
}) => {
  const css = `
    .swiper {
      width: 100%;
      padding-bottom: 50px;
    }
    
    .swiper-slide {
      background-position: center;
      background-size: cover;
      width: 70vh;
      max-width: 100%;
    }
    
    .swiper-slide img {
      display: block;
      width: 100%;
      height: 50vh;
      object-fit: cover;
      border-radius: 12px;
    }
    
    .swiper-3d .swiper-slide-shadow-left,
    .swiper-3d .swiper-slide-shadow-right {
      background: none;
    }
    
    .swiper-button-next,
    .swiper-button-prev {
      color: #ffffff;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .swiper-button-next:after,
    .swiper-button-prev:after {
      font-size: 20px;
    }
    
    .swiper-pagination-bullet {
      background: #ffffff;
      opacity: 0.5;
    }
    
    .swiper-pagination-bullet-active {
      background: #ffffff;
      opacity: 1;
    }
  `;

  return (
    <section className="w-full py-4">
      <style>{css}</style>
      <div className="mx-auto w-[95vw] xl:w-[75vw] rounded-[24px] border border-black/5 p-2 shadow-sm">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-black/5 bg-gray-50/50 p-2 shadow-sm items-center md:gap-8 md:p-4">
          
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <h3 className="text-brand font-medium uppercase tracking-wider text-sm md:text-xl font-sans">
                Project Gallery
              </h3>
            </div>

            <h2 className="text-4xl md:text-6xl font-ivy font-bold text-brand mb-6">
              Interior Gallery
            </h2>

            <div className="h-0.5 w-24 bg-brand mx-auto mb-8" />

            <p className="text-lg md:text-xl font-sans text-brand/80 max-w-3xl mx-auto">
              Explore the luxurious interiors of Amazi’s villas and chalets.
            </p>
          </motion.div>

          <div className="flex w-full items-center justify-center gap-4">
            <div className="w-full">
              <Swiper
                spaceBetween={30}
                autoplay={{
                  delay: autoplayDelay,
                  disableOnInteraction: false,
                }}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 2,
                }}
                pagination={showPagination ? { clickable: true } : false}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : false
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="size-full rounded-3xl">
                      <Image
                        src={image.src}
                        width={1200}
                        height={800}
                        className="size-full rounded-xl"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};