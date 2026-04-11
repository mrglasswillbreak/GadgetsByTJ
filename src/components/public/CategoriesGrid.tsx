'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations';
import { StaggerChildren } from '@/components/animations';
import { Smartphone, ShieldCheck, Zap, Headphones, Tablet, MonitorSmartphone } from 'lucide-react';

const categories = [
  {
    name: 'Phone Cases',
    icon: Smartphone,
    slug: 'phone-cases',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&q=80',
    accent: 'from-blue-600/80',
  },
  {
    name: 'Screen Protectors',
    icon: ShieldCheck,
    slug: 'screen-protectors',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80',
    accent: 'from-violet-600/80',
  },
  {
    name: 'Chargers',
    icon: Zap,
    slug: 'chargers',
    image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&q=80',
    accent: 'from-amber-600/80',
  },
  {
    name: 'Audio',
    icon: Headphones,
    slug: 'audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    accent: 'from-emerald-600/80',
  },
  {
    name: 'Tablets',
    icon: Tablet,
    slug: 'tablets',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80',
    accent: 'from-purple-600/80',
  },
  {
    name: 'Phones',
    icon: MonitorSmartphone,
    slug: 'phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    accent: 'from-indigo-600/80',
  },
];

export default function CategoriesGrid() {
  return (
    <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-5">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <motion.div
            key={cat.slug}
            variants={fadeInUp}
            whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] } }}
          >
            <Link
              href="/products"
              className="group relative flex flex-col justify-end overflow-hidden rounded-2xl h-44 sm:h-52 shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Background image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.accent} via-black/40 to-transparent`} />
              {/* Content */}
              <div className="relative z-10 p-4 flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl">
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="text-sm sm:text-base font-semibold text-white drop-shadow">{cat.name}</span>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </StaggerChildren>
  );
}

