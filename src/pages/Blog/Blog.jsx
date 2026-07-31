import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../../data/blogPosts.json';
import './Blog.css';

const CATEGORIES = ['All', ...new Set(blogPosts.map(p => p.category))];

const BLOG_IMAGES = [
  "/assets/portfolio/living-room-luxury.jpg",
  "/assets/portfolio/kitchen-ivory.jpg",
  "/assets/portfolio/living-tropical.jpg",
  "/assets/portfolio/bedroom-dark.jpg",
  "/assets/portfolio/kitchen-obsidian.jpg",
  "/assets/portfolio/office-corporate.jpg",
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return blogPosts.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  const featured = blogPosts.find(p => p.featured);

  const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <main className="page-wrapper">
      {/* Hero */}
      <section 
        className="page-hero"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/assets/portfolio/living-tropical.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white"
        }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="text-overline" style={{ display: 'block', marginBottom: 'var(--space-4)', color: 'rgba(255, 255, 255, 0.85)' }}>Design Journal</span>
          <h1 className="text-section-title" style={{ color: 'white' }}>Stories, Ideas &<br /><em style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Inspiration</em></h1>
          <p className="text-lead" style={{ maxWidth: 520, margin: 'var(--space-5) auto 0', color: 'rgba(255, 255, 255, 0.9)' }}>
            Design wisdom, material guides, trend reports, and studio stories — straight from our designers.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {featured && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <Link to="#" className="featured-post">
              <div className="featured-post-image">
                <img
                  src={BLOG_IMAGES[(featured.id - 1) % BLOG_IMAGES.length]}
                  alt={featured.title}
                  loading="eager"
                />
                <div className="featured-post-badge">Featured</div>
              </div>
              <div className="featured-post-content">
                <div className="featured-meta">
                  <span className="blog-cat-badge">{featured.category}</span>
                  <span className="blog-date">{formatDate(featured.date)}</span>
                  <span className="blog-read">⏱ {featured.readingTime}</span>
                </div>
                <h2 className="featured-title">{featured.title}</h2>
                <p className="featured-excerpt">{featured.excerpt}</p>
                <span className="featured-read-link">Read Article →</span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Filter & Search */}
      <section className="section">
        <div className="container">
          <div className="blog-toolbar">
            <div className="blog-filters">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  id={`blog-filter-${cat.toLowerCase()}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="blog-search-wrap">
              <span className="blog-search-icon">🔍</span>
              <input
                type="search"
                placeholder="Search articles..."
                className="blog-search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                id="blog-search-input"
              />
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="blog-empty">
              <span style={{ fontSize: '3rem' }}>📚</span>
              <p>No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {filtered.map(post => (
                <Link key={post.id} to="#" className="blog-card">
                  <div className="blog-card-image">
                    <img
                      src={BLOG_IMAGES[(post.id - 1) % BLOG_IMAGES.length]}
                      alt={post.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-cat-badge">{post.category}</span>
                      <span className="blog-date">{formatDate(post.date)}</span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-read">⏱ {post.readingTime}</span>
                      <span className="blog-read-link">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
