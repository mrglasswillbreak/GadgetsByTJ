'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  slug: string;
  emoji: string;
}

interface CategoryFilterProps {
  products: Product[];
  categories: string[];
}

export default function CategoryFilter({ products, categories }: CategoryFilterProps) {
  const [selected, setSelected] = useState('All');

  const filtered = selected === 'All' ? products : products.filter((p) => p.category === selected);

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {['All', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selected === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <motion.div
        key={selected}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filtered.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </motion.div>
    </div>
  );
}
