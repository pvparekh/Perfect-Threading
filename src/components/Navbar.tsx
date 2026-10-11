import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const items = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Booking", href: "/booking" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = () => setOpen(false);
    router.events.on("routeChangeStart", close);
    return () => router.events.off("routeChangeStart", close);
  }, [router.events]);

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
    }}>
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="site-brand" onClick={() => setOpen(false)}>
          <span className="brand-symbol" aria-hidden="true">✳</span>
          <span>Perfect Threading <em>Salon</em></span>
        </Link>
        <button
          type="button"
          ref={toggleRef}
          className="mobile-menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation-links"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
        <div id="main-navigation-links" className={"site-nav-links" + (open ? " is-open" : "")}>
          {items.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={router.pathname === item.href || (item.href === "/blog" && router.pathname.startsWith("/blog/")) ? "page" : undefined}
              className={item.href === "/booking" ? "nav-booking" : "nav-link"}
              onClick={() => setOpen(false)}
            >
              {item.label}
              {item.href === "/booking" && <span aria-hidden="true">↗</span>}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
