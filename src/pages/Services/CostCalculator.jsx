import { useState } from 'react';
import Button from '../../common/Button/Button';

const ROOM_TYPES = [
  { id: 'living', label: 'Living Room', baseRate: 1200 },
  { id: 'bedroom', label: 'Bedroom', baseRate: 1000 },
  { id: 'kitchen', label: 'Kitchen', baseRate: 1800 },
  { id: 'bathroom', label: 'Bathroom', baseRate: 2200 },
  { id: 'office', label: 'Home Office', baseRate: 900 },
  { id: 'full', label: 'Full Home', baseRate: 850 },
];

const QUALITY_TIERS = [
  { id: 'premium', label: 'Premium', desc: 'Quality finishes, curated furniture', multiplier: 1 },
  { id: 'luxury', label: 'Luxury', desc: 'High-end materials, bespoke joinery', multiplier: 1.6 },
  { id: 'ultra', label: 'Ultra Luxury', desc: 'Custom everything, imported stone', multiplier: 2.5 },
];

function formatINR(n) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)}Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

export default function CostCalculator({ onQuoteOpen }) {
  const [roomType, setRoomType] = useState('living');
  const [area, setArea] = useState(500);
  const [tier, setTier] = useState('premium');

  const room = ROOM_TYPES.find(r => r.id === roomType);
  const quality = QUALITY_TIERS.find(q => q.id === tier);

  const baseEstimate = room.baseRate * area * quality.multiplier;
  const low  = Math.round(baseEstimate * 0.85);
  const high = Math.round(baseEstimate * 1.15);

  return (
    <div className="calc-wrapper">
      <div className="calc-inner">
        {/* Left panel */}
        <div className="calc-controls">
          {/* Room Type */}
          <div className="calc-group">
            <label className="calc-label">Space Type</label>
            <div className="calc-options">
              {ROOM_TYPES.map(r => (
                <button
                  key={r.id}
                  className={`calc-option${roomType === r.id ? ' active' : ''}`}
                  onClick={() => setRoomType(r.id)}
                  id={`calc-room-${r.id}`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Area */}
          <div className="calc-group">
            <label className="calc-label">
              Area: <span className="calc-value-display">{area.toLocaleString()} sq ft</span>
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="50"
              value={area}
              onChange={e => setArea(Number(e.target.value))}
              className="calc-slider"
              id="calc-area-slider"
            />
            <div className="calc-slider-labels">
              <span>100 sq ft</span>
              <span>10,000 sq ft</span>
            </div>
          </div>

          {/* Quality */}
          <div className="calc-group">
            <label className="calc-label">Finish Level</label>
            <div className="calc-tier-options">
              {QUALITY_TIERS.map(q => (
                <button
                  key={q.id}
                  className={`calc-tier${tier === q.id ? ' active' : ''}`}
                  onClick={() => setTier(q.id)}
                  id={`calc-tier-${q.id}`}
                >
                  <span className="calc-tier-label">{q.label}</span>
                  <span className="calc-tier-desc">{q.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Result */}
        <div className="calc-result">
          <div className="calc-result-inner">
            <span className="text-overline" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>Estimated Budget</span>

            <div className="calc-range">
              <span className="calc-low">{formatINR(low)}</span>
              <span className="calc-dash">—</span>
              <span className="calc-high">{formatINR(high)}</span>
            </div>

            <p className="calc-note">
              Estimated range for a {area.toLocaleString()} sq ft {room.label.toLowerCase()} at {quality.label} finish level.
            </p>

            <div className="calc-breakdown">
              <div className="calc-breakdown-row">
                <span>Base rate</span>
                <span>₹{Math.round(room.baseRate * quality.multiplier).toLocaleString('en-IN')}/sq ft</span>
              </div>
              <div className="calc-breakdown-row">
                <span>Area</span>
                <span>{area.toLocaleString()} sq ft</span>
              </div>
              <div className="calc-breakdown-row">
                <span>Finish tier</span>
                <span>{quality.label}</span>
              </div>
            </div>

            <p className="calc-disclaimer">
              * Estimates are indicative and subject to site visit, specific requirements, and material choices.
            </p>

            <Button variant="primary" onClick={onQuoteOpen} className="w-full" id="calc-quote-btn">
              Get Detailed Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
