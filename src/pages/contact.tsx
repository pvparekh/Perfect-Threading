import Layout from "../components/Layout";
import Link from "next/link";

export default function Contact() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-pink-100 via-white to-rose-50 py-20 px-6 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We&apos;d love to hear from you. Whether it&apos;s about a service, a question, or feedback, reach out anytime!
        </p>
      </section>

      {/* Contact Grid */}
      <section className="bg-white py-24 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
          
          {/* Left - Contact Info */}
          <div className="bg-gray-50 p-8 rounded-xl shadow">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>

            <div className="space-y-5 text-gray-700 text-lg">
              <p><strong>📍 Address:</strong> 235 Parsippany Rd, Parsippany NJ 07054</p>
              <p>
                <strong>📞 Phone:</strong>{" "}
                <a href="tel:9733415970" className="text-pink-600 hover:underline">973-341-5970</a>
              </p>
              <p>
                <strong>✉️ Email:</strong>{" "}
                <a href="mailto:salon@gmail.com" className="text-pink-600 hover:underline">salon@gmail.com</a>
              </p>
              <p><strong>📍 Instagram:</strong> @perfecthairandbeautysalon</p>
              <p></p>

              <div className="pt-6">
                <Link
                  href="https://www.google.com/maps/dir/?api=1&destination=235+Parsippany+Rd,+Parsippany+NJ+07054"
                  target="_blank"
                  className="inline-block bg-gradient-to-r from-pink-600 to-rose-500 text-white px-6 py-3 rounded-lg shadow hover:from-pink-700 hover:to-rose-600 transition"
                >
                  Get Directions
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Embedded Map */}
          <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Perfect Threading Salon Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.6599979884672!2d-74.42992372261493!3d40.85738807137208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3081fdcb33263%3A0x228e1beed054a709!2s235%20Parsippany%20Rd%2C%20Parsippany%2C%20NJ%2007054!5e0!3m2!1sen!2sus!4v1748900790322!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
}
