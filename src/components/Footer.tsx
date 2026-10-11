import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "/booking" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-intro">
          <Link className="footer-brand" href="/">Perfect Threading Salon</Link>
          <Link href="/booking" className="footer-book">Book an Appointment <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-details">
          <nav aria-label="Footer navigation">
            {links.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          </nav>
          <p>Contact us: (973) 341-5970 |📍235 Parsippany Rd, Parsippany, NJ</p>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Perfect Threading Salon. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
