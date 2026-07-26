import { useState } from "react";
import "./PriceEstimator.css";

const BHK_CONFIG = {
  kitchen: {
    base: 150000,
    label: "Modular kitchen",
  },
  wardrobes: {
    base: 70000,
    label: "Modular wardrobes",
  },
  furniture: {
    base: 50000,
    label: "Furniture",
  },
  vanity: {
    base: 100000,
    label: "Vanity",
  },
  study: {
    base: 120000,
    label: "Study table",
  },
  door: {
    base: 80000,
    label: "Modular door with modular frames",
  },
  crockery: {
    base: 130000,
    label: "Crockery unit",
  },
};

const ROOM_COSTS = {
  kitchen: { label: "Modular Kitchen", cost: 150000 },
  wardrobes: { label: "Modular Wardrobes", cost: 70000 },
  furniture: { label: "Furniture", cost: 50000 },
  vanity: { label: "Vanity", cost: 100000 },
  study: { label: "Study Table", cost: 120000 },
  door: { label: "Modular Door with Modular Frames", cost: 80000 },
  crockery: { label: "Crockery Unit", cost: 130000 },
};

const QUALITY_MULTIPLIER = {
  essential: {
    label: "Essential",
    desc: "Clean, functional finishes",
    mult: 1.0,
  },
  premium: {
    label: "Premium",
    desc: "Rich textures, quality materials",
    mult: 1.5,
  },
  luxury: {
    label: "Luxury",
    desc: "Top-tier finishes & custom pieces",
    mult: 2.2,
  },
};

function formatINR(amount) {
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${(amount / 1000).toFixed(0)}K`;
}

export default function PriceEstimator({ onQuoteOpen }) {
  const [bhk, setBhk] = useState("kitchen");
  const [quality, setQuality] = useState("premium");

  const base = BHK_CONFIG[bhk]?.base ?? 350000;
  const multiplier = QUALITY_MULTIPLIER[quality]?.mult ?? 1.5;
  const totalMin = Math.round(base * multiplier * 0.85);
  const totalMax = Math.round(base * multiplier * 1.15);

  return (
    <div className="pe-wrapper">
      <div className="pe-controls">
        {/* BHK Selector */}
        <div className="pe-group">
          <label className="pe-label">Interior Service Type</label>
          <div className="pe-tabs">
            {Object.entries(BHK_CONFIG).map(([key, val]) => (
              <button
                key={key}
                className={`pe-tab${bhk === key ? " active" : ""}`}
                onClick={() => setBhk(key)}
              >
                {val.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Selector */}
        <div className="pe-group">
          <label className="pe-label">approximate area</label>
          <div className="pe-quality-tabs">
            {Object.entries(QUALITY_MULTIPLIER).map(([key, val]) => (
              <button
                key={key}
                className={`pe-quality-btn${quality === key ? " active" : ""}`}
                onClick={() => setQuality(key)}
              >
                <span className="pe-q-label">{val.label}</span>
                <span className="pe-q-desc">{val.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result Panel */}
      <div className="pe-result">
        <div className="pe-result-top">
          <p className="pe-result-title">
            Estimated Cost for Your {BHK_CONFIG[bhk]?.label}
          </p>
          <div className="pe-result-range">
            <span className="pe-min">{formatINR(totalMin)}</span>
            <span className="pe-dash">–</span>
            <span className="pe-max">{formatINR(totalMax)}</span>
          </div>
          <p className="pe-result-sub">
            {QUALITY_MULTIPLIER[quality]?.label} finish
          </p>
        </div>

        <button className="pe-cta" onClick={onQuoteOpen}>
          Get Accurate Quote →
        </button>
        <p className="pe-note">
          *This is an approximate estimate. Final pricing depends on layout,
          materials & specifications.
        </p>
      </div>
    </div>
  );
}
