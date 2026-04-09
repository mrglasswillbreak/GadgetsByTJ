import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeInWhenVisible, StaggerChildren, fadeInUp } from '@/components/animations';

const categories = [
  { name: 'Phone Cases', emoji: '📱', slug: 'phone-cases' },
  { name: 'Screen Protectors', emoji: '🛡️', slug: 'screen-protectors' },
  { name: 'Chargers', emoji: '⚡', slug: 'chargers' },
  { name: 'Audio', emoji: '🎧', slug: 'audio' },
  { name: 'Tablets', emoji: '💻', slug: 'tablets' },
  { name: 'Phones', emoji: '📲', slug: 'phones' },
];

const features = [
  { emoji: '✅', title: 'Quality Products', description: 'Every product is carefully sourced and vetted for quality, durability, and performance.' },
  { emoji: '🚚', title: 'Fast Shipping', description: 'Get your gadgets delivered quickly with our reliable and speedy shipping options.' },
  { emoji: '🎧', title: 'Expert Support', description: 'Our knowledgeable team is here to help you find the perfect device or accessory.' },
];

const featuredPlaceholders = [
  { emoji: '📲', label: 'iPhone 15 Pro', badge: 'Coming Soon' },
  { emoji: '💻', label: 'iPad Air', badge: 'Coming Soon' },
  { emoji: '🎧', label: 'AirPods Pro', badge: 'Coming Soon' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-800 flex items-center justify-center overflow-hidden">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Browse our wide selection of mobile electronics and accessories.</p>
            </div>
          </FadeInWhenVisible>
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
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
              <p className="text-gray-600 max-w-xl mx-auto">We go the extra mile to make sure you get the best experience.</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <FadeInWhenVisible key={feature.title} delay={i * 0.15}>
                <div className="bg-white rounded-xl shadow p-8 text-center h-full">
                  <span className="text-5xl mb-4 inline-block">{feature.emoji}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
              <p className="text-gray-600 max-w-xl mx-auto">Get a sneak peek at our top picks — full catalog coming soon.</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {featuredPlaceholders.map((item, i) => (
              <FadeInWhenVisible key={item.label} delay={i * 0.1}>
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48 flex items-center justify-center text-7xl">
                    {item.emoji}
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full mb-2">
                      {item.badge}
                    </span>
                    <h3 className="font-semibold text-gray-900">{item.label}</h3>
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
