// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 shadow-sm flex justify-between items-center bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Perfect Threading</h1>
      <nav className="space-x-6 text-sm">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/services">Services</Link>
        <Link href="/booking">Book Appointment</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </header>
  );
}
