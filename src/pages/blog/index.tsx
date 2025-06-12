import Layout from "../../components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function BlogIndex() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-50 via-white to-rose-50 py-20 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Explore Our Blog</h1>
          <p className="text-lg text-gray-600">
            Discover tips, guides, and expert advice to enhance your beauty and self-care journey.
          </p>
        </div>
      </section>

      {/* Blog Card Grid */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Blog Post Card */}
          <Link
            href="/blog/facial-guide"
            className="group block bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src="/images/facial.jpg"
                alt="Facial Guide"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded">
                Skincare
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                A Complete Guide to Facials
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                Learn how facials cleanse your pores, remove blackheads, and restore your skin's glow in this detailed guide.
              </p>
              <span className="inline-block mt-4 text-pink-600 font-medium hover:underline">
                Read more →
              </span>
            </div>
          </Link>
          <Link
            href="/blog/threading-guide"
            className="group block bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src="/images/threading.jpg"
                alt="Facial Guide"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded">
                Hair Removal
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                A Complete Guide to Threading
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                Discover why threading is the cleaner, gentler way to shape brows and remove facial hair. no chemicals, no irritation, just precision.

              </p>
              <span className="inline-block mt-4 text-pink-600 font-medium hover:underline">
                Read more →
              </span>
            </div>
          </Link>
          <Link
            href="/blog/waxing-guide"
            className="group block bg-white rounded-xl shadow hover:shadow-lg transition duration-300 overflow-hidden border border-gray-200"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src="/images/waxing.jpg"
                alt="Facial Guide"
                layout="fill"
                objectFit="cover"
                className="group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded">
                Hair Removal
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                A Complete Guide to Waxing
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                Learn how waxing removes hair from the root for smoother skin, fewer ingrowns, and longer-lasting results than shaving ever could.
 
              </p>
              <span className="inline-block mt-4 text-pink-600 font-medium hover:underline">
                Read more →
              </span>
            </div>
          </Link>
          

        </div>
      </section>
    </Layout>
  );
}
