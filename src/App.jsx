import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import QuoteModal from './common/QuoteModal/QuoteModal';
import WhatsAppCTA from './common/WhatsAppCTA/WhatsAppCTA';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Portfolio from './pages/Portfolio/Portfolio';
import Blog from './pages/Blog/Blog';
import Contact from './pages/Contact/Contact';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function AppInner() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Header onQuoteOpen={() => setQuoteOpen(true)} />

      <Routes>
        <Route path="/"          element={<Home      onQuoteOpen={() => setQuoteOpen(true)} />} />
        <Route path="/about"     element={<About     onQuoteOpen={() => setQuoteOpen(true)} />} />
        <Route path="/services"  element={<Services  onQuoteOpen={() => setQuoteOpen(true)} />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog"      element={<Blog />} />
        <Route path="/contact"   element={<Contact />} />

        {/* 404 fallback */}
        <Route path="*" element={
          <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            textAlign: 'center',
            paddingTop: '80px',
          }}>
            <span style={{ fontSize: '4rem' }}>✦</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '6rem', fontWeight: 300, color: 'var(--color-gold)', lineHeight: 1 }}>404</h1>
            <p style={{ color: 'var(--color-text-muted)' }}>This page doesn't exist — but your perfect space does.</p>
            <a href="/" style={{ color: 'var(--color-gold)', fontSize: 'var(--text-sm)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Return Home →
            </a>
          </div>
        } />
      </Routes>

      <Footer onQuoteOpen={() => setQuoteOpen(true)} />
      <WhatsAppCTA />
      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}
