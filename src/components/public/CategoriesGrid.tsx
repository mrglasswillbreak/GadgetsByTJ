'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations';
import { StaggerChildren } from '@/components/animations';

const categories = [
  { name: 'Phone Cases', emoji: '📱', slug: 'phone-cases' },
  { name: 'Screen Protectors', emoji: '🛡️', slug: 'screen-protectors' },
  { name: 'Chargers', emoji: '⚡', slug: 'chargers' },
  { name: 'Audio', emoji: '🎧', slug: 'audio' },
  { name: 'Tablets', emoji: '💻', slug: 'tablets' },
  { name: 'Phones', emoji: '📲', slug: 'phones' },
];

export default function CategoriesGrid() {
  return (
    <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => (
        <motion.div key={cat.slug} variants={fadeInUp}>
          <Link
            href="/products"
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow hover:shadow-md border border-gray-100 hover:border-blue-200 p-6 transition-all group"
          >
            <span className="text-5xl mb-3 group-hover:scale-110 transition-transform inline-block">{cat.emoji}</span>
            <span className="text-sm font-medium text-gray-700 text-center">{cat.name}</span>
          </Link>
        </motion.div>
      ))}
    </StaggerChildren>
  );
}
