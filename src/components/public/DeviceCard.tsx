'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations';

interface DeviceCardProps {
  name: string;
  brand: string;
  deviceType: string;
  slug: string;
  emoji: string;
}

export default function DeviceCard({ name, brand, deviceType, slug, emoji }: DeviceCardProps) {
  const typeColors: Record<string, string> = {
    Phone: 'bg-blue-100 text-blue-700',
    Tablet: 'bg-purple-100 text-purple-700',
    Accessory: 'bg-green-100 text-green-700',
  };

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <div
        className={`h-44 flex items-center justify-center text-7xl bg-gradient-to-br ${
          deviceType === 'Phone'
            ? 'from-blue-50 to-indigo-100'
            : deviceType === 'Tablet'
            ? 'from-purple-50 to-violet-100'
            : 'from-green-50 to-emerald-100'
        }`}
      >
        {emoji}
      </div>
      <div className="p-4">
        <span
          className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${
            typeColors[deviceType] || 'bg-gray-100 text-gray-700'
          }`}
        >
          {deviceType}
        </span>
        <p className="text-sm text-gray-500 mb-0.5">{brand}</p>
        <h3 className="font-semibold text-gray-900 mb-3">{name}</h3>
        <Link
          href={`/devices/${slug}`}
          className="block w-full text-center border border-blue-600 text-blue-600 text-sm font-medium py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}
