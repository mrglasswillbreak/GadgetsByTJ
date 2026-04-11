import Link from 'next/link';
import Image from 'next/image';
import { FadeInWhenVisible } from '@/components/animations';
import CategoriesGrid from '@/components/public/CategoriesGrid';
import { BadgeCheck, Truck, HeadphonesIcon, Smartphone, Tablet, Headphones, Star, Users, Package } from 'lucide-react';

const features = [
  {
    Icon: BadgeCheck,
    title: 'Quality Products',
    description: 'Every product is carefully sourced and vetted for quality, durability, and performance.',
    image: 'https://images.unsplash.com/photo-1526406915894-7bcd65f60845?w=800&q=80',
    accent: 'from-blue-900/80 to-blue-700/60',
  },
  {
    Icon: Truck,
    title: 'Fast Shipping',
    description: 'Get your gadgets delivered quickly with our reliable and speedy shipping options.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80',
    accent: 'from-emerald-900/80 to-emerald-700/60',
  },
  {
    Icon: HeadphonesIcon,
    title: 'Expert Support',
    description: 'Our knowledgeable team is here to help you find the perfect device or accessory.',
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=800&q=80',
    accent: 'from-purple-900/80 to-purple-700/60',
  },
];

const stats = [
  { Icon: Package, value: '500+', label: 'Products' },
  { Icon: Users, value: '2,000+', label: 'Happy Customers' },
  { Icon: Star, value: '4.9★', label: 'Avg Rating' },
];

const featuredPlaceholders = [
  { Icon: Smartphone, label: 'iPhone 15 Pro', badge: 'Coming Soon', image: 'https://images.unsplash.com/photo-1697537980414-5c1f2d0cbf01?q=80' },
  { Icon: Tablet, label: 'iPad Air', badge: 'Coming Soon', image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80' },
  { Icon: Headphones, label: 'AirPods Pro', badge: 'Coming Soon', image: 'https://images.unsplash.com/photo-1588423771073-b8903fead714?q=80' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050d1a]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&q=80"
            alt="Mobile electronics hero"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          {/* Rich gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a] via-blue-950/70 to-indigo-950/80" />
        </div>

        {/* Decorative floating orbs */}
        <div aria-hidden="true" className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <FadeInWhenVisible delay={0}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-blue-200 font-medium mb-8">
              <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Premium Mobile Electronics
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
              Your Premier
              <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Mobile Electronics
              </span>
              Destination
            </h1>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2}>
            <p className="text-lg sm:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Discover premium phones, tablets, cases, chargers, and accessories — all handpicked for quality and value.
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-900/40 transition-all duration-200 hover:shadow-blue-900/60 hover:-translate-y-0.5 text-base"
              >
                Shop Now
              </Link>
              <Link
                href="/devices"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3.5 rounded-xl backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 text-base"
              >
                Explore Devices
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* Stats bar */}
          <FadeInWhenVisible delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                    <stat.Icon className="w-4 h-4 text-blue-300" aria-hidden="true" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                    <p className="text-blue-300 text-xs">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-14">
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Explore</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Browse our wide selection of mobile electronics and accessories.</p>
            </div>
          </FadeInWhenVisible>
          <CategoriesGrid />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-14">
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Our Promise</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Us</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">We go the extra mile to make sure you get the best experience.</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FadeInWhenVisible key={feature.title} delay={i * 0.12}>
                <div className="group relative overflow-hidden rounded-2xl h-72 shadow-md hover:shadow-xl transition-shadow duration-300">
                  {/* Background image */}
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.accent} via-black/30 to-transparent`} />
                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="bg-white/15 backdrop-blur-sm w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                      <feature.Icon className="w-6 h-6 text-white" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInWhenVisible>
            <div className="text-center mb-14">
              <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-widest mb-3">Sneak Peek</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Products</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Get a sneak peek at our top picks — full catalog coming soon.</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {featuredPlaceholders.map((item, i) => (
              <FadeInWhenVisible key={item.label} delay={i * 0.1}>
                <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-shadow duration-300">
                  <div className="h-52 relative overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {item.badge}
                    </span>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base">{item.label}</h3>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
          <FadeInWhenVisible>
            <div className="text-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-900/20 transition-all duration-200 hover:-translate-y-0.5"
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

