import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout";

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

type Category = keyof typeof serviceData;
const categories = Object.keys(serviceData) as Category[];
const categoryImages: Partial<Record<Category, string>> = {
  Threading: "/images/threading.jpg",
  Waxing: "/images/waxing3.jpg",
  Facials: "/images/facial.jpg",
  Hair: "/images/haircut.jpg",
};

export default function Services() {
  return (
    <Layout>
      <div className="services-page">
        <header className="services-intro">
          <h1>Our Services</h1>
          <div className="services-intro-art" role="presentation" />
        </header>
        <nav className="service-index" aria-label="Service categories">
          {categories.map((category, index) => (
            <a key={category} href={"#" + category.toLowerCase()}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {category}
            </a>
          ))}
        </nav>
        <div className="service-directory">
          {categories.map((category, index) => (
            <section className="service-category" id={category.toLowerCase()} key={category} aria-labelledby={"heading-" + category.toLowerCase()}>
              <div className="service-category-intro">
                <span className="category-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h2 id={"heading-" + category.toLowerCase()}>{category}</h2>
                {categoryImages[category] ? (
                  <div className="service-category-image">
                    <Image
                      src={categoryImages[category]}
                      alt=""
                      fill
                      sizes="(max-width: 720px) 100vw, 32vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                ) : (
                  <div className="service-category-mark" aria-hidden="true">PTS</div>
                )}
              </div>
              <ol className="service-menu">
                {serviceData[category].map((service) => (
                  <li key={service.name}>
                    <h3>{service.name}</h3>
                    <span className="service-price">{service.price}</span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
        <div className="services-end">
          <Link href="/booking" className="site-button">Book an Appointment <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </Layout>
  );
}
