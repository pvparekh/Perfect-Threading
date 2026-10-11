import { useEffect } from "react";
import { useRouter } from "next/router";

/**
 * Progressive enhancement only. All content is visible in server-rendered HTML;
 * off-screen decorative reveals are prepared after hydration and play once.
 * No text, URLs, booking logic or focus order are modified.
 */
const revealSelectors: Record<string, string[]> = {
  "/": [
    ":scope > section:nth-child(2) > h2",
    ":scope > section:nth-child(2) > div > div",
    ":scope > section:nth-child(3) > h2",
    ":scope > section:nth-child(3) > div > div",
    ":scope > section:nth-child(4) > div:first-child",
    ":scope > section:nth-child(4) > div:nth-child(2) > a",
    ":scope > section:last-child > h2",
    ":scope > section:last-child > p",
  ],
  "/about": [
    ":scope > section:nth-child(2) > div > div",
    ":scope > section:nth-child(3) > h2",
    ":scope > section:nth-child(3) > p",
    ":scope > section:nth-child(4) > div:first-child",
    ":scope > section:nth-child(4) > div:last-child > div",
    ":scope > section:last-child > h2",
  ],
  "/services": [
    ".service-category-intro",
    ".service-category .service-menu",
    ".services-end",
  ],
  "/booking": [
    ":scope > section:first-child > div > div",
  ],
  "/contact": [
    ":scope > section:nth-child(2) > div > div",
  ],
  "/blog": [
    ":scope > section:nth-child(2) > div > a",
  ],
};

const articleSelectors = [
  ":scope > section:first-child > div > div:first-child > div:first-child",
  ":scope > section:first-child h2",
];

export default function SalonMotion() {
  const router = useRouter();

  useEffect(() => {
    const main = document.getElementById("main-content");
    const header = document.querySelector<HTMLElement>(".site-header");
    if (!main || !header) return;

    let scrollFrame = 0;
    const updateHeader = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        header.dataset.scrolled = window.scrollY > 24 ? "true" : "false";
        scrollFrame = 0;
      });
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      return () => {
        window.removeEventListener("scroll", updateHeader);
        window.cancelAnimationFrame(scrollFrame);
        delete header.dataset.scrolled;
      };
    }

    const selectors = router.pathname.startsWith("/blog/")
      ? articleSelectors
      : revealSelectors[router.pathname] ?? [];
    const targets = Array.from(
      new Set(selectors.flatMap((selector) => Array.from(main.querySelectorAll<HTMLElement>(selector))))
    );

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.dataset.reveal = "shown";
        observer.unobserve(element);
      }
    }, { rootMargin: "0px 0px -32px 0px", threshold: 0.06 });

    targets.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      // Never flash-hide anything already visible or reached through an anchor.
      if (rect.top < window.innerHeight + 20 && rect.bottom > -20) {
        element.dataset.reveal = "shown";
        return;
      }
      // Only elements below the fold should begin in a hidden motion state.
      if (rect.top >= window.innerHeight) {
        element.dataset.reveal = "pending";
        element.style.setProperty("--reveal-delay", String((index % 3) * 45) + "ms");
        observer.observe(element);
      }
    });
    main.dataset.motion = "ready";

    return () => {
      observer.disconnect();
      targets.forEach((element) => {
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
      delete main.dataset.motion;
      window.removeEventListener("scroll", updateHeader);
      window.cancelAnimationFrame(scrollFrame);
      delete header.dataset.scrolled;
    };
  }, [router.pathname]);

  return null;
}
