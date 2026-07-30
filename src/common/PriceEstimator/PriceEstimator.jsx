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

const KITCHEN_LAYOUTS = [
  "L-shaped",
  "Straight",
  "U-shaped",
  "Parallel"
];

const WARDROBE_HEIGHTS = [4, 6, 7, 9];
const WARDROBE_TYPES = ["Sliding", "Swing"];
const WARDROBE_FINISHES = [
  { id: "essential", label: "Standard - Laminate" },
  { id: "premium", label: "Premium - Membrane" },
  { id: "luxury", label: "Luxe - Acrylic" }
];

export default function PriceEstimator({ onQuoteOpen }) {
  const [bhk, setBhk] = useState("kitchen");
  const [quality, setQuality] = useState("premium");
  const [kitchenLayout, setKitchenLayout] = useState(KITCHEN_LAYOUTS[0]);
  const [measurements, setMeasurements] = useState({ A: 8, B: 8, C: 8 });
  const [wardrobeHeight, setWardrobeHeight] = useState(7);
  const [wardrobeType, setWardrobeType] = useState(WARDROBE_TYPES[0]);

  let base = BHK_CONFIG[bhk]?.base ?? 350000;
  
  if (bhk === "kitchen") {
    let totalLength = 0;
    if (kitchenLayout === "Straight") totalLength = measurements.A;
    else if (kitchenLayout === "L-shaped" || kitchenLayout === "Parallel") totalLength = measurements.A + measurements.B;
    else if (kitchenLayout === "U-shaped") totalLength = measurements.A + measurements.B + measurements.C;
    
    // Calculate base cost based on total length (approx 9375 per foot to match 1.5L for a 16ft kitchen)
    base = totalLength * 9375;
  } else if (bhk === "wardrobes") {
    // 7ft standard size -> 70,000 base
    base = wardrobeHeight * 10000;
  }

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
          {bhk === "kitchen" && (
            <>
              <div className="pe-layout-grid">
                {KITCHEN_LAYOUTS.map((layout) => (
                  <div
                    key={layout}
                    className={`pe-layout-card${kitchenLayout === layout ? " active" : ""}`}
                    onClick={() => setKitchenLayout(layout)}
                  >
                    <div className="pe-layout-radio"></div>
                    <span className="pe-layout-name">{layout}</span>
                  </div>
                ))}
              </div>

              <div className="pe-measurements">
                <label className="pe-label" style={{ marginTop: "16px", display: "block", textTransform: "none", color: "#333", fontSize: "1.1rem" }}>Now review the measurements for accuracy</label>
                <div className="pe-measurement-inputs" style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap" }}>
                  <div className="pe-measurement-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 600 }}>A</span>
                    <select 
                      value={measurements.A} 
                      onChange={(e) => setMeasurements({...measurements, A: parseInt(e.target.value)})}
                      className="pe-select"
                    >
                      {[...Array(15)].map((_, i) => (
                        <option key={i+3} value={i+3}>{i+3}</option>
                      ))}
                    </select>
                    <span>ft.</span>
                  </div>

                  {(kitchenLayout === "L-shaped" || kitchenLayout === "Parallel" || kitchenLayout === "U-shaped") && (
                    <div className="pe-measurement-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 600 }}>B</span>
                      <select 
                        value={measurements.B} 
                        onChange={(e) => setMeasurements({...measurements, B: parseInt(e.target.value)})}
                        className="pe-select"
                      >
                        {[...Array(15)].map((_, i) => (
                          <option key={i+3} value={i+3}>{i+3}</option>
                        ))}
                      </select>
                      <span>ft.</span>
                    </div>
                  )}

                  {kitchenLayout === "U-shaped" && (
                    <div className="pe-measurement-item" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontWeight: 600 }}>C</span>
                      <select 
                        value={measurements.C} 
                        onChange={(e) => setMeasurements({...measurements, C: parseInt(e.target.value)})}
                        className="pe-select"
                      >
                        {[...Array(15)].map((_, i) => (
                          <option key={i+3} value={i+3}>{i+3}</option>
                        ))}
                      </select>
                      <span>ft.</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {bhk === "wardrobes" && (
            <>
              <div className="pe-wardrobe-types" style={{ marginTop: "16px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#333", marginBottom: "12px", textAlign: "center" }}>Select the type of wardrobe</h3>
                <div className="pe-layout-grid">
                  {WARDROBE_TYPES.map((type) => (
                    <div
                      key={type}
                      className={`pe-layout-card${wardrobeType === type ? " active" : ""}`}
                      onClick={() => setWardrobeType(type)}
                    >
                      <div className="pe-layout-radio"></div>
                      <span className="pe-layout-name">{type}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pe-wardrobe-heights" style={{ marginTop: "32px" }}>
                <div style={{ textAlign: "center", marginBottom: "16px" }}>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#333", marginBottom: "12px" }}>What is the height of your wardrobe?</h3>
                <p style={{ fontSize: "0.85rem", color: "#555", padding: "8px", background: "#f8ebd0", borderRadius: "4px" }}>
                  Standard size has been set for your convenience
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {WARDROBE_HEIGHTS.map((h) => (
                  <div
                    key={h}
                    className={`pe-list-card${wardrobeHeight === h ? " active" : ""}`}
                    onClick={() => setWardrobeHeight(h)}
                  >
                    <div className="pe-list-radio"></div>
                    <span className="pe-list-name">{h} ft</span>
                  </div>
                ))}
              </div>

              <div className="pe-wardrobe-finishes" style={{ marginTop: "32px" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#333", marginBottom: "12px", textAlign: "center" }}>Select your preferred finish</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {WARDROBE_FINISHES.map((finish) => (
                    <div
                      key={finish.id}
                      className={`pe-list-card${quality === finish.id ? " active" : ""}`}
                      onClick={() => setQuality(finish.id)}
                    >
                      <div className="pe-list-radio"></div>
                      <span className="pe-list-name">{finish.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </>
          )}
        </div>

        {/* Quality Selector */}
        {bhk !== "wardrobes" && (
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
        )}
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
