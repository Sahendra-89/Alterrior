import { useState, useEffect, useRef } from 'react';
import testimonials from '../../data/testimonials.json';
import './TestimonialSlider.css';

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const goTo = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((current + 1) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 5500);
  };

  const handlePrev = () => { prev(); resetTimer(); };
  const handleNext = () => { next(); resetTimer(); };

  const t = testimonials[current];

  return (
    <div className="testimonial-slider">
      {/* Quote mark */}
      <div className="quote-mark" aria-hidden="true">"</div>

      {/* Slide */}
      <div className={`testimonial-slide${isTransitioning ? ' transitioning' : ''}`}>
        <blockquote className="testimonial-quote">
          {t.quote}
        </blockquote>

        <div className="testimonial-meta">
          <div className="testimonial-avatar" style={{ background: t.color }}>
            {t.initials}
          </div>
          <div className="testimonial-info">
            <span className="testimonial-name">{t.name}</span>
            <span className="testimonial-location">{t.location}</span>
            <span className="testimonial-project">Project: {t.project}</span>
          </div>
          <div className="testimonial-stars" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`star${i < t.rating ? ' filled' : ''}`}>★</span>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="testimonial-controls">
        <button className="testimonial-btn" onClick={handlePrev} aria-label="Previous testimonial">
          ←
        </button>

        <div className="testimonial-dots" role="tablist">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot${i === current ? ' active' : ''}`}
              onClick={() => { goTo(i); resetTimer(); }}
              aria-label={`Testimonial ${i + 1}`}
              role="tab"
              aria-selected={i === current}
            />
          ))}
        </div>

        <button className="testimonial-btn" onClick={handleNext} aria-label="Next testimonial">
          →
        </button>
      </div>
    </div>
  );
}
