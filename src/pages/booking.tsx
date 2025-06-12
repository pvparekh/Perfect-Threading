import React, { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Image from "next/image";

export default function Booking() {
  const router = useRouter();
  const services = [
    {
      name: "Eyebrow Threading",
      image: "/images/threading.jpg",
      link: "https://calendly.com/pvparekh14/perfect-threading-appointment"
    },
    
    {
      name: "Men's Haircut",
      image: "/images/haircut.jpg",
      link: "https://calendly.com/pvparekh14/perfect-threading-appointment"
    },
    {
      name: "Waxing",
      image: "/images/waxing2.jpg",
      link: "https://calendly.com/pvparekh14/perfect-threading-appointment"
    },
    {
      name: "Facials",
      image: "/images/facial.jpg",
      link: "https://calendly.com/pvparekh14/perfect-threading-appointment"
    },
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-br from-rose-200 via-white to-pink-200 py-20 px-6 text-center backdrop-blur-sm shadow-lg min-h-screen">

        <h1 className="text-5xl font-bold text-gray-800 mb-4">Book Your Appointment</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Select a service below to schedule your visit. We’ll make sure you leave looking and feeling your best.
        </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
  {services.map(service => (
  <div
    key={service.name}
    className="bg-white border rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col animate-fadeIn"
  >
    <div className="relative w-full h-[180px] overflow-hidden group">
      <Image
        src={service.image}
        alt={service.name}
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-400 group-hover:scale-115"
      />
    </div>

    <div className="p-6 flex flex-col flex-grow items-center justify-between">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.name}</h3>

      {service.name.toLowerCase().includes("haircut") ? (
        <button
          onClick={() => router.push(service.link)}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          Book Now
        </button>
      ) : (
        <p className="text-sm text-red-600 font-medium text-center mt-2">
          Please call <a href="tel:9733415970" className="underline">973 341 5970</a> to book an appointment!
        </p>
      )}
    </div>
  </div>
))}

</div>
        <p className="text-sm text-gray-500 mt-12">
          Need help choosing a service? <a href="/contact" className="text-pink-600 hover:underline">Contact us</a>
        </p>
      </section>
    </Layout>
  );
}
