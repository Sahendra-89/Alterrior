import { useState } from "react";
import "./VideoTestimonial.css";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Savneet Shergill",
    location: "Gurgaon, Delhi NCR",
    quote:
      '"We had a great experience with this Company. They were very professional and timely . Their work on vanities had a great finish and they were very patient with any changes we wanted till we were completely satisfied. Their rates were competitive and they were very nice to deal with . Highly recommend this Company"',
    bg: "linear-gradient(135deg, #7A9E84 0%, #4A6B55 100%)",
    avatar: "👩‍👨",
  },
  {
    id: 2,
    name: "Apurva Sharma",
    location: "Gurugram, Delhi NCR",
    quote:
      '"I have consulted many other designers and woodwork consultants but none of them were as professional and efficient as Mr. Jitendra and his team. I recently got work for boilo based wardrobe and other living space woodwork. Mr jitendra and his team mate are highly professional and give genuine recommendations and their good services have earned my trust and respect. They completed work before expected. I highly recommend their services for home woodwork"',
    bg: "linear-gradient(135deg, #A08060 0%, #6A5540 100%)",
    avatar: "👩",
  },
  {
    id: 3,
    name: "Aayushi Yadav",
    location: "Gurugram, Delhi NCR",
    quote:
      '"  We worked with Jitender and his team at Altera Interiors for our home, and the experience has been wonderful. From planning to execution, they paid great attention to detail, kept timelines in check, and were always approachable for any concerns or changes. Jitender personally ensured quality and smooth coordination, which made the entire journey stress-free for us.Thanks to their hard work, our dream home has come to life beautifully. Highly recommend Altera Interiors for anyone looking for reliable, creative and professional interior solutions"',
    bg: "linear-gradient(135deg, #6B8E77 0%, #3D5445 100%)",
    avatar: "👨",
  },
  {
    id: 4,
    name: "Vinod Sahu",
    location: "Gurugram, Delhi NCR",
    quote:
      '"Genuine company with own in-house manufacturing setup. Good experienced staff, finish of work is upto the mark. Promoter is down to earth person, having skilled knowledge of his field. Must use his services if actually required good work with competitive price."',
    bg: "linear-gradient(135deg, #8B4513 0%, #5D2906 100%)",
    avatar: "👨",
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
              <path d="M8 5v14l11-7z" />
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
                className={`vt-dot${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Stars */}
          <div className="vt-stars">
            {"★★★★★".split("").map((s, i) => (
              <span key={i} className="vt-star">
                {s}
              </span>
            ))}
            <span className="vt-rating-label">5.0 — Verified Client</span>
          </div>

          <button
            className="vt-watch-btn"
            onClick={() => setActiveModal(current)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch Full Story
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModal && (
        <div className="vt-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="vt-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="vt-modal-close"
              onClick={() => setActiveModal(null)}
            >
              ✕
            </button>
            <div
              className="vt-modal-video"
              style={{ background: activeModal.bg }}
            >
              <div className="vt-modal-avatar">{activeModal.avatar}</div>
              <div className="vt-modal-play-hint">
                <svg viewBox="0 0 24 24" fill="white" width="48" height="48">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    marginTop: 8,
                    fontSize: 14,
                  }}
                >
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
