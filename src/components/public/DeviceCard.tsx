'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations';
import { Smartphone, Tablet, Headphones } from 'lucide-react';

interface DeviceCardProps {
  name: string;
  brand: string;
  deviceType: string;
  slug: string;
  image?: string;
}

const typeGradients: Record<string, string> = {
  Phone: 'from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30',
  Tablet: 'from-purple-50 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30',
  Accessory: 'from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
};

const typeColors: Record<string, string> = {
  Phone: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300',
  Tablet: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300',
  Accessory: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300',
};

const FallbackIcon = ({ deviceType }: { deviceType: string }) => {
  const iconClass = 'w-16 h-16 text-gray-400 dark:text-gray-500';
  if (deviceType === 'Phone') return <Smartphone className={iconClass} aria-hidden="true" />;
  if (deviceType === 'Tablet') return <Tablet className={iconClass} aria-hidden="true" />;
  return <Headphones className={iconClass} aria-hidden="true" />;
};

export default function DeviceCard({ name, brand, deviceType, slug, image }: DeviceCardProps) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div
        className={`h-44 flex items-center justify-center bg-gradient-to-br ${typeGradients[deviceType] || 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700'} relative overflow-hidden`}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <FallbackIcon deviceType={deviceType} />
        )}
      </div>
      <div className="p-4">
        <span
          className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${
            typeColors[deviceType] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          {deviceType}
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">{brand}</p>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{name}</h3>
        <Link
          href={`/devices/${slug}`}
          className="block w-full text-center border border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 text-sm font-medium py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-colors"
        >
          Learn More
        </Link>
      </div>
    </motion.div>
  );
}

