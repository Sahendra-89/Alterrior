import "./TrustStrip.css";

const TRUST_ITEMS = [
  {
    title: "10-Year Warranty",
    icon: "🛡️",
    desc: "Peace of mind for a decade",
  },
  {
    title: "45-Day Delivery",
    icon: "⏱️",
    desc: "On-time project completion",
  },
  {
    title: "152 Quality Checks",
    icon: "✅",
    desc: "Rigorous standards applied",
  },
  {
    title: "Premium Materials",
    icon: "✨",
    desc: "Sourced globally, built locally",
  },
  {
    title: "Transparent Pricing",
    icon: "🛠️",
    desc: "No hidden costs, clear estimates",
  },
];

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="trust-strip-marquee">
        <div className="trust-strip-track">
          {/* Tripled the items to ensure smooth infinite scrolling */}
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <div key={i} className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div className="trust-text">
                <h4 className="trust-title">{item.title}</h4>
                <p className="trust-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
