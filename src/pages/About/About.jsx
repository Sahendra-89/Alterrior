import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';
import './About.css';
import '../Services/Services.css';

const TEAM = [
  {
    name: 'Aryan Altera',
    role: 'Founder & Creative Director',
    bio: 'With 15 years of international design experience, Aryan founded Altera Interior to bring world-class luxury design to Indian homes.',
    color: '#2C3B4A',
    initials: 'AA',
  },
  {
    name: 'Meera Krishnan',
    role: 'Head of Residential Design',
    bio: "A graduate of NID Ahmedabad with a Master\u2019s from the \u00c9cole nationale sup\u00e9rieure des Arts D\u00e9coratifs, Paris.",
    color: '#3A3228',
    initials: 'MK',
  },
  {
    name: 'Rohit Agarwal',
    role: 'Commercial Design Lead',
    bio: 'Rohit brings 10 years of expertise in hospitality and corporate design, having led projects across Asia and the Middle East.',
    color: '#2A342C',
    initials: 'RA',
  },
  {
    name: 'Sanya Patel',
    role: 'Senior Interior Stylist',
    bio: 'A trained stylist and furniture curator, Sanya sources bespoke pieces from across India, Italy, and Scandinavia.',
    color: '#1E2830',
    initials: 'SP',
  },
];

const VALUES = [
  { icon: '🎯', title: 'Precision', desc: "Every millimetre matters. We obsess over details so you don't have to." },
  { icon: '🤝', title: 'Collaboration', desc: "Your vision is the brief. We listen first, then design." },
  { icon: '♻️', title: 'Sustainability', desc: 'We prioritise responsible sourcing, local artisanship, and longevity.' },
  { icon: '💡', title: 'Innovation', desc: 'We blend timeless principles with cutting-edge materials and technology.' },
];

const AWARDS = [
  { year: '2024', title: 'Best Luxury Residential Studio', body: 'India Design Awards' },
  { year: '2023', title: 'Excellence in Commercial Design', body: 'Asia Interior Design Congress' },
  { year: '2022', title: 'Emerging Studio of the Year', body: 'Architectural Digest India' },
  { year: '2021', title: 'Best Kitchen Design', body: 'Houzz Awards India' },
];

export default function About({ onQuoteOpen }) {
  return (
    <main className="page-wrapper">
      {/* ---- Hero ---- */}
      <section className="page-hero about-hero">
        <div className="container">
          <span className="text-overline" style={{ marginBottom: 'var(--space-4)', display: 'block' }}>About Altera Interior</span>
          <h1 className="text-section-title">A Studio Built on<br /><em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Passion & Craft</em></h1>
          <p className="text-lead" style={{ maxWidth: 560, margin: 'var(--space-5) auto 0' }}>
            We are more than interior designers — we are space-makers, storytellers, and guardians of your aesthetic vision.
          </p>
        </div>
      </section>

      {/* ---- Story ---- */}
      <section className="section about-story-section">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-visual">
              <div className="about-story-img" style={{ background: 'linear-gradient(135deg, #2C3B4A 0%, #1A2530 100%)' }} />
              <div className="about-story-accent" style={{ background: 'linear-gradient(135deg, #3A3228 0%, #2A2318 100%)' }} />
            </div>
            <div className="about-story-text">
              <span className="text-overline">Our Story</span>
              <div className="gold-line" style={{ marginTop: 'var(--space-3)' }} />
              <h2 style={{ fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))', marginBottom: 'var(--space-6)' }}>
                From a Single Vision to 350+ Transformed Spaces
              </h2>
              <p className="text-body" style={{ marginBottom: 'var(--space-4)' }}>
                Altera Interior was founded in 2012 by Aryan Altera, a designer who believed that exceptional interiors should not be reserved for the ultra-wealthy. Starting with a single-room studio in Mumbai's Bandra Kurla Complex, the practice has grown into one of India's most respected boutique interior design studios.
              </p>
              <p className="text-body" style={{ marginBottom: 'var(--space-4)' }}>
                Over twelve years, we have designed luxury residences, five-star hospitality spaces, innovative corporate offices, and intimate private retreats — across 18 Indian cities and 3 international markets.
              </p>
              <p className="text-body" style={{ marginBottom: 'var(--space-8)' }}>
                Our philosophy is simple: every space should tell a story. That story is always yours.
              </p>
              <Button variant="primary" onClick={onQuoteOpen} id="about-quote-btn">
                Start Your Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Values ---- */}
      <section className="section about-values-section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">What Drives Us</span>
            <h2 className="text-section-title">Our Core Values</h2>
            <div className="section-divider" />
          </div>
          <div className="values-grid">
            {VALUES.map(({ icon, title, desc }) => (
              <div key={title} className="value-card glass-card" style={{ padding: 'var(--space-8)' }}>
                <span className="value-icon">{icon}</span>
                <h4 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>{title}</h4>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 'var(--leading-relaxed)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Team ---- */}
      <section className="section about-team-section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">The Makers</span>
            <h2 className="text-section-title">Meet Our Team</h2>
            <div className="section-divider" />
            <p>A team of passionate designers united by an obsession with beautiful, functional spaces.</p>
          </div>
          <div className="team-grid">
            {TEAM.map(({ name, role, bio, color, initials }) => (
              <div key={name} className="team-card">
                <div className="team-avatar" style={{ background: color }}>
                  <span className="team-initials">{initials}</span>
                </div>
                <h5 style={{ marginBottom: 'var(--space-1)', fontSize: 'var(--text-xl)' }}>{name}</h5>
                <p className="team-role">{role}</p>
                <p className="team-bio">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Awards ---- */}
      <section className="section about-awards-section">
        <div className="container">
          <div className="section-header">
            <span className="text-overline">Recognition</span>
            <h2 className="text-section-title">Awards & Accolades</h2>
            <div className="section-divider" />
          </div>
          <div className="awards-list">
            {AWARDS.map(({ year, title, body }) => (
              <div key={title} className="award-item">
                <span className="award-year">{year}</span>
                <div className="award-divider" />
                <div className="award-info">
                  <h5 style={{ fontSize: 'var(--text-lg)' }}>{title}</h5>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gold)' }}>{body}</p>
                </div>
                <span className="award-trophy">🏆</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="cta-banner" style={{ paddingBlock: 'var(--space-20)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Work Together?</h2>
          <p style={{ color: 'var(--color-text-secondary)', margin: 'var(--space-4) auto var(--space-8)', maxWidth: 480 }}>
            Let's begin with a conversation. Our team is ready to listen to your vision.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={onQuoteOpen} id="about-cta-btn">Get a Free Quote</Button>
            <Button variant="ghost" to="/contact" id="about-contact-btn">Contact Us</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
