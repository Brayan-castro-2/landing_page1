import React from "react"
import { CardCarousel } from "@/components/ui/card-carousel"

const CardCarouselDemo = () => {
  const images = [
    { src: "./IMG_6602.jpg", alt: "Crucero Internacional Costa Diadema" },
    { src: "./IMG_6616.jpg", alt: "Costa Diadema Atardecer" },
    { src: "./IMG_6548.jpg", alt: "Estilo de Vida en Jacuzzi Crucero" },
    { src: "./IMG_6798.jpg", alt: "Viajes y Expansión Buenos Aires" },
    { src: "./IMG_6848.jpg", alt: "Emprendimiento Sin Fronteras Obelisco" },
    { src: "./IMG_6413.jpg", alt: "Estilo de Vida Resort" },
    { src: "./IMG_4203.jpg", alt: "Piscina Infinita Rooftop" },
  ]

  return (
    <div className="w-full">
      <CardCarousel
        images={images}
        autoplayDelay={2500}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCarouselDemo
