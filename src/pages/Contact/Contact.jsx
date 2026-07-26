import { useState } from "react";
import Button from "../../common/Button/Button";
import "./Contact.css";

const SERVICES = [
  "Residential Interior Design",
  "Commercial Interior Design",
  "Kitchen & Bath Design",
  "Space Planning",
  "Furniture Curation",
  "Full Home Makeover",
  "Other",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="page-wrapper">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span
            className="text-overline"
            style={{ display: "block", marginBottom: "var(--space-4)" }}
          >
            Get in Touch
          </span>
          <h1 className="text-section-title">
            Let's Start Your
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
              Design Journey
            </em>
          </h1>
          <p
            className="text-lead"
            style={{ maxWidth: 520, margin: "var(--space-5) auto 0" }}
          >
            Whether you have a project in mind or just want to explore
            possibilities — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Contact Layout */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Left — Info */}
            <div className="contact-info">
              <div className="contact-info-block">
                <span
                  className="text-overline"
                  style={{ marginBottom: "var(--space-3)", display: "block" }}
                >
                  Our Studio
                </span>
                <h3
                  style={{
                    fontSize: "var(--text-2xl)",
                    marginBottom: "var(--space-6)",
                  }}
                >
                  Visit Us in Gurugram
                </h3>

                <div className="contact-detail">
                  <div className="contact-detail-icon">📍</div>
                  <div>
                    <p style={{ fontWeight: 500, marginBottom: 2 }}>
                      Studio Address
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "var(--text-sm)",
                        lineHeight: "var(--leading-relaxed)",
                      }}
                    >
                      Behind Ats Triputi Tower, Dawrka Expresway, Sector - 104,
                      <br />
                      HARYANA, Gurugram (HR) - 122006
                    </p>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">📞</div>
                  <div>
                    <p style={{ fontWeight: 500, marginBottom: 2 }}>Phone</p>
                    <a href="tel:+919876543210" className="contact-link">
                      +91 9718374407, +91 9650136952
                    </a>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">✉️</div>
                  <div>
                    <p style={{ fontWeight: 500, marginBottom: 2 }}>Email</p>
                    <a
                      href="mailto:hello@alterainterior.com"
                      className="contact-link"
                    >
                      alterakitcheninterior@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-detail">
                  <div className="contact-detail-icon">🕐</div>
                  <div>
                    <p style={{ fontWeight: 500, marginBottom: 2 }}>
                      Studio Hours
                    </p>
                    <p
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "var(--text-sm)",
                        lineHeight: "var(--leading-relaxed)",
                      }}
                    >
                      Monday – Saturday
                      <br />
                      10:00 AM – 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="contact-map">
                <iframe
                  title="Altera Interior Studio Map Location"
                  src="https://maps.google.com/maps?q=Behind%20Ats%20Triputi%20Tower%2C%20Dawrka%20Expresway%2C%20Sector%20-%20104%2C%20Gurugram%20Haryana&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            {/* Right — Form */}
            <div className="contact-form-wrap">
              {submitted ? (
                <div className="contact-success">
                  <span style={{ fontSize: "3rem" }}>✨</span>
                  <h3>Message Received!</h3>
                  <p>
                    Thank you for reaching out to Altera Interior. We'll get
                    back to you within 24 hours to discuss how we can help
                    transform your space.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => setSubmitted(false)}
                    id="contact-reset-btn"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h3
                    style={{
                      fontSize: "var(--text-2xl)",
                      marginBottom: "var(--space-2)",
                    }}
                  >
                    Send Us a Message
                  </h3>
                  <p
                    style={{
                      color: "var(--color-text-muted)",
                      fontSize: "var(--text-sm)",
                      marginBottom: "var(--space-8)",
                    }}
                  >
                    Fill in the form below and we'll respond within one business
                    day.
                  </p>

                  <form
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-name">
                          Full Name *
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          className="form-input"
                          placeholder=" "
                          value={form.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="contact-phone">
                          Phone
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          className="form-input"
                          placeholder=" "
                          value={form.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-email">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className="form-input"
                        placeholder=" "
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-service">
                        Service Interested In
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        className="form-select"
                        value={form.service}
                        onChange={handleChange}
                      >
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="contact-message">
                        Message *
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        className="form-textarea"
                        placeholder="Tell us about your project, space, timeline, and any specific requirements..."
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      id="contact-submit-btn"
                    >
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="contact-strip">
        <div className="container">
          <div className="contact-strip-inner">
            <div className="contact-strip-item">
              <span className="contact-strip-icon">⚡</span>
              <div>
                <p style={{ fontWeight: 500 }}>Fast Response</p>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Reply within 24 hours
                </p>
              </div>
            </div>
            <div className="contact-strip-item">
              <span className="contact-strip-icon">🎁</span>
              <div>
                <p style={{ fontWeight: 500 }}>Free Consultation</p>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  No obligation, ever
                </p>
              </div>
            </div>
            <div className="contact-strip-item">
              <span className="contact-strip-icon">🔒</span>
              <div>
                <p style={{ fontWeight: 500 }}>Confidential</p>
                <p
                  style={{
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Your data is safe with us
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
