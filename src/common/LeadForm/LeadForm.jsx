import { useState } from 'react';
import './LeadForm.css';

const BHK_OPTIONS = [
  { id: '1bhk', label: '1 BHK', icon: '🏠' },
  { id: '2bhk', label: '2 BHK', icon: '🏡' },
  { id: '3bhk', label: '3 BHK', icon: '🏘️' },
  { id: '4bhk', label: '4 BHK+', icon: '🏰' },
  { id: 'villa', label: 'Villa', icon: '🏯' },
];

const ROOM_OPTIONS = [
  { id: 'living', label: 'Living Room' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'study', label: 'Study / Office' },
];

const TOTAL_STEPS = 3;

function CircleProgress({ step }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const progress = step / TOTAL_STEPS;
  const offset = circumference * (1 - progress);

  return (
    <div className="lf-progress-ring" aria-label={`Step ${step} of ${TOTAL_STEPS}`}>
      <svg width="44" height="44">
        <circle r={radius} cx="22" cy="22" fill="transparent" stroke="var(--color-border)" strokeWidth="3" />
        <circle
          r={radius} cx="22" cy="22" fill="transparent"
          stroke="var(--color-sage-dark)" strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '22px 22px', transition: 'stroke-dashoffset 0.5s ease' }}
        />
        <text x="50%" y="50%" textAnchor="middle" dy="4px" fontSize="9" fontWeight="600" fill="var(--color-text-muted)">
          {step}/{TOTAL_STEPS}
        </text>
      </svg>
    </div>
  );
}

export default function LeadForm({ onClose }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({ bhk: '', rooms: [], name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const toggleRoom = (id) => {
    setSelected(prev => ({
      ...prev,
      rooms: prev.rooms.includes(id) ? prev.rooms.filter(r => r !== id) : [...prev.rooms, id],
    }));
  };

  const handleNext = () => {
    if (step === 1 && !selected.bhk) { setError('Please select your home type.'); return; }
    if (step === 2 && selected.rooms.length === 0) { setError('Please select at least one room.'); return; }
    setError('');
    setStep(s => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected.name.trim()) { setError('Please enter your name.'); return; }
    if (!/^\d{10}$/.test(selected.phone)) { setError('Please enter a valid 10-digit phone number.'); return; }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="lf-card lf-success">
        <div className="lf-success-icon">✓</div>
        <h3>Thank You, {selected.name}!</h3>
        <p>Our design consultant will call you within 24 hours.</p>
        {onClose && <button className="lf-close-success" onClick={onClose}>Got it</button>}
      </div>
    );
  }

  return (
    <div className="lf-card">
      <CircleProgress step={step} />

      {step === 1 && (
        <>
          <h3 className="lf-title">What type of home?</h3>
          <p className="lf-subtitle">Select your home configuration</p>
          <div className="lf-bhk-grid">
            {BHK_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className={`lf-bhk-btn${selected.bhk === opt.id ? ' selected' : ''}`}
                onClick={() => { setSelected(s => ({ ...s, bhk: opt.id })); setError(''); }}
              >
                <span className="lf-bhk-icon">{opt.icon}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <button className="lf-next-btn" onClick={handleNext}>Next →</button>
          <p className="lf-disclaimer">By continuing, you agree to our <a href="/privacy">privacy policy</a> &amp; <a href="/terms">terms</a></p>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="lf-title">Which rooms to design?</h3>
          <p className="lf-subtitle">Select all that apply</p>
          <div className="lf-rooms-list">
            {ROOM_OPTIONS.map(room => (
              <button
                key={room.id}
                className={`lf-room-btn${selected.rooms.includes(room.id) ? ' selected' : ''}`}
                onClick={() => { toggleRoom(room.id); setError(''); }}
              >
                <span className="lf-check">{selected.rooms.includes(room.id) ? '✓' : '+'}</span>
                {room.label}
              </button>
            ))}
          </div>
          {error && <p className="lf-error">{error}</p>}
          <div className="lf-btn-row">
            <button className="lf-back-btn" onClick={() => setStep(1)}>← Back</button>
            <button className="lf-next-btn" onClick={handleNext}>Next →</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3 className="lf-title">Get your free design quote</h3>
          <p className="lf-subtitle">Our expert calls you within 24 hrs</p>
          <form onSubmit={handleSubmit} className="lf-contact-form">
            <input
              type="text"
              placeholder="Your Name"
              value={selected.name}
              onChange={e => { setSelected(s => ({ ...s, name: e.target.value })); setError(''); }}
              className="lf-input"
            />
            <div className="lf-phone-row">
              <span className="lf-phone-flag">🇮🇳 +91</span>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={selected.phone}
                maxLength={10}
                onChange={e => { setSelected(s => ({ ...s, phone: e.target.value.replace(/\D/g, '') })); setError(''); }}
                className="lf-input lf-phone-input"
              />
            </div>
            {error && <p className="lf-error">{error}</p>}
            <div className="lf-btn-row">
              <button type="button" className="lf-back-btn" onClick={() => setStep(2)}>← Back</button>
              <button type="submit" className="lf-submit-btn">Get Free Quote</button>
            </div>
          </form>
          <p className="lf-disclaimer">By submitting, you agree to our <a href="/privacy">privacy policy</a> &amp; <a href="/terms">terms</a></p>
        </>
      )}
    </div>
  );
}
