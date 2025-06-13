import Layout from "../../components/Layout";
import Image from "next/image";
import Link from "next/link";

export default function WaxingGuide() {
  return (
    <Layout>
      <section className="py-24 px-6 bg-white text-gray-800 max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 text-center text-pink-600">
          The Truth About Waxing vs. Shaving
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10">
          Shaving may be fast, but waxing gives you smooth, radiant skin that lasts.
        </p>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          <div>
            <div className="relative w-full h-[300px] mb-8 rounded-xl overflow-hidden shadow">
              <Image
                src="/images/waxing.jpg"
                alt="Waxing Treatment"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <p className="text-lg leading-8 mb-6 text-gray-700">
              Shaving simply slices hair at the surface. Within 24–48 hours, you&apos;re already feeling stubble, and worse—risking razor bumps, ingrown hairs, and skin darkening over time. Waxing removes the entire hair from the root, giving you a clean finish that lasts 3–6 weeks.
            </p>

            <p className="text-lg leading-8 mb-6 text-gray-700">
              Regular waxing actually weakens the hair follicle, causing hair to grow back finer and sparser. Plus, exfoliating dead skin in the process reveals softer, smoother skin instantly. You’ll feel the difference—and others will notice too.
            </p>

            <h2 className="text-2xl font-bold text-pink-600 mb-4 mt-12">Why Waxing Wins</h2>
            <ul className="list-disc space-y-3 text-gray-700 pl-5">
              <li>Removes hair from the root for longer-lasting smoothness</li>
              <li>Reduces chances of ingrown hairs and shaving irritation</li>
              <li>Exfoliates dead skin for a glowier, even-toned look</li>
              <li>Slows hair regrowth over time</li>
              <li>Leaves skin soft and touchable</li>
              <li>No nicks, cuts, or razor burn</li>
            </ul>

            <p className="mt-8 font-semibold text-pink-600 text-lg">
              Experience the glow of freshly waxed skin.{" "}
              <Link href="/booking" className="underline hover:text-pink-800">
                Book your waxing appointment today
              </Link>.
            </p>
          </div>

          <aside className="space-y-10">
            <div className="bg-pink-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-pink-600 mb-2">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                Curious if waxing is right for you or first-time nervous? We’re here for you.
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
