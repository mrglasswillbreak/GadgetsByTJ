import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-20">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
        Your One-Stop Mobile Electronics Shop
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Premium phones, tablets, cases, chargers, and accessories at unbeatable prices.
      </p>
      <Link
        href="/products"
        className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Shop Now
      </Link>
    </div>
  );
}
