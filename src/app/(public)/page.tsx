import Link from 'next/link';
import Image from 'next/image';
import { FadeInWhenVisible } from '@/components/animations';
import CategoriesGrid from '@/components/public/CategoriesGrid';
import { BadgeCheck, Truck, HeadphonesIcon, Smartphone, Tablet, Headphones } from 'lucide-react';

const features = [
  { Icon: BadgeCheck, title: 'Quality Products', description: 'Every product is carefully sourced and vetted for quality, durability, and performance.', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/30' },
  { Icon: Truck, title: 'Fast Shipping', description: 'Get your gadgets delivered quickly with our reliable and speedy shipping options.', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30' },
  { Icon: HeadphonesIcon, title: 'Expert Support', description: 'Our knowledgeable team is here to help you find the perfect device or accessory.', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/30' },
];

const featuredPlaceholders = [
  { Icon: Smartphone, label: 'iPhone 15 Pro', badge: 'Coming Soon', image: 'https://images.unsplash.com/photo-1697537980414-5c1f2d0cbf01?q=80', color: 'text-blue-500' },
  { Icon: Tablet, label: 'iPad Air', badge: 'Coming Soon', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80', color: 'text-purple-500' },
  { Icon: Headphones, label: 'AirPods Pro', badge: 'Coming Soon', image: 'https://images.unsplash.com/photo-1588423771073-b8903fead714?q=80', color: 'text-green-500' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-800 flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80"
            alt="Mobile electronics hero"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <FadeInWhenVisible delay={0}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Premier Mobile Electronics Destination
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Discover premium phones, tablets, cases, chargers, and accessories — all handpicked for quality and value.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/devices"
                className="inline-block border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
              >
                Explore Devices
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Browse our wide selection of mobile electronics and accessories.</p>
            </div>
          </FadeInWhenVisible>
          <CategoriesGrid />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">We go the extra mile to make sure you get the best experience.</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <FadeInWhenVisible key={feature.title} delay={i * 0.15}>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-8 text-center h-full">
                  <div className={`${feature.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <feature.Icon className={`w-8 h-8 ${feature.color}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Get a sneak peek at our top picks — full catalog coming soon.</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {featuredPlaceholders.map((item, i) => (
              <FadeInWhenVisible key={item.label} delay={i * 0.1}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
                  <div className="h-48 relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium px-2 py-0.5 rounded-full mb-2">
                      {item.badge}
                    </span>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.label}</h3>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
          <FadeInWhenVisible>
            <div className="text-center">
              <Link
                href="/products"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                View All Products
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}

