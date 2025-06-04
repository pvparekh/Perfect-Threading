export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-6 mt-12">
      <p className="text-lg font-bold">Perfect Threading Salon</p>
      <p>Contact us: (973) 341-5970 |📍235 Parsippany Rd, Parsippany, NJ</p>
      <div className="space-x-4 mt-2">
        <a href="#">Instagram</a>
      </div>
      <p className="mt-4">&copy; {new Date().getFullYear()} Perfect Threading Salon. All Rights Reserved.</p>
    </footer>
  );
}
