import { useState } from 'react';
import './VideoTestimonial.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya & Rahul Sharma',
    location: 'Gurgaon, Delhi NCR',
    quote: '"The Altera team transformed our 3BHK into a dream home. The project manager was proactive and delivered everything on time — exactly as we envisioned."',
    bg: 'linear-gradient(135deg, #7A9E84 0%, #4A6B55 100%)',
    avatar: '👩‍👨',
  },
  {
    id: 2,
    name: 'Ananya Krishnan',
    location: 'Bangalore, Karnataka',
    quote: '"I was skeptical about online interior design, but Altera Interior exceeded every expectation. The 3D renders matched the final outcome perfectly!"',
    bg: 'linear-gradient(135deg, #A08060 0%, #6A5540 100%)',
    avatar: '👩',
  },
  {
    id: 3,
    name: 'Vikram & Sunita Mehta',
    location: 'Mumbai, Maharashtra',
    quote: '"From the first consultation to the final handover, the experience was seamless. Our modular kitchen is stunning and incredibly functional."',
    bg: 'linear-gradient(135deg, #6B8E77 0%, #3D5445 100%)',
    avatar: '👨',
  },
];

export default function VideoTestimonial() {
  const [activeModal, setActiveModal] = useState(null);
  const [active, setActive] = useState(0);

  const current = TESTIMONIALS[active];

  return (
    <>
      <div className="vt-wrapper">
        {/* Video Card */}
        <div className="vt-video-card" onClick={() => setActiveModal(current)}>
          <div className="vt-thumbnail" style={{ background: current.bg }}>
            <div className="vt-avatar">{current.avatar}</div>
          </div>
          <div className="vt-play-btn" aria-label="Play testimonial video">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <div className="vt-video-label">Watch Story</div>
        </div>

        {/* Quote */}
        <div className="vt-quote-panel">
          <div className="vt-quote-mark">"</div>
          <p className="vt-quote-text">{current.quote}</p>
          <div className="vt-client-info">
            <span className="vt-client-name">{current.name}</span>
            <span className="vt-client-loc">📍 {current.location}</span>
          </div>

          {/* Dot selectors */}
          <div className="vt-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`vt-dot${active === i ? ' active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Stars */}
          <div className="vt-stars">
            {'★★★★★'.split('').map((s, i) => <span key={i} className="vt-star">{s}</span>)}
            <span className="vt-rating-label">5.0 — Verified Client</span>
          </div>

          <button className="vt-watch-btn" onClick={() => setActiveModal(current)}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M8 5v14l11-7z"/></svg>
            Watch Full Story
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModal && (
        <div className="vt-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="vt-modal" onClick={e => e.stopPropagation()}>
            <button className="vt-modal-close" onClick={() => setActiveModal(null)}>✕</button>
            <div className="vt-modal-video" style={{ background: activeModal.bg }}>
              <div className="vt-modal-avatar">{activeModal.avatar}</div>
              <div className="vt-modal-play-hint">
                <svg viewBox="0 0 24 24" fill="white" width="48" height="48"><path d="M8 5v14l11-7z"/></svg>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: 8, fontSize: 14 }}>
                  Video testimonial
                </p>
              </div>
            </div>
            <div className="vt-modal-body">
              <p className="vt-modal-quote">{activeModal.quote}</p>
              <p className="vt-modal-name">{activeModal.name}</p>
              <p className="vt-modal-loc">📍 {activeModal.location}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
