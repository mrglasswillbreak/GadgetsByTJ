'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations';
import { StaggerChildren } from '@/components/animations';
import { Smartphone, ShieldCheck, Zap, Headphones, Tablet, MonitorSmartphone } from 'lucide-react';

const categories = [
  { name: 'Phone Cases', icon: Smartphone, slug: 'phone-cases', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { name: 'Screen Protectors', icon: ShieldCheck, slug: 'screen-protectors', color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-900/30' },
  { name: 'Chargers', icon: Zap, slug: 'chargers', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/30' },
  { name: 'Audio', icon: Headphones, slug: 'audio', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' },
  { name: 'Tablets', icon: Tablet, slug: 'tablets', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  { name: 'Phones', icon: MonitorSmartphone, slug: 'phones', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
];

export default function CategoriesGrid() {
  return (
    <StaggerChildren className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <motion.div key={cat.slug} variants={fadeInUp}>
            <Link
              href="/products"
              className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 p-6 transition-all group"
            >
              <div className={`${cat.bg} p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-7 h-7 ${cat.color}`} aria-hidden="true" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 text-center">{cat.name}</span>
            </Link>
          </motion.div>
        );
      })}
    </StaggerChildren>
  );
}

