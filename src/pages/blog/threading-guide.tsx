import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function ThreadingGuide() {
  return (
    <Layout>
      <section className="py-24 px-6 bg-white text-gray-800 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-pink-600">
          Why Threading is the Superior Choice
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Threading is precise, long-lasting, and far gentler on your skin than shaving or waxing.
        </p>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          <div>
            <div className="relative w-full h-[300px] mb-8 rounded-xl overflow-hidden shadow">
              <Image
                src="/images/threading.jpg"
                alt="Eyebrow Threading"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <p className="text-lg leading-8 mb-6 text-gray-700">
              Most people reach for razors because it’s fast and cheap—but that’s a short-term fix. Shaving removes only the surface hair, which grows back in a day or two, often blunt and coarse. Even worse, frequent shaving can cause razor bumps, ingrown hairs, and darkened skin over time.
            </p>

            <p className="text-lg leading-8 mb-6 text-gray-700">
              Threading is different. It removes hair from the follicle root, ensuring smoother skin and results that last up to four weeks. It’s highly precise—perfect for shaping eyebrows and removing even the finest facial hair without any chemicals, heat, or irritation.
            </p>

            <h2 className="text-2xl font-bold text-pink-600 mb-4 mt-12">Why Choose Threading?</h2>
            <ul className="list-disc space-y-3 text-gray-700 pl-5">
              <li>Hair regrowth is slower and finer</li>
              <li>Less irritation—no razor burn or cuts</li>
              <li>No chemicals, heat, or damage to skin</li>
              <li>Perfectly sculpted results for brows, lips, forehead, and cheeks</li>
              <li>Minimizes risk of ingrown hairs</li>
              <li>Leaves skin soft and naturally exfoliated</li>
            </ul>

            <p className="mt-8 font-semibold text-pink-600 text-lg">
              Say goodbye to daily shaving and hello to clean, defined beauty.{" "}
              <Link href="/booking" className="underline hover:text-pink-800">
                Book your threading session now
              </Link>.
            </p>
          </div>

          <aside className="space-y-10">
            <div className="bg-pink-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">Have Questions?</h3>
              <p className="text-gray-700 mb-4">
                Want to know if threading is right for your skin type?
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