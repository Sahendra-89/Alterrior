import { useState } from "react";
import Button from "../../common/Button/Button";
import CostCalculator from "./CostCalculator";
import "./Services.css";

const SERVICES = [
  {
    id: "residential",
    icon: "🏠",
    title: "Residential Interior Design",
    desc: "Full-service interior design for apartments, villas, and bungalows. From concept to completion, we transform your home into a personalised sanctuary.",
    features: [
      "3D conceptual renders",
      "Material & finish selection",
      "Furniture procurement",
      "Project management",
      "Styling & staging",
    ],
    price: "From ₹800/sq ft",
    color: "#2C3B4A",
  },
  {
    id: "commercial",
    icon: "🏢",
    title: "Commercial Interior Design",
    desc: "Inspiring office environments, retail spaces, and hospitality interiors that elevate your brand and improve productivity.",
    features: [
      "Brand-aligned design",
      "Space planning",
      "Ergonomic workstations",
      "Acoustic solutions",
      "Signage integration",
    ],
    price: "From ₹1,200/sq ft",
    color: "#1E2830",
  },
  {
    id: "kitchen",
    icon: "🍳",
    title: "Kitchen & Bath Design",
    desc: "Precision-designed kitchens and bathrooms that marry form with function — from German modular cabinets to Italian stone surfaces.",
    features: [
      "Modular kitchen design",
      "Custom joinery",
      "Plumbing coordination",
      "Appliance integration",
      "Lighting design",
    ],
    price: "From ₹1,500/sq ft",
    color: "#3A3228",
  },
  {
    id: "planning",
    icon: "📐",
    title: "Space Planning & Consultation",
    desc: "A focused deep-dive into your existing or upcoming space — we optimise layout, flow, and functionality with a detailed design report.",
    features: [
      "Site measurement & analysis",
      "Floor plan optimisation",
      "Furniture layout",
      "Design brief document",
      "Follow-up consultation",
    ],
    price: "From ₹15,000 flat",
    color: "#2A342C",
  },
  {
    id: "furniture",
    icon: "🛋️",
    title: "Furniture & Décor Curation",
    desc: "Let our stylists handpick a cohesive collection of furniture, art, textiles, and accessories that bring your space to life.",
    features: [
      "Curated mood board",
      "Local & international sourcing",
      "Art selection",
      "Textile & rug curation",
      "Delivery coordination",
    ],
    price: "From ₹25,000",
    color: "#2D2418",
  },
  {
    id: "makeover",
    icon: "✨",
    title: "Full Home Makeover",
    desc: "End-to-end transformation of your entire home — combining all our services into a single, seamless experience.",
    features: [
      "Complete design direction",
      "Contractor management",
      "All rooms covered",
      "Timeline guarantee",
      "10-year design warranty",
    ],
    price: "Custom pricing",
    color: "#1A2030",
  },
];

export default function Services({ onQuoteOpen }) {
  const [activeService, setActiveService] = useState(null);

  return (
    <main className="page-wrapper">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span
            className="text-overline"
            style={{ display: "block", marginBottom: "var(--space-4)" }}
          >
            What We Offer
          </span>
          <h1 className="text-section-title">
            Design Services Tailored
            <br />
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
              to Your Vision
            </em>
          </h1>
          <p
            className="text-lead"
            style={{ maxWidth: 520, margin: "var(--space-5) auto 0" }}
          >
            Every service we offer is built around one principle — your home
            should be the most beautiful place you know.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="services-detail-grid">
            {SERVICES.map((svc) => (
              <div
                key={svc.id}
                className={`service-detail-card${activeService === svc.id ? " active" : ""}`}
                onClick={() =>
                  setActiveService(activeService === svc.id ? null : svc.id)
                }
              >
                <div className="sdc-header">
                  <div
                    className="sdc-icon-wrap"
                    style={{ background: svc.color + "33" }}
                  >
                    <span className="sdc-icon">{svc.icon}</span>
                  </div>
                  <div className="sdc-title-wrap">
                    <h3 style={{ fontSize: "var(--text-xl)" }}>{svc.title}</h3>
                    <span className="sdc-price">{svc.price}</span>
                  </div>
                  <span className="sdc-toggle">
                    {activeService === svc.id ? "−" : "+"}
                  </span>
                </div>

                <p className="sdc-desc">{svc.desc}</p>

                <div
                  className={`sdc-features${activeService === svc.id ? " open" : ""}`}
                >
                  <div className="sdc-features-inner">
                    <h6
                      style={{
                        fontSize: "var(--text-xs)",
                        letterSpacing: "var(--tracking-widest)",
                        textTransform: "uppercase",
                        color: "var(--color-gold)",
                        marginBottom: "var(--space-3)",
                      }}
                    >
                      What's Included
                    </h6>
                    <ul className="sdc-feature-list">
                      {svc.features.map((f) => (
                        <li key={f} className="sdc-feature-item">
                          <span className="sdc-check">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuoteOpen();
                      }}
                      style={{ marginTop: "var(--space-5)" }}
                      id={`service-quote-${svc.id}`}
                    >
                      Get a Quote
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section
        className="section"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Estimate</span>
            <h2 className="text-section-title">Cost Calculator</h2>
            <div className="section-divider" />
            <p>
              Get a ballpark figure for your project in seconds. No commitments
              — just clarity.
            </p>
          </div>
          <CostCalculator onQuoteOpen={onQuoteOpen} />
        </div>
      </section>

      {/* CTA */}
      <section
        className="cta-banner"
        style={{ paddingBlock: "var(--space-20)" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Every Project Starts with a Conversation</h2>
          <p
            style={{
              color: "var(--color-text-secondary)",
              margin: "var(--space-4) auto var(--space-8)",
              maxWidth: 480,
            }}
          >
            Tell us about your space and we'll craft a custom proposal within 24
            hours.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={onQuoteOpen}
            id="services-cta-btn"
          >
            Request Free Consultation
          </Button>
        </div>
      </section>
    </main>
  );
}
