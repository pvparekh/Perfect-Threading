import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function FacialGuide() {
  return (
    <Layout>
      <section className="py-24 px-6 bg-white text-gray-800 max-w-6xl mx-auto">
        {/* Hero */}
        <h1 className="text-5xl font-extrabold mb-6 text-center text-pink-600">
          The Ultimate Facial Guide
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Discover how a professional facial can transform your skin and boost your confidence.
        </p>

        {/* Main Grid */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          {/* Content */}
          <div>
            <div className="relative w-full h-[300px] mb-8 rounded-xl overflow-hidden shadow">
              <Image
                src="/images/facial.jpg"
                alt="Facial Treatment"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <p className="text-lg leading-8 mb-6 text-gray-700">
              You know those stubborn bumps on your nose that seem to get worse with time? Or the dullness that creeps in after long days and sleepless nights? We’ve got a solution. Facials aren’t just a luxury — they’re a necessary part of maintaining healthy, vibrant skin.
            </p>

            <p className="text-lg leading-8 mb-6 text-gray-700">
              At Perfect Threading Salon, we combine science-backed skincare with spa-level pampering. Our facials are crafted to open your pores, extract impurities, and rejuvenate your skin — all while helping you relax and reset.
            </p>

            <div className="border-l-4 border-pink-600 pl-6 my-10">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">Step-by-Step Process</h2>
              <ul className="list-disc space-y-4 text-gray-700 leading-7 pl-4">
                <li><strong>Cleansing:</strong> Removes surface dirt and makeup.</li>
                <li><strong>Exfoliation:</strong> Buffs away dead skin for smoother texture.</li>
                <li><strong>Steaming:</strong> Opens pores to prep for extraction.</li>
                <li><strong>Extraction:</strong> Clears blackheads and buildup without damage.</li>
                <li><strong>Massage:</strong> Boosts circulation and releases facial tension.</li>
                <li><strong>Mask Application:</strong> Tailored to your skin needs (hydration, glow, acne care).</li>
                <li><strong>Moisturizer & SPF:</strong> Locks in hydration and shields post-treatment skin.</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-pink-600 mb-4 mt-12">Real Benefits of Facials</h2>
            <ul className="list-disc space-y-3 text-gray-700 pl-5">
              <li>Removes blackheads, whiteheads, and acne-causing debris</li>
              <li>Reduces skin texture and evens tone</li>
              <li>Deep hydration and glow restoration</li>
              <li>Supports anti-aging and smooths fine lines</li>
              <li>Relaxes facial muscles and reduces tension</li>
              <li>Increases product absorption for at-home routines</li>
            </ul>

            <p className="mt-8 text-gray-700 leading-8">
              Our facial experts are trained in both modern dermatological care and ancient techniques to ensure the best of both worlds. Whether you’re prepping for an event or maintaining your skin on a monthly basis, we tailor every facial to your unique skin needs.
            </p>

            <p className="mt-8 font-semibold text-pink-600 text-lg">
              Ready to give your skin what it deserves?{" "}
              <Link href="/booking" className="underline hover:text-pink-800">
                Book your facial appointment now
              </Link>.
            </p>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <div className="bg-pink-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">Have Questions?</h3>
              <p className="text-gray-700 mb-4">
                Need help choosing the right facial or want to speak to a specialist?
              </p>
              <Link
                href="/contact"
                className="inline-block bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition"
              >
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
}

