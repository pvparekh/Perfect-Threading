import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";

const siteUrl = "https://perfect-threading.vercel.app";
const seo: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Perfect Threading Salon",
    description: "Look sharp. Feel confident. Experience professional threading and beauty care tailored to you.",
  },
  "/about": {
    title: "About Us",
    description: "At Perfect Threading Salon, we blend tradition with modern technique to provide high-quality, affordable beauty services tailored for you.",
  },
  "/services": { title: "Our Services", description: "Our Popular Services" },
  "/booking": {
    title: "Book Your Appointment",
    description: "Select a service below to schedule your visit. We’ll make sure you leave looking and feeling your best.",
  },
  "/contact": {
    title: "Contact Us",
    description: "We'd love to hear from you. Whether it's about a service, a question, or feedback, reach out anytime!",
  },
  "/blog": {
    title: "Explore Our Blog",
    description: "Discover tips, guides, and expert advice to enhance your beauty and self-care journey.",
  },
  "/blog/facial-guide": {
    title: "The Ultimate Facial Guide",
    description: "Discover how a professional facial can transform your skin and boost your confidence.",
  },
  "/blog/threading-guide": {
    title: "Why Threading is the Superior Choice",
    description: "Threading is precise, long-lasting, and far gentler on your skin than shaving or waxing.",
  },
  "/blog/waxing-guide": {
    title: "The Truth About Waxing vs. Shaving",
    description: "Shaving may be fast, but waxing gives you smooth, radiant skin that lasts.",
  },
};
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Perfect Threading Salon",
  url: siteUrl,
  telephone: "973-341-5970",
  address: {
    "@type": "PostalAddress",
    streetAddress: "235 Parsippany Rd",
    addressLocality: "Parsippany",
    addressRegion: "NJ",
    postalCode: "07054",
    addressCountry: "US",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const page = seo[router.pathname] ?? seo["/"];
  const canonical = siteUrl + (router.pathname === "/" ? "/" : router.pathname);
  return (
    <>
      <Head>
        <title>{page.title} | Perfect Threading Salon</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={page.title + " | Perfect Threading Salon"} />
        <meta property="og:description" content={page.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        {router.pathname === "/" && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
        )}
      </Head>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main className="site-main" data-page={router.pathname} id="main-content" tabIndex={-1}>{children}</main>
      <Footer />
    </>
  );
}
