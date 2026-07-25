import "./TrustStrip.css";

const TRUST_ITEMS = [
  { icon: "🏆", label: "Best Interior Studio 2024" },
  { icon: "⭐", label: "4.9/5 Google Rating" },
  { icon: "🛡️", label: "10-Year Design Warranty" },
  { icon: "📰", label: "Featured in Architectural Digest" },
  { icon: "✅", label: "ISO 9001 Certified" },
  { icon: "🎖️", label: "Award Winning Designers" },
  { icon: "🌿", label: "Eco-Friendly Materials" },
  { icon: "📦", label: "On-Time Delivery Guarantee" },
  { icon: "💬", label: "98% Client Satisfaction" },
  { icon: "🏗️", label: "350+ Projects Delivered" },
];

// Duplicate for seamless loop
const ITEMS = [...TRUST_ITEMS, ...TRUST_ITEMS];

export default function TrustStrip() {
  return (
    <div className="trust-strip" aria-label="Trust indicators">
      <div className="trust-track">
        {ITEMS.map((item, i) => (
          <div className="trust-item" key={i}>
            <span className="trust-icon">{item.icon}</span>
            <span className="trust-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
