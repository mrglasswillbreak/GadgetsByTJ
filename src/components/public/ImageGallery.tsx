'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageGalleryProps {
  images: { src: string; alt: string; emoji?: string }[];
  productName: string;
}

export default function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = images[selectedIndex];

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {selected.emoji ? (
              <span className="text-9xl">{selected.emoji}</span>
            ) : (
              <img src={selected.src} alt={selected.alt || productName} className="w-full h-full object-cover" />
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
              className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl border-2 transition-colors ${
                i === selectedIndex ? 'border-blue-600' : 'border-transparent hover:border-blue-300'
              }`}
            >
              {img.emoji || '📷'}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
