import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import TestimonialSlider from '../../common/TestimonialSlider/TestimonialSlider';
import LeadForm from '../../common/LeadForm/LeadForm';
import TrustStrip from '../../common/TrustStrip/TrustStrip';
import BudgetCarousel from '../../common/BudgetCarousel/BudgetCarousel';
import PriceEstimator from '../../common/PriceEstimator/PriceEstimator';
import VideoTestimonial from '../../common/VideoTestimonial/VideoTestimonial';
import WhatWeOffer from '../../common/WhatWeOffer/WhatWeOffer';
import portfolioData from '../../data/portfolio.json';
import blogPosts from '../../data/blogPosts.json';
import './Home.css';

const STATS = [
  { number: '350+', label: 'Projects Delivered' },
  { number: '12',   label: 'Years of Excellence' },
  { number: '98%',  label: 'Client Satisfaction' },
  { number: '18',   label: 'Cities Served' },
];

const PROCESS = [
  { num: '01', title: 'Discovery',     desc: 'We listen deeply to understand your vision, lifestyle, and aesthetic preferences.' },
  { num: '02', title: 'Concept Design',desc: 'Our designers create mood boards, 3D renders, and material palettes tailored to you.' },
  { num: '03', title: 'Execution',     desc: 'Precision project management with trusted contractors and artisans, every step tracked.' },
  { num: '04', title: 'Handover',      desc: 'White-glove styling, final walk-through, and aftercare support to ensure your delight.' },
];

// Intersection observer hook for fade-in
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Animated counter
function Counter({ target }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const num = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/[\d]/g, '');
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * num) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref} className="stat-number">{target}</span>;
}

const FEATURED = portfolioData.filter(p => p.featured).slice(0, 4);

