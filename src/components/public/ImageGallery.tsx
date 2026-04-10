'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex];

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-2xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {selected.src ? (
              <Image
                src={selected.src}
                alt={selected.alt || productName}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <Camera className="w-24 h-24 text-gray-300 dark:text-gray-600" aria-hidden="true" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center border-2 transition-colors overflow-hidden relative ${
                i === selectedIndex ? 'border-blue-600' : 'border-transparent hover:border-blue-300'
              }`}
            >
              {img.src ? (
                <Image
                  src={img.src}
                  alt={img.alt || productName}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <Camera className="w-5 h-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

