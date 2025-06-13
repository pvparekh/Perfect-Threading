import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-6 flex justify-between items-center ">
      <h1 className="text-2xl font-bold">Perfect Threading Salon</h1>
      <div className="space-x-6 text-sm">
        <div className="space-x-6 text-sm">
  <Link href="/" className="hover:text-pink-600 hover:scale-110 transition transform duration-200 inline-block">Home</Link>
  <Link href="/about" className="hover:text-pink-600 hover:scale-110 transition transform duration-200 inline-block">About</Link>
  <Link href="/services" className="hover:text-pink-600 hover:scale-110 transition transform duration-200 inline-block">Services</Link>
  <Link href="/booking" className="hover:text-pink-600 hover:scale-110 transition transform duration-200 inline-block">Booking</Link>
  <Link href="/contact" className="hover:text-pink-600 hover:scale-110 transition transform duration-200 inline-block">Contact</Link>
  <Link href="/blog" className="hover:text-pink-600 hover:scale-110 transition transform duration-200 inline-block">Blog</Link>
</div>
      </div>
    </nav>
  );
}
