import { useRef, useState } from "react";
import "./WhatWeOffer.css";

const OFFER_CARDS = [
  {
    id: "services",
    icon: "🛠️",
    title: "Our Services",
    items: [
      "Modular kitchens",
      "Modular wardrobes",
      "Furniture ",
      "Study Tables",
      "Vanity",
      "Modular door with modular frame",
      "False ceiling",
      "Crockery unit",
    ],
  },
  {
    id: "warranty",
    icon: "🛡️",
    title: "Warranty",
    items: [
      "10-year design warranty on all work",
      "Up to 1-year on-site service warranty",
      "Warranty on painting, electrical & plumbing",
      "Annual maintenance support",
      "Dedicated post-delivery service team",
    ],
  },
  {
    id: "process",
    icon: "⚙️",
    title: "Our Process",
    items: [
      "Initial consultation & site visit",
      "3D design renders & mood boards",
      "Material selection & BOQ",
      "Project management & execution",
      "Quality check & snag list",
      "Final handover & styling",
    ],
  },
  {
    id: "tech",
    icon: "💻",
    title: "Technology",
    items: [
      "Advanced 3D visualization tools",
      "Real-time project tracking dashboard",
      "Digital approval workflow",
      "Smart home integration support",
      "Virtual reality walkthrough available",
    ],
  },
  {
    id: "material",
    icon: "🪵",
    title: "Materials",
    items: [
      "Premium imported & domestic materials",
      "Eco-friendly & sustainable options",
      "Wide range of finishes & textures",
      "Manufacturer-direct sourcing",
      "Anti-termite & moisture-resistant options",
    ],
  },
];

export default function WhatWeOffer({ onQuoteOpen }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 300, behavior: "smooth" });
    setTimeout(() => {
      setCanLeft(el.scrollLeft > 0);
      setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
    }, 350);
  };

  return (
    <div className="wwo-section">
      <div className="wwo-header">
        <div>
          <h2 className="wwo-title">What We Offer</h2>
          <p className="wwo-sub">
            Everything you need for your perfect home — under one roof
          </p>
        </div>
        <button className="wwo-quote-btn" onClick={onQuoteOpen}>
          Get Free Quote
        </button>
      </div>

      <div className="wwo-carousel-wrap">
        <div className="wwo-track" ref={trackRef}>
          {OFFER_CARDS.map((card) => (
            <div key={card.id} className="wwo-card">
              <div className="wwo-card-header">
                <span className="wwo-icon">{card.icon}</span>
                <span className="wwo-card-title">{card.title}</span>
              </div>
              <ul className="wwo-list">
                {card.items.map((item, i) => (
                  <li key={i} className="wwo-item">
                    <span className="wwo-bullet" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {canLeft && (
          <button
            className="wwo-arrow wwo-arrow-left"
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        {canRight && (
          <button
            className="wwo-arrow wwo-arrow-right"
            onClick={() => scroll(1)}
            aria-label="Scroll right"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
