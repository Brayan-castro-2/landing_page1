import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExpandableGalleryProps {
  images: string[];
  className?: string;
}

export const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({ images, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) {
      return 1;
    }
    return hoveredIndex === index ? 2 : 0.5;
  };

  return (
    <div className={className}>
      {/* Horizontal Expandable Gallery */}
      <div className="flex gap-2 h-96 w-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer overflow-hidden rounded-2xl border border-white/10"
            style={{ flex: 1 }}
            animate={{ flex: getFlexValue(index) }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => openImage(index)}
          >
            <img
              src={image}
              alt={`Galería Andrés González ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: hoveredIndex === index ? 0 : 0.35 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={closeImage}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
              onClick={closeImage}
              aria-label="Cerrar modal"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                className="absolute left-4 z-10 text-white/80 hover:text-white transition-colors bg-white/10 p-3 rounded-full"
                onClick={goToPrev}
                aria-label="Imagen anterior"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={images[selectedIndex]}
                alt={`Galería Andrés González ${selectedIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                className="absolute right-4 z-10 text-white/80 hover:text-white transition-colors bg-white/10 p-3 rounded-full"
                onClick={goToNext}
                aria-label="Siguiente imagen"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs font-mono bg-black/70 border border-white/10 px-4 py-1.5 rounded-full">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function Component() {
  const images = [
    "./IMG_6602.jpg",
    "./IMG_6616.jpg",
    "./IMG_6798.jpg",
    "./IMG_6848.jpg",
    "./IMG_6413.jpg",
    "./IMG_4203.jpg"
  ];

  return (
    <div className="min-h-screen bg-[#05050a] flex items-center justify-center p-8">
      <ExpandableGallery images={images} className="w-full max-w-6xl" />
    </div>
  );
}

export default ExpandableGallery;
