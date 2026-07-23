import { useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import './QuoteModal.css';

const SERVICES = [
  'Residential Interior Design',
  'Commercial Interior Design',
  'Kitchen & Bath Renovation',
  'Space Planning & Consultation',
  'Furniture & Décor Curation',
  'Full Home Makeover',
  'Office Interior Design',
  'Other',
];

export default function QuoteModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', service: '', size: '', message: ''
  });

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) setSubmitted(false);
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      ref={overlayRef}
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✨</div>
            <h4>Thank You!</h4>
            <p>Your quote request has been received. Our design team will reach out within 24 hours to discuss your vision.</p>
            <div style={{ marginTop: 'var(--space-6)' }}>
              <Button variant="primary" onClick={onClose}>Back to Exploring</Button>
            </div>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="text-overline">Free Consultation</span>
              <h3 id="modal-title">Get Your Design Quote</h3>
              <p>Share your vision with us — we'll craft a tailored proposal within 24 hours.</p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-name">Full Name *</label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-phone">Phone Number *</label>
                  <input
                    id="modal-phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-email">Email Address *</label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="hello@yourname.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-service">Service Required *</label>
                  <select
                    id="modal-service"
                    name="service"
                    className="form-select"
                    value={form.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="modal-size">Approximate Area</label>
                  <select
                    id="modal-size"
                    name="size"
                    className="form-select"
                    value={form.size}
                    onChange={handleChange}
                  >
                    <option value="">Select area</option>
                    <option>Under 500 sq ft</option>
                    <option>500 – 1,000 sq ft</option>
                    <option>1,000 – 2,000 sq ft</option>
                    <option>2,000 – 4,000 sq ft</option>
                    <option>4,000+ sq ft</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="modal-message">Tell Us About Your Vision</label>
                <textarea
                  id="modal-message"
                  name="message"
                  className="form-textarea"
                  placeholder="Describe your space, style preferences, budget range, and timeline..."
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <div className="modal-submit">
                <Button type="submit" variant="primary" className="w-full">
                  Request Free Consultation
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
