import Layout from "../components/Layout";
import { useState } from "react";

export default function Services() {
  const serviceData = {
    Threading: [
      { name: "Eyebrow", price: "$9" },
      { name: "Men’s Eyebrow", price: "$10" },
      { name: "Lip", price: "$4" },
      { name: "Forehead", price: "$4" },
      { name: "Cheek", price: "$6" },
      { name: "Neck", price: "$5" },
      { name: "Chin", price: "$5" },
      { name: "Sideburn", price: "$6" },
      { name: "Full Face", price: "$25" }
    ],
    Waxing: [
      { name: "Lip", price: "$6" },
      { name: "Chin", price: "$6" },
      { name: "Ear", price: "$7" },
      { name: "Sideburn", price: "$7" },
      { name: "Underarm", price: "$12" },
      { name: "Half Arm", price: "$20" },
      { name: "Full Arm", price: "$25" },
      { name: "Half Leg", price: "$25" },
      { name: "Full Leg", price: "$35" },
      { name: "Bikini", price: "$30" },
      { name: "Brazilian", price: "$30" },
      { name: "Full Facial Wax", price: "$30" },
      { name: "Stomach Wax", price: "$20+" },
      { name: "Chest Wax", price: "$20+" },
      { name: "Back Wax", price: "$20+" },
      { name: "Full Back Wax", price: "$35" },
      { name: "Men’s Back Wax", price: "$40+" },
      { name: "Henna Design", price: "$15+" }
    ],
    Facials: [
      { name: "Bleach", price: "$15" },
      { name: "Face Cleanup", price: "$35" },
      { name: "Teenage Facial", price: "$40" },
      { name: "Herbal / D-Tan Facial", price: "$45" },
      { name: "Fruit Facial", price: "$50" },
      { name: "Gold", price: "$55" },
      { name: "Anti Ageing", price: "$60" },
      { name: "Diamond", price: "$65" },
      { name: "Anti-Wrinkle", price: "$70" },
      { name: "Organic", price: "$75" },
      { name: "Vitamin E", price: "$80" },
      { name: "Aroma Therapy", price: "$90" },
      { name: "Signature (7 Step)", price: "$95" }
    ],
    Hair: [
      { name: "Men’s Haircut", price: "$20+" },
      { name: "Senior (65+) Men’s Haircut", price: "$12+" },
      { name: "Women’s Haircut", price: "$20+" },
      { name: "Layers/Step", price: "$30+" },
      { name: "Hair Wash", price: "$15" },
      { name: "Hair Color (BYO)", price: "$25+" },
      { name: "Hair Color/Wash", price: "$45+" },
      { name: "Hair Spa", price: "$35+" },
      { name: "Hot Oil Hair Massage", price: "$30+" },
      { name: "Blow Dry", price: "$25+" },
      { name: "Wash & Blow Dry", price: "$35+" },
      { name: "Full Hair Henna", price: "$30+" },
      { name: "R/T Hair Henna", price: "$25" },
    ],
    Other: [
      { name: "Make-up", price: "$65" },
      { name: "Hair Style (Updo’s)", price: "$65" },
      { name: "Saree", price: "$30" }
    ]
  };

  const categories = Object.keys(serviceData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <Layout>
      <section className="bg-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-8">Our Services</h1>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition ${
                selectedCategory === cat ? "bg-pink-600 text-white" : "bg-white text-gray-700 hover:bg-pink-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-pink-600 mb-6">{selectedCategory}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {serviceData[selectedCategory].map((service) => (
              <div key={service.name} className="border rounded-xl p-6 shadow hover:shadow-md transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

