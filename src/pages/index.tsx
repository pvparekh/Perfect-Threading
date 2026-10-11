import Link from "next/link";
import Layout from "../components/Layout";
import Image from "next/image";
export default function Home() {
  const title = "Perfect Threading Salon";

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-100 via-white to-pink-100 py-28 px-6 text-center">
        <div className="hero-title"><h1>{title}</h1></div>

        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Look sharp. Feel confident. Experience professional threading and beauty care tailored to you.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-gradient-to-r from-pink-600 to-rose-500 text-white text-xl px-8 py-4 rounded-lg shadow-md hover:scale-103 hover:to-rose-600 transition font-medium"
        >
          Book an Appointment
        </Link>
      </section>

      {/* Popular Services */}
      <section className="py-24 bg-white px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">Our Popular Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Eyebrow Threading", price: "$10" },
            { name: "Men's Haircut", price: "$20+" },
            { name: "Waxing", price: "$20+" },
            { name: "Facials", price: "$40+" }
          ].map((service) => (
            <div
              key={service.name}
              className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition transform hover:scale-[1.015] duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{service.name}</h3>
              <p className="text-gray-600 mb-3">{service.price}</p>
              <Link href="/booking" className="text-pink-600 font-medium hover:underline">
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-900">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              name: "Jackie G.",
              review:
                "literally the best place for getting your eyebrows threaded...the prices are soooooo reasonable. I recently moved to NYC and will wait until I am back home to get my eyebrows done because I don't trust anyone else!",
            },
            {
              name: "Preya S.",
              review:
                "[Staff] is very professional and accommodating. She is very skilled and always gives personal attention to her clients. Her place is very clean and service is excellent. I highly recommend this place.",
            },
            {
              name: "Maria P.",
              review:
                "Always a great experience. They are quick, do a great job the shop is clean and so nice",
            }
          ].map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-left flex flex-col justify-between h-full min-h-[300px]"
            >
              <p className="text-gray-700 italic mb-6">“{t.review}”</p>
              <p className="mt-auto font-semibold text-pink-700">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">From Our Blog</h2>
          <p className="text-lg text-gray-600">
            Beauty tips, expert guides, and everything you need to glow — straight from our team.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link
            href="/blog/facial-guide"
            className="block group bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <div className="relative w-full h-[200px]">
              <Image
                src="/images/facial.jpg"
                alt="Facial Guide"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-2 left-2 bg-pink-600 text-white text-xs font-semibold px-2 py-1 rounded">
                Skincare
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">A Complete Guide to Facials</h3>
              <p className="text-sm text-gray-600">
                Learn how facials cleanse your pores, remove blackheads, and restore your skin’s glow in this detailed guide.
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
        <div className="text-center mt-10">
        <Link href="/blog" className="text-pink-600 font-medium my-10 hover:underline text-sm sm:text-base">
          See all blog posts →
        </Link>
</div>

      </section>

      {/* Final Call to Action */}
      <section className="bg-pink-50 py-24 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Look Your Best?</h2>
        <p className="text-lg text-gray-600 mb-6">
          Book your appointment now and let our professionals take care of you.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-4 rounded-lg shadow hover:scale-103 hover:from-pink-700 hover:to-rose-600 transition"
        >
          Schedule Now
        </Link>
      </section>
    </Layout>
  );
}
