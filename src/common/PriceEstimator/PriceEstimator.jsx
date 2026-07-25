import { useState } from "react";
import "./PriceEstimator.css";

const BHK_CONFIG = {
  "1bhk": {
    base: 250000,
    label: "1 BHK",
    rooms: ["Living Room", "Kitchen", "Bedroom"],
  },
  "2bhk": {
    base: 350000,
    label: "2 BHK",
    rooms: ["Living Room", "Kitchen", "Bedroom", "Master Bedroom"],
  },
  "3bhk": {
    base: 520000,
    label: "3 BHK",
    rooms: [
      "Living Room",
      "Kitchen",
      "2 Bedrooms",
      "Master Bedroom",
      "Bathroom",
    ],
  },
  "4bhk": {
    base: 780000,
    label: "4 BHK+",
    rooms: ["Living Room", "Kitchen", "3 Bedrooms", "Study", "2 Bathrooms"],
  },
};

const ROOM_COSTS = {
  living: { label: "Living Room", cost: 80000 },
  kitchen: { label: "Modular Kitchen", cost: 120000 },
  bedroom: { label: "Bedroom", cost: 90000 },
  bathroom: { label: "Bathroom", cost: 60000 },
  study: { label: "Study / Home Office", cost: 70000 },
  balcony: { label: "Balcony", cost: 40000 },
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
  const [bhk, setBhk] = useState("2bhk");
  const [rooms, setRooms] = useState(["living", "kitchen"]);
  const [quality, setQuality] = useState("premium");

  const toggleRoom = (id) => {
    setRooms((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const base = BHK_CONFIG[bhk]?.base ?? 350000;
  const roomCost = rooms.reduce(
    (sum, r) => sum + (ROOM_COSTS[r]?.cost ?? 0),
    0,
  );
  const multiplier = QUALITY_MULTIPLIER[quality]?.mult ?? 1.5;
  const totalMin = Math.round((base + roomCost) * multiplier * 0.85);
  const totalMax = Math.round((base + roomCost) * multiplier * 1.15);

  return (
    <div className="pe-wrapper">
      <div className="pe-controls">
        {/* BHK Selector */}
        <div className="pe-group">
          <label className="pe-label">Home Type</label>
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

        {/* Room Selector */}
        <div className="pe-group">
          <label className="pe-label">Rooms to Design</label>
          <div className="pe-rooms">
            {Object.entries(ROOM_COSTS).map(([id, room]) => (
              <button
                key={id}
                className={`pe-room-chip${rooms.includes(id) ? " active" : ""}`}
                onClick={() => toggleRoom(id)}
              >
                {rooms.includes(id) ? "✓ " : "+ "}
                {room.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quality Selector */}
        <div className="pe-group">
          <label className="pe-label">Design Quality</label>
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
            {rooms.length} room{rooms.length !== 1 ? "s" : ""} ·{" "}
            {QUALITY_MULTIPLIER[quality]?.label} finish
          </p>
        </div>

        {/* Breakdown bars */}
        <div className="pe-breakdown">
          {rooms.map((r) => {
            const room = ROOM_COSTS[r];
            const cost = Math.round(room.cost * multiplier);
            const pct = Math.round((cost / totalMax) * 100);
            return (
              <div key={r} className="pe-bar-row">
                <span className="pe-bar-label">{room.label}</span>
                <div className="pe-bar-track">
                  <div className="pe-bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="pe-bar-cost">{formatINR(cost)}</span>
              </div>
            );
          })}
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
