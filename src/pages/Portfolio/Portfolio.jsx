import { useState } from "react";
import portfolioData from "../../data/portfolio.json";
import "./Portfolio.css";

const CATEGORIES = [
  "All",
];

export default function Portfolio() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    active === "All"
      ? portfolioData
      : portfolioData.filter((p) => p.category === active);

  return (
    <main className="page-wrapper">
      {/* Hero */}
      <section 
        className="page-hero"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(13, 13, 13, 0.4) 0%, rgba(13, 13, 13, 0.6) 100%), url('/assets/portfolio/office-loft.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#ffffff"
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="text-overline" style={{ display: 'block', marginBottom: 'var(--space-4)', color: '#ffffff', opacity: 0.8 }}>Our Work</span>
          <h1 className="text-section-title" style={{ color: '#ffffff' }}>A Portfolio of<br /><em style={{ fontStyle: 'italic', color: 'var(--color-tan-light)' }}>Transformations</em></h1>
          <p className="text-lead" style={{ maxWidth: 520, margin: 'var(--space-5) auto 0', color: '#ffffff', opacity: 0.9 }}>
            {portfolioData.length} projects across India — each one a unique story of space, style, and craft.
          </p>
        </div>
      </section>

      {/* Filter & Grid */}
      <section className="section">
        <div className="container">
          {/* Filters */}
          <div className="portfolio-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${active === cat ? " active" : ""}`}
                onClick={() => setActive(cat)}
                id={`portfolio-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="portfolio-count">
            Showing <span>{filtered.length}</span> project
            {filtered.length !== 1 ? "s" : ""}
          </p>

          {/* Grid */}
          <div className="portfolio-grid">
            {filtered.map((project, i) => (
              <div
                key={project.id}
                className={`portfolio-card${i % 5 === 0 ? " wide" : ""}`}
                onClick={() => setLightbox(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setLightbox(project)}
                aria-label={`View ${project.title}`}
              >
                <div
                  className="portfolio-card-bg"
                  style={
                    project.image
                      ? {
                          backgroundImage: `url(${project.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }
                      : {
                          background: `linear-gradient(135deg, ${project.color} 0%, ${project.color}bb 100%)`,
                        }
                  }
                />
                {/* Overlay removed per user request */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Project: ${lightbox.title}`}
        >
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div
              className="lightbox-image"
              style={
                lightbox.image
                  ? {
                      backgroundImage: `url(${lightbox.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : {
                      background: `linear-gradient(135deg, ${lightbox.color} 0%, ${lightbox.color}99 100%)`,
                    }
              }
            >
              <div className="lightbox-image-label">
                <span>{lightbox.category}</span>
                <span>{lightbox.area}</span>
              </div>
            </div>
            <div className="lightbox-info">
              <div className="lightbox-header">
                <div>
                  <h3 className="lightbox-title">{lightbox.title}</h3>
                  <p className="lightbox-location">
                    📍 {lightbox.location} · {lightbox.year}
                  </p>
                </div>
                <div className="lightbox-area-badge">{lightbox.area}</div>
              </div>
              <p className="lightbox-desc">{lightbox.description}</p>
              <div className="lightbox-tags">
                {lightbox.tags.map((tag) => (
                  <span key={tag} className="portfolio-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
