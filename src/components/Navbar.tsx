import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Perfect Threading Salon</h1>
      <div className="space-x-6 text-sm">
        <Link href="/" className="hover:text-pink-600 transition">Home</Link>
        <Link href="/about" className="hover:text-pink-600 transition"> About</Link>
        <Link href="/services" className="hover:text-pink-600 transition">Services</Link>
        <Link href="/booking" className="hover:text-pink-600 transition">Booking</Link>
        <Link href="/contact" className="hover:text-pink-600 transition">Contact</Link>
        <Link href="/blog" className="hover:text-pink-600 transition">Blog</Link>
      </div>
    </nav>
  );
}
