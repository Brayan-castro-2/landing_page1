"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { SparklesIcon } from "lucide-react"
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules"

import { Badge } from "@/components/ui/badge"

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
}

export const CardCarousel: React.FC<CarouselProps> = ({
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
    width: 300px;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
  }
  
  .swiper-3d .swiper-slide-shadow-left {
    background-image: none;
  }
  .swiper-3d .swiper-slide-shadow-right{
    background: none;
  }
  `
  return (
    <section className="w-full space-y-4">
      <style>{css}</style>
      <div className="mx-auto w-full max-w-5xl rounded-[28px] border border-white/10 bg-slate-950/60 p-4 shadow-2xl backdrop-blur-xl">
        <div className="relative mx-auto flex w-full flex-col rounded-[24px] border border-white/5 bg-neutral-900/40 p-4 shadow-sm md:items-start md:gap-6 md:p-6">
          <Badge
            variant="outline"
            className="rounded-full border-brandorange-500/30 bg-brandorange-500/10 text-brandorange-accent text-xs font-bold px-3 py-1 mb-2"
          >
            <SparklesIcon className="w-3.5 h-3.5 mr-1.5 fill-brandorange-accent text-brandorange-accent" />{" "}
            Experiencias y Resultados
          </Badge>
          <div className="flex flex-col justify-center pb-2 pt-2 md:items-start">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Resultados Reales & Libertad
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Desliza para explorar la galería interactiva de viajes y estilo de vida con Social Business Shark.
            </p>
          </div>

          <div className="flex w-full items-center justify-center gap-4 mt-4">
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
                  depth: 120,
                  modifier: 2.2,
                }}
                pagination={showPagination}
                navigation={
                  showNavigation
                    ? {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }
                    : undefined
                }
                modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index} className="!w-[280px] sm:!w-[340px]">
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
                      <Image
                        src={image.src}
                        width={500}
                        height={700}
                        className="w-full h-full object-cover object-center"
                        alt={image.alt}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
