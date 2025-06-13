import Script from "next/script";
import { useEffect, useState } from "react";

interface Props {
  url: string;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (config: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: { [key: string]: string };
        utm?: { [key: string]: string };

      }) => void;
    };
  }
}

export default function CalendlyEmbed({ url }: Props) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (scriptLoaded && window.Calendly) {
      const container = document.getElementById("calendly-container");
      if (container) {
        container.innerHTML = ""; // Clear old widget
        window.Calendly.initInlineWidget({
          url,
          parentElement: container,
          prefill: {},
          utm: {},
        });

        // Smooth scroll into view
        setTimeout(() => {
          container.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }
    }
  }, [scriptLoaded, url]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setScriptLoaded(true)}
      />
      <div id="calendly-container" style={{ minWidth: 320, height: 630 }} />
    </>
  );
}