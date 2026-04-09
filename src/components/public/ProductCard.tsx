'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations';

interface ProductCardProps {
  name: string;
  price: string;
  category: string;
  slug: string;
  emoji: string;
}

export default function ProductCard({ name, price, category, slug, emoji }: ProductCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center text-6xl">
        {emoji}
      </div>
      <div className="p-4">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full mb-2">
          {category}
        </span>
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{name}</h3>
        <p className="text-blue-600 font-bold text-lg mb-3">{price}</p>
        <Link
          href={`/products/${slug}`}
          className="block w-full text-center bg-blue-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
