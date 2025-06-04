import Layout from "../components/Layout";
import Link from "next/link";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-rose-100 via-white to-pink-100 py-24 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          At Perfect Threading Salon, we blend tradition with modern technique to provide high-quality, affordable beauty services tailored for you.
        </p>
      </section>

      {/* Our Story */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Founded with a passion for beauty and precision, our salon has grown into a trusted name in threading, waxing, and skincare. Every service we offer reflects our commitment to client satisfaction, cleanliness, and personalized care.
            </p>
            <p className="text-gray-600 text-md">
              Our team has decades of combined experience and believes that beauty should be accessible, safe, and empowering. We’re proud to serve our community with heart and skill.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-md h-full bg-pink-100 flex items-center justify-center">
            <p className="p-8 italic text-gray-700 text-center text-lg leading-relaxed">
              “We treat every client like family — with respect, care, and a touch of artistry.”
            </p>
          </div>
        </div>
      </section>
      <section className="bg-pink-50 py-16 px-6 text-center">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
    Want to learn more about beauty and self-care?
  </h2>
  <p className="text-gray-600 mb-6 max-w-xl mx-auto">
    Read expert tips and in-depth beauty guides directly from our professional team.
  </p>
  <Link
    href="/blog"
    className="inline-block bg-gradient-to-r from-pink-600 to-rose-500 text-white px-6 py-3 rounded-lg shadow hover:from-pink-700 hover:to-rose-600 transition"
  >
    Read Our Blog
  </Link>
</section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600">
            Real words from real people who’ve trusted us with their beauty journey.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Deep V.",
              review: "I’ve been going here for over 5 years. The staff is kind, gentle, and always delivers great results. I wouldn’t go anywhere else!",
            },
            {
              name: "Drashti P.",
              review: "Clean, professional, and excellent service. The threading is precise and quick every time.",
            },
            {
              name: "Parth P.",
              review: "It’s rare to find a salon that consistently goes above and beyond every visit.",
            },
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

      {/* CTA */}
      <section className="bg-pink-50 py-24 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Team That Cares</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-xl mx-auto">
          Ready to experience salon care where you’re treated like family? Book your appointment today.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-gradient-to-r from-pink-600 to-rose-500 text-white px-8 py-4 rounded-lg shadow hover:from-pink-700 hover:to-rose-600 transition"
        >
          Book Now
        </Link>
      </section>
      
    </Layout>
  );
}
