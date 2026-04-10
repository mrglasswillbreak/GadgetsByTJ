'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations';
import { Package } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  category: string;
  slug: string;
  image?: string;
}

export default function ProductCard({ name, price, category, slug, image }: ProductCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 h-48 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <Package className="w-16 h-16 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        )}
      </div>
      <div className="p-4">
        <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full mb-2">
          {category}
        </span>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">{name}</h3>
        <p className="text-blue-600 dark:text-blue-400 font-bold text-lg mb-3">{price}</p>
        <Link
          href={`/products/${slug}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded-lg transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}