export default function Home({ onQuoteOpen }) {
  const aboutRef    = useFadeIn();
  const processRef  = useFadeIn();
  const estimatorRef = useFadeIn();
  const videoRef    = useFadeIn();

  return (
    <main className="page-wrapper">

      {/* ======== HERO — Split Panel ======== */}
      <section className="hero" id="home" aria-label="Hero">
        {/* Left: Text + Lead Form */}
        <div className="hero-text-panel">
          <p className="hero-eyebrow">Designed</p>
          <h1 className="hero-title">
            Naturally<br />
            <span className="hero-title-accent">Perfectly</span>
          </h1>
          <p className="hero-subtitle">Interiors that reflect you</p>

          <Link to="/portfolio" className="hero-cta-btn" id="hero-explore-btn">
            Explore Our Work
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Right: Living Room Image */}
        <div className="hero-image-panel">
          <img
            src="/assets/hero-living-room.jpg"
            alt="Beautifully designed natural living room interior by Altera Interior"
            loading="eager"
          />
          {/* Floating Lead Form */}
          <div className="hero-form-float">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ======== TRUST STRIP — Marquee ======== */}
      <TrustStrip />

      {/* ======== STATS BAR ======== */}
      <section className="stats-bar" aria-label="Company statistics">
        <div className="container">
          <div className="stats-grid">
            {STATS.map(({ number, label }) => (
              <div key={label} className="stat-item">
                <Counter target={number} />
                <p className="stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== BUDGET CAROUSEL — Homes for Every Budget ======== */}
      <section className="section budget-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: 'var(--space-8)' }}>
            <span className="text-overline">Budget-Friendly Designs</span>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
              <h2 className="text-section-title" style={{ marginBottom: 0 }}>Homes for Every Budget</h2>
              <Button variant="primary" onClick={onQuoteOpen} size="sm" id="budget-quote-btn">
                Get Free Quote
              </Button>
            </div>
            <p style={{ marginTop: 'var(--space-3)', color: 'var(--color-text-muted)' }}>
              Our designers work with your requirements and budget to create the perfect home.
            </p>
          </div>
          <BudgetCarousel />
        </div>
      </section>

      {/* ======== ABOUT SNIPPET ======== */}
      <section className="section about-snippet">
        <div className="container">
          <div className="about-snippet-inner">
            {/* Image Grid */}
            <div className="about-image-grid" style={{ position: 'relative' }}>
              <div className="about-img">
                <div className="about-img-fill" style={{
                  backgroundImage: 'url(/assets/portfolio/living-room-luxury.jpg)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
              </div>
              <div className="about-img">
                <div className="about-img-fill" style={{
                  backgroundImage: 'url(/assets/portfolio/kitchen-ivory.jpg)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
              </div>
              <div className="about-img">
                <div className="about-img-fill" style={{
                  backgroundImage: 'url(/assets/portfolio/bathroom-spa.jpg)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
              </div>
              <div className="about-badge">
                <span className="about-badge-num">12</span>
                <span className="about-badge-text">Years of<br />Excellence</span>
              </div>
            </div>

            {/* Text */}
            <div ref={aboutRef} className="about-text fade-in">
              <span className="text-overline">Our Story</span>
              <div className="gold-line" style={{ marginTop: 'var(--space-3)' }} />
              <h2>Crafting Spaces with <em>Soul</em></h2>
              <p>
                Founded in 2012, Altera Interior was born from a simple belief: every space has the potential to be extraordinary. We are a boutique studio of passionate designers, artisans, and project managers dedicated to translating your vision into reality.
              </p>
              <p>
                Our approach blends international design sensibility with a deep respect for craft traditions — the result is spaces that feel both globally refined and distinctly personal.
              </p>
              <div className="about-features">
                {['Bespoke design solutions', 'Transparent pricing', 'On-time delivery', 'Premium material sourcing', 'Experienced design team', '5-year design warranty'].map(f => (
                  <div key={f} className="about-feature">
                    <span className="about-feature-dot" />
                    {f}
                  </div>
                ))}
              </div>
              <Button variant="secondary" to="/about" arrow id="home-about-btn">Our Full Story</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ======== WHAT WE OFFER — Carousel ======== */}
      <section className="section services-preview">
        <div className="container">
          <WhatWeOffer onQuoteOpen={onQuoteOpen} />
        </div>
      </section>

      {/* ======== PRICE ESTIMATOR ======== */}
      <section className="section estimator-section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Interior Price Estimator</span>
            <h2 className="text-section-title">Calculate Your Design Budget</h2>
            <div className="section-divider" />
            <p>Select your home type, rooms & design quality to get an approximate cost estimate instantly.</p>
          </div>
          <div ref={estimatorRef} className="fade-in">
            <PriceEstimator onQuoteOpen={onQuoteOpen} />
          </div>
        </div>
      </section>

      {/* ======== PORTFOLIO TEASER ======== */}
      <section className="section portfolio-teaser">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Our Work</span>
            <h2 className="text-section-title">Featured Projects</h2>
            <div className="section-divider" />
            <p>A curated selection of transformations that showcase the breadth and depth of our design philosophy.</p>
          </div>
          <div className="portfolio-mosaic">
            {FEATURED.map((project, i) => {
              const MOSAIC_IMGS = [
                '/assets/portfolio/living-room-luxury.jpg',
                '/assets/portfolio/bedroom-dark.jpg',
                '/assets/portfolio/kitchen-ivory.jpg',
                '/assets/portfolio/office-corporate.jpg',
              ];
              return (
                <Link key={project.id} to="/portfolio" className="portfolio-item">
                  <div
                    className="portfolio-item-bg"
                    style={{
                      backgroundImage: `url(${project.image || MOSAIC_IMGS[i]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="portfolio-item-overlay">
                    <span className="portfolio-item-tag">{project.category}</span>
                    <span className="portfolio-item-title">{project.title}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Button variant="secondary" to="/portfolio" arrow id="home-portfolio-btn">View All Projects</Button>
          </div>
        </div>
      </section>

      {/* ======== PROCESS ======== */}
      <section className="section process-section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">How We Work</span>
            <h2 className="text-section-title">Our Design Process</h2>
            <div className="section-divider" />
            <p>A clear, collaborative journey from first conversation to final reveal.</p>
          </div>
          <div ref={processRef} className="process-grid fade-in">
            {PROCESS.map(({ num, title, desc }) => (
              <div key={num} className="process-step">
                <div className="process-number">{num}</div>
                <h5>{title}</h5>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== VIDEO TESTIMONIAL ======== */}
      <section className="section video-testimonial-section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Client Stories</span>
            <h2 className="text-section-title">Hear from Our Clients</h2>
            <div className="section-divider" />
          </div>
          <div ref={videoRef} className="fade-in">
            <VideoTestimonial />
          </div>
        </div>
      </section>

      {/* ======== TESTIMONIAL SLIDER ======== */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Reviews</span>
            <h2 className="text-section-title">What Our Clients Say</h2>
            <div className="section-divider" />
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* ======== CTA BANNER ======== */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-banner-inner">
            <span className="text-overline" style={{ display: 'block', marginBottom: 'var(--space-4)' }}>Ready to Begin?</span>
            <h2>
              Let&apos;s Create Your Dream<br />
              <em>Living Space</em>
            </h2>
            <p>Book a complimentary 30-minute consultation with our design team. No obligation — just a conversation about your vision.</p>
            <div className="cta-banner-actions">
              <Button variant="primary" size="lg" onClick={onQuoteOpen} id="home-cta-quote-btn">Get a Free Consultation</Button>
              <Button variant="ghost" size="lg" to="/contact" id="home-cta-contact-btn">Contact Us</Button>
            </div>
          </div>
        </div>
      </section>

      {/* ======== BLOG PREVIEW ======== */}
      <section className="section blog-preview">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Design Journal</span>
            <h2 className="text-section-title">Stories &amp; Insights</h2>
            <div className="section-divider" />
            <p>Design wisdom, material guides, and trend reports from our studio.</p>
          </div>
          <div className="blog-preview-grid">
            {blogPosts.slice(0, 3).map((post, i) => {
              const BLOG_IMGS = [
                '/assets/portfolio/living-tropical.jpg',
                '/assets/portfolio/kitchen-obsidian.jpg',
                '/assets/portfolio/bedroom-coastal.jpg',
              ];
              return (
                <Link key={post.id} to="/blog" className="blog-preview-card">
                  <div className="blog-preview-image">
                    <div style={{
                      width: '100%', height: '100%',
                      backgroundImage: `url(${BLOG_IMGS[i]})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.4s ease',
                    }} />
                  </div>
                  <div className="blog-preview-body">
                    <div className="blog-preview-meta">
                      <span className="blog-preview-cat">{post.category}</span>
                      <span className="blog-preview-date">{new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <h4 className="blog-preview-title">{post.title}</h4>
                    <p className="blog-preview-excerpt">{post.excerpt}</p>
                    <span className="blog-read-time"><span>⏱</span> {post.readingTime}</span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <Button variant="secondary" to="/blog" arrow id="home-blog-btn">View All Articles</Button>
          </div>
        </div>
      </section>

    </main>
  );
}
